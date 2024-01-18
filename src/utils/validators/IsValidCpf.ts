import {
  Validate,
  ValidationOptions,
  ValidatorConstraint,
} from 'class-validator';
import cpfCheck from 'cpf-check';

@ValidatorConstraint({ name: 'IsValidCpf', async: true })
export class IsValidCpfConstraint {
  validate(cpf: string) {
    const cleanCpf = cpf.replace(/\D/g, '');
    return cpfCheck.validate(cleanCpf);
  }

  defaultMessage() {
    return 'Invalid cpf';
  }
}

export function IsValidCpf(validationOptions?: ValidationOptions) {
  return function (object: Record<string, any>, property: string) {
    Validate(IsValidCpfConstraint, validationOptions)(object, property);
  };
}
