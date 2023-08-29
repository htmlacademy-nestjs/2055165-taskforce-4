import { IsDate, IsEmail, IsEnum, IsMongoId, IsOptional, MaxLength, MinLength, isDateString, maxLength } from 'class-validator';

import {IsAdult} from '@project/shared/validate-decorators'
import { City, UserRole } from "@project/shared/app-types";
import { MIN_USER_AGE, NAME_LENGTH, PASSWORD_LENGTH } from "../auth.constants";
import dayjs from 'dayjs';
import { Transform } from 'class-transformer';


export default class CreateUserDTO {

  @MinLength(NAME_LENGTH.MIN)
  @MaxLength(NAME_LENGTH.MAX)
  public name!: string;


  @IsEmail()
  public email!: string;


  @MinLength(PASSWORD_LENGTH.MIN)
  @MaxLength(PASSWORD_LENGTH.MAX)
  public password!: string;


  @IsAdult(MIN_USER_AGE)
  @IsDate({message: 'The Birth date must have "YYYY-MM-DD" format'})
  @Transform(({value}) =>
    isDateString(value, {strictSeparator: true}) && maxLength(value, 10)
      ? dayjs(value).toDate()
      : value)
  public birthDate!: Date;


  @IsMongoId()
  @IsOptional()
  public avatar?: string;


  @IsEnum(City)
  public city!: City;


  @IsEnum(UserRole)
  public role!: UserRole;
}
