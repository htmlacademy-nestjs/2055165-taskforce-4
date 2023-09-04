import { ArgumentMetadata, BadRequestException, PipeTransform } from '@nestjs/common';
import {TaskStatus} from '@project/shared/app-types';
import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
dayjs.extend(isSameOrBefore)

const PRICE_MAX_DECIMAL_DIGITS = 2;

type validationFields = {
  expirationDate?: string,
  tags?: string[],
  price?: number;
  status?: TaskStatus
}

export class CustomDTOTaskValidationPipe implements PipeTransform {
  transform(value: object & validationFields, {type}: ArgumentMetadata) {
    if (type !== 'body') {
      throw new Error('This pipe must be used only with body data!')
    }

    const {expirationDate, tags, price, status} = value;

    if (status) {
      const dataKeys = Object.keys(value);

      for (const key of dataKeys) {
        if (key !== 'status') {
          throw new BadRequestException('Redundant data, check your request for irrelevant fields')
        }
      }
    }

    if (expirationDate && dayjs(expirationDate).isSameOrBefore(dayjs(), 'minute')) {
      throw new BadRequestException('Task expiration date should be later than current date.')
    }



    return {
      ...value,
      tags: tags ? Array.from(new Set(tags)) : tags,
      expirationDate: expirationDate ? dayjs(expirationDate).toDate() : expirationDate,
      price: price ? parseFloat(price.toFixed(PRICE_MAX_DECIMAL_DIGITS)) : price
    }
  }



}
