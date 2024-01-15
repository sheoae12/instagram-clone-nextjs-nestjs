import { IsEmail, ValidationOptions, registerDecorator, ValidationArguments } from 'class-validator';

const emailOrPhoneRegex = /^(^[^\s@]+@[^\s@]+\.[^\s@]+$)|(^\d{3}-\d{4}-\d{4}$)$/;

export function IsEmailOrPhoneNumber(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isEmailOrPhoneNumber',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          return emailOrPhoneRegex.test(value);
        },
      },
    });
  };
}