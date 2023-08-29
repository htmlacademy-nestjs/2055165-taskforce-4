import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { ClassConstructor, plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';


@Injectable()
export class DTOValidationPipe implements PipeTransform {
  constructor(private DTO: ClassConstructor<object>) {}

  async transform(value: unknown, {type}: ArgumentMetadata) {
    if (type !== 'body') {
      throw new Error('This pipe must be used only with body data!')
    }

    const DTOinstance = plainToInstance(this.DTO, value);
    const errors = await validate(DTOinstance,
      {
        whitelist: true,
        validationError: {
          target: false,
          value: false
        }
      }
    );

    if (errors.length > 0) {
      const errorInfo = errors.map(({constraints}) =>
        constraints ? Object.values(constraints): constraints
      ).flat();

      throw new BadRequestException(errorInfo);
    }

    return value;
  }

}
