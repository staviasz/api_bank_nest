import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { DepositTransationDto } from './dto/deposit-transation.dto';
import { ExtractTransitionsDto } from './dto/extract-transitions.dto';
import { TransferTransationsDto } from './dto/transfer-transations.dto';
import { WithdrawTransationDto } from './dto/withdraw-transation.dto';
import { TransationsService } from './transations.service';

@Controller('transations')
export class TransationsController {
  constructor(private readonly transationsService: TransationsService) {}

  @Post('/deposit')
  deposit(@Body() depositTransationDto: DepositTransationDto) {
    return this.transationsService.deposit(depositTransationDto);
  }

  @Post('/withdraw')
  withdraw(@Body() withdrawTransationDto: WithdrawTransationDto) {
    return this.transationsService.withdraw(withdrawTransationDto);
  }

  @Post('/transfer')
  transfer(@Body() transferTransationDto: TransferTransationsDto) {
    return this.transationsService.transfer(transferTransationDto);
  }

  @Get('/extract')
  findAll(@Query() extractDto: ExtractTransitionsDto) {
    return this.transationsService.findAll(extractDto);
  }
}
