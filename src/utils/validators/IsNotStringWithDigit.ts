import {
  Validate,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'isNotStringWithDigit', async: false })
export class IsNotStringWithDigitOrEspecialCharsConstraint
  implements ValidatorConstraintInterface
{
  validate(name: string) {
    const nameAndLastName = name.trim().split(' ');
    if (nameAndLastName.length < 2 || nameAndLastName.some(i => i.length < 3)) {
      return false;
    }

    return /^[a-zA-ZÀ-ÖØ-öø-ÿ ]+$/.test(name);
  }

  defaultMessage(validationArguments?: any) {
    return `You must enter the full ${validationArguments.property}, without abbreviations, numbers or special characters`;
  }
}

export function IsNotStringWithDigitOrEspecialChars(
  validationOptions?: ValidationOptions,
) {
  return function (object: Record<string, any>, property: string) {
    Validate(IsNotStringWithDigitOrEspecialCharsConstraint, validationOptions)(
      object,
      property,
    );
  };
}
