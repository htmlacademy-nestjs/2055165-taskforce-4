import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";
import { UpdateUserDTO } from "@project/database-service";
import { UpdateUserData } from "@project/shared/app-types";
import { plainToInstance } from 'class-transformer';
import { validate } from "class-validator";
import dayjs from "dayjs";

const USER_AGE_ERROR = 'User\'s age must be over 18 years.';
const MIN_USER_AGE = 18;

export class UpdateUserDataValidationPipe implements PipeTransform {
  async transform(value: UpdateUserDTO, {type}: ArgumentMetadata): Promise<UpdateUserData> {
    if (type !== 'body') {
      throw new Error('This pipe must be used only with body data!')
    }

    const object = plainToInstance(UpdateUserDTO, value);
    const errors = await validate(object,
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

    if (value.birthDate && dayjs().diff(dayjs(value.birthDate), 'years') < MIN_USER_AGE) {
      throw new BadRequestException(USER_AGE_ERROR);
    }

    const {password, newPassword, specialization} = value;


    if (password && newPassword) {
      const dataKeys = Object.keys(value);

      for (const key of dataKeys) {
        if (key !== 'password' && key !== 'newPassword') {
          throw new BadRequestException('Redundant data, check your request for irrelevant fields')
        }
      }
    } else if (password && !newPassword || !password && newPassword) {
      throw new BadRequestException('Some required password data is missing, check your request')
    }

    return {...value,
      birthDate: value.birthDate == null ? value.birthDate : dayjs(value.birthDate).toDate(),
      specialization: value.specialization == null ? value.specialization : Array.from(new Set(specialization))
    }
  }
}
