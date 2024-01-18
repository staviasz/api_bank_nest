import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAcountDto } from './dto/create-acount.dto';
import { UpdateAcountDto } from './dto/update-acount.dto';

@Injectable()
export class AcountsService {
  constructor(private prismaService: PrismaService) {}

  async create(createAcountDto: CreateAcountDto) {
    const re = /\D/g;
    const cleanCpf = createAcountDto.cpf.replace(re, '');
    const cleanPhone = createAcountDto.phone.replace(re, '');

    const queryEmailOrCpfExists = this.prismaService.user.findFirst({
      where: {
        OR: [{ email: createAcountDto.email }, { cpf: cleanCpf }],
      },
    });

    const queryLastAcount = this.prismaService.acount.findFirst({
      orderBy: {
        id: 'desc',
      },
    });

    const [emailOrCpfExists, lastAcount] = await Promise.all([
      queryEmailOrCpfExists,
      queryLastAcount,
    ]);

    if (emailOrCpfExists) {
      throw new BadRequestException('Email or Cpf already exists');
    }

    const data = {
      ...createAcountDto,
      cpf: cleanCpf,
      phone: cleanPhone,
      birthDate: new Date(createAcountDto.birthDate),
    };

    const newUser = await this.prismaService.user.create({ data });

    await this.prismaService.acount.create({
      data: {
        userId: newUser.id,
        number: String(lastAcount ? Number(lastAcount.number) + 1 : 1),
      },
    });

    return;
  }

  async findAll() {
    return await this.prismaService.acount.findMany({
      select: {
        id: true,
        number: true,
        balance: true,
        user: true,
      },
    });
  }

  async findOne(id: number) {
    return await this.prismaService.acount.findUniqueOrThrow({
      where: {
        id,
      },
      select: {
        id: true,
        number: true,
        balance: true,
        user: true,
      },
    });
  }

  async update(id: number, updateAcountDto: UpdateAcountDto) {
    const re = /\D/g;

    if (updateAcountDto.cpf) {
      updateAcountDto.cpf = updateAcountDto.cpf.replace(re, '');
    }
    if (updateAcountDto.phone) {
      updateAcountDto.phone = updateAcountDto.phone.replace(re, '');
    }
    if (updateAcountDto.email || updateAcountDto.cpf) {
      const emailOrCpfExists = await this.prismaService.user.findFirst({
        where: {
          id: { not: id },
          OR: [{ email: updateAcountDto.email }, { cpf: updateAcountDto.cpf }],
        },
      });
      if (emailOrCpfExists) {
        throw new BadRequestException('Email or Cpf already exists');
      }
    }

    return await this.prismaService.user.update({
      where: {
        id,
      },
      data: {
        ...updateAcountDto,
      },
    });
  }

  async remove(id: number) {
    await this.prismaService.user.delete({
      where: {
        id,
      },
    });

    return;
  }
}
