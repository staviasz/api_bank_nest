import {
  ArrayUnique,
  IsArray,
  IsIn,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';

export class ExtractTransitionsDto {
  @IsNotEmpty()
  @IsString()
  @IsNumberString()
  numberAcount: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsOptional()
  @IsArray()
  @ArrayUnique()
  @IsIn(['deposit', 'withdraw', 'transfer'], { each: true })
  filters: string[];
}
