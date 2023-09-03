import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function IsRedundantFields(props: string[], validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isRedundantFields',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: unknown, {object}: ValidationArguments) {
          console.log('object', object)
          const dataKeys = Object.keys(object)
          const isPropsInclude = props.map((prop) => dataKeys.includes(prop));
          return (!isPropsInclude.includes(false) && dataKeys.length === isPropsInclude.length)
            || (!isPropsInclude.includes(true))

        },
        defaultMessage({object, property}: ValidationArguments) {
          return props.length <= Object.keys(object).length
            ? `Field ${property} are redundant, check your request for irrelevant fields`
            : 'Some requiered fields are missing, check your request'
        }
      },
    });
  };
}
