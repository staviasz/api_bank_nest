import {
  Validate,
  ValidationOptions,
  ValidatorConstraint,
} from 'class-validator';
import parsePhoneNumberFromString from 'libphonenumber-js';

@ValidatorConstraint({ name: 'IsValidPhone', async: false })
export class IsValidPhoneConstraint {
  validate(phone: string) {
    const cleanPhone = phone.replace(/\D/g, '');
    const parsedPhoneNumber = parsePhoneNumberFromString(cleanPhone, 'BR');
    const valid = parsedPhoneNumber && parsedPhoneNumber.isValid();
    return valid;
  }

  defaultMessage(validationArguments?: any) {
    return `The ${validationArguments.property} must be a valid phone number.`;
  }
}

export function IsValidPhone(validationOptions?: ValidationOptions) {
  return function (object: Record<string, any>, property: string) {
    Validate(IsValidPhoneConstraint, validationOptions)(object, property);
  };
}
