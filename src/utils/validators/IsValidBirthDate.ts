import {
  Validate,
  ValidationOptions,
  ValidatorConstraint,
} from 'class-validator';

@ValidatorConstraint({ name: 'IsValidBirthDate', async: false })
export class IsValidBirthDateCostraint {
  validate(birthDate: string) {
    const [year, month, day] = birthDate.split('-');
    const date = new Date(Number(year), Number(month) - 1, Number(day));

    if (
      isNaN(date.getTime()) ||
      year.length !== 4 ||
      month.length !== 2 ||
      day.length !== 2
    ) {
      return false;
    }

    const now = new Date();
    const ageInTimeStamp = now.getTime() - date.getTime();
    const ageInYears = Math.floor(ageInTimeStamp / (1000 * 3600 * 24 * 365.25));

    if (ageInYears < 18) {
      return false;
    }

    return true;
  }
  defaultMessage(validationArguments?: any) {
    return `The ${validationArguments.property} must be in the format YYY-MM-DD and must be greater than or equal to 18 years old.`;
  }
}

export function IsValidBirthDate(validationOptions?: ValidationOptions) {
  return function (object: Record<string, any>, property: string) {
    Validate(IsValidBirthDateCostraint, validationOptions)(object, property);
  };
}
