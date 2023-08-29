import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function IsRedundantTaskField(property: 'status', validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isRedundantTaskField',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: unknown, {object}: ValidationArguments) {
          const dataKeys = Object.keys(object)
          return (dataKeys.includes(property) && dataKeys.length === 1)
            || !dataKeys.includes(property)

        },
        defaultMessage(args: ValidationArguments) {
          return `${property} field is redundant, check your request for irrelevant fields`
        }
      },
    });
  };
}
