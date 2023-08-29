import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function IsRedundantUserField(property: 'password' | 'newPassword', validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isRedundantUserField',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: unknown, {object}: ValidationArguments) {
          const dataKeys = Object.keys(object)
          return (dataKeys.includes('password') && dataKeys.includes('newPassword') && dataKeys.length === 2)
            || (!dataKeys.includes('password') && !dataKeys.includes('newPassword'))

        },
        defaultMessage({object}: ValidationArguments) {
          const dataKeys = Object.keys(object)
          return dataKeys.length < 2
          ? 'Some required updating password data is missing, check your request.'
          : `${property} field is redundant, check your request for irrelevant fields`
        }
      },
    });
  };
}
