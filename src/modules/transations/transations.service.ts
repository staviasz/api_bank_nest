import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { DepositTransationDto } from './dto/deposit-transation.dto';
import { ExtractTransitionsDto } from './dto/extract-transitions.dto';
import { TransferTransationsDto } from './dto/transfer-transations.dto';
import { WithdrawTransationDto } from './dto/withdraw-transation.dto';

@Injectable()
export class TransationsService {
  constructor(private prismaService: PrismaService) {}
  async deposit(depositTransationDto: DepositTransationDto) {
    const { id: acountId } = await this.prismaService.acount.findFirstOrThrow({
      where: {
        number: depositTransationDto.numberAcount,
      },
    });

    const [, desposit] = await Promise.all([
      this.prismaService.acount.update({
        where: {
          id: acountId,
        },
        data: {
          balance: {
            increment: depositTransationDto.value,
          },
        },
      }),
      this.prismaService.deposit.create({
        data: {
          value: depositTransationDto.value,
          acountId: acountId,
        },
      }),
    ]);

    return desposit;
  }

  async withdraw(withdrawTransationDto: WithdrawTransationDto) {
    const {
      id: acountId,
      balance,
      user,
    } = await this.prismaService.acount.findFirstOrThrow({
      where: {
        number: withdrawTransationDto.numberAcount,
      },
      select: {
        user: true,
        id: true,
        balance: true,
      },
    });

    if (user.password !== withdrawTransationDto.password) {
      throw new BadRequestException('Invalid password');
    }

    if (balance < withdrawTransationDto.value) {
      throw new BadRequestException('Insufficient funds');
    }

    const [, withdraw] = await Promise.all([
      this.prismaService.acount.update({
        where: {
          id: acountId,
        },
        data: {
          balance: {
            decrement: withdrawTransationDto.value,
          },
        },
      }),
      this.prismaService.withdraw.create({
        data: {
          value: withdrawTransationDto.value,
          acountId: acountId,
        },
      }),
    ]);

    return withdraw;
  }

  async transfer(transferTransationDto: TransferTransationsDto) {
    const [acountDestiny, acountOrigin] = await Promise.all([
      this.prismaService.acount.findFirstOrThrow({
        where: {
          number: transferTransationDto.acountDestiny,
        },
      }),
      this.prismaService.acount.findFirstOrThrow({
        where: {
          number: transferTransationDto.acountOrigin,
        },
        select: {
          id: true,
          balance: true,
          user: true,
        },
      }),
    ]);

    if (acountOrigin.user.password !== transferTransationDto.password) {
      throw new BadRequestException('Invalid password');
    }
    if (acountOrigin.balance < transferTransationDto.value) {
      throw new BadRequestException('Insufficient funds');
    }

    const [transfer] = await Promise.all([
      this.prismaService.transfer.create({
        data: {
          value: transferTransationDto.value,
          originAcountId: acountOrigin.id,
          destinyAcountId: acountDestiny.id,
        },
      }),
      this.prismaService.acount.update({
        where: {
          id: acountOrigin.id,
        },
        data: {
          balance: {
            decrement: transferTransationDto.value,
          },
        },
      }),
      this.prismaService.acount.update({
        where: {
          id: acountDestiny.id,
        },
        data: {
          balance: {
            increment: transferTransationDto.value,
          },
        },
      }),
    ]);

    return transfer;
  }

  async findAll(extractDto: ExtractTransitionsDto) {
    const { id: acountId, user } =
      await this.prismaService.acount.findFirstOrThrow({
        where: {
          number: extractDto.numberAcount,
        },
        select: {
          id: true,
          user: true,
        },
      });

    if (user.password !== extractDto.password) {
      throw new BadRequestException('Invalid password');
    }
    const queries = {
      deposit: this.prismaService.deposit.findMany({
        where: {
          acountId,
        },
      }),
      withdraw: this.prismaService.withdraw.findMany({
        where: {
          acountId,
        },
      }),
      transfer: this.prismaService.transfer.findMany({
        where: {
          OR: [
            {
              originAcountId: acountId,
            },
            {
              destinyAcountId: acountId,
            },
          ],
        },
      }),
    };

    const response = {};
    if (extractDto.filters) {
      const executQueries = extractDto.filters.map(filter => queries[filter]);
      const results = await Promise.all(executQueries);
      for (let i = 0; i < results.length; i++) {
        response[extractDto.filters[i]] = results[i];
      }
      return response;
    }

    const [deposit, withdraw, transfer] = await Promise.all([
      queries.deposit,
      queries.withdraw,
      queries.transfer,
    ]);
    response['deposit'] = deposit;
    response['withdraw'] = withdraw;
    response['transfer'] = transfer;
    return response;
  }
}
