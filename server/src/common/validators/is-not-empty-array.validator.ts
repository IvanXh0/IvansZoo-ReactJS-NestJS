import { ValidationOptions, registerDecorator } from 'class-validator';

// This is a custom validator
export function IsNotEmptyArray(validationOptions?: ValidationOptions) {
  return (object: unknown, propertyName: string): void => {
    registerDecorator({
      name: 'IsNotEmptyArray',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: unknown): boolean {
          return Array.isArray(value) && value.length > 0;
        },
        defaultMessage(): string {
          return `Array ${propertyName} should not be empty`;
        },
      },
    });
  };
}
