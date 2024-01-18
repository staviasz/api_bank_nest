import {
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsPositive,
  IsString,
} from 'class-validator';

export class DepositTransationDto {
  @IsString()
  @IsNumberString()
  @IsNotEmpty()
  numberAcount: string;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  value: number;
}
