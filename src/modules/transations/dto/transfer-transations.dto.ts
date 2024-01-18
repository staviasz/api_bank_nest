import {
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsPositive,
  IsString,
} from 'class-validator';

export class TransferTransationsDto {
  @IsString()
  @IsNotEmpty()
  @IsNumberString()
  acountDestiny: string;

  @IsString()
  @IsNotEmpty()
  @IsNumberString()
  acountOrigin: string;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  value: number;

  @IsString()
  @IsNotEmpty()
  password: string;
}
