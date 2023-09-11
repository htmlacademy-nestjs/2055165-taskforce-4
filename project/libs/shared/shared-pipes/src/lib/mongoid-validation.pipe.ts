import ObjectID from 'bson-objectid';

import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

const BAD_MONGOID_ERROR = `Such id isn'\t valid. Check your url param.`;

@Injectable()
export class MongoidValidationPipe implements PipeTransform {
  transform(value: string, { type }: ArgumentMetadata) {
    if (type !== 'param') {
      throw new Error('This pipe must be used only with params!')
    }

    if (!ObjectID.isValid(value)) {
      console.log(value);
      throw new BadRequestException(BAD_MONGOID_ERROR);
    }

    return value;
  }
}
