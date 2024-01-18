import { IsNotEmpty, IsString } from 'class-validator';
import { DepositTransationDto } from './deposit-transation.dto';

export class WithdrawTransationDto extends DepositTransationDto {
  @IsString()
  @IsNotEmpty()
  password: string;
}
