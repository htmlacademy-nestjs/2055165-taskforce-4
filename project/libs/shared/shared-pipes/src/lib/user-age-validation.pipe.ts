import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import dayjs from "dayjs";

const USER_AGE_ERROR = 'User\'s age must be over 18 years.';
const MIN_USER_AGE = 18;

@Injectable()
export class UserAgeValidationPipe implements PipeTransform {
  transform(value: { birthDate: Date }, {type}: ArgumentMetadata) {
    if (type !== 'body') {
      throw new Error('This pipe must be used only with body data!')
    }

    if (dayjs().diff(value.birthDate, 'years') < MIN_USER_AGE) {
      throw new BadRequestException(USER_AGE_ERROR);
    }

    return value;
  }
}


