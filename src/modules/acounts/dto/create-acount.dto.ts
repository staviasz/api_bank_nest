import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { IsNotStringWithDigitOrEspecialChars } from 'src/utils/validators/IsNotStringWithDigit';
import { IsValidBirthDate } from 'src/utils/validators/IsValidBirthDate';
import { IsValidCpf } from 'src/utils/validators/IsValidCpf';
import { IsValidPassword } from 'src/utils/validators/IsValidPassword';
import { IsValidPhone } from 'src/utils/validators/IsValidPhone';

export class CreateAcountDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  @IsNotStringWithDigitOrEspecialChars()
  name: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @IsNotEmpty()
  @IsValidPassword()
  password: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(21)
  @MinLength(9)
  @IsValidPhone()
  phone: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(14)
  @MinLength(11)
  @IsValidCpf()
  cpf: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(10)
  @MinLength(10)
  @IsValidBirthDate()
  birthDate: string;
}
