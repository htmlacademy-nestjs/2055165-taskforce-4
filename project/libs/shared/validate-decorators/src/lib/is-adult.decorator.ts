import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
dayjs.extend(isSameOrBefore)
import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';


export function IsAdult(property: number, validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isAdult',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: Date, args: ValidationArguments) {
          return dayjs(value).isSameOrBefore(dayjs()) && dayjs().diff(dayjs(value), 'years') > property
        },
        defaultMessage(args: ValidationArguments) {
          return `User's age must be over ${property} years.`
        }
      },
    });
  };
}
