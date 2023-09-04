import { ArrayMaxSize, IsArray, IsDate, IsEnum, IsMongoId, IsOptional, IsString, MaxLength, MinLength, arrayMaxSize, isArray, isDateString, maxLength, minLength } from "class-validator";
import {IsAdult, IsRedundantFields} from '@project/shared/validate-decorators'

import { City } from "@project/shared/app-types";
import { ABOUT_INFO_LENGTH, BIRTHDATE_FORMAT_LENGTH, MIN_USER_AGE, NAME_LENGTH, PASSWORD_LENGTH, SPECIALIZATION_COUNT } from "../profile.constants";
import { Transform } from "class-transformer";
import dayjs from "dayjs";

export default class UpdateUserDTO {

  @MinLength(NAME_LENGTH.MIN)
  @MaxLength(NAME_LENGTH.MAX)
  @IsOptional()
  public name?: string;


  @MinLength(PASSWORD_LENGTH.MIN)
  @MaxLength(PASSWORD_LENGTH.MAX)
  @IsRedundantFields(['password', 'newPassword'])
  @IsOptional()
  public password?: string;


  @MinLength(PASSWORD_LENGTH.MIN)
  @MaxLength(PASSWORD_LENGTH.MAX)
  @IsRedundantFields(['password', 'newPassword'])
  @IsOptional()
  public newPassword?: string;


  @MaxLength(ABOUT_INFO_LENGTH.MAX)
  @IsOptional()
  public aboutInfo?: string;


  @IsAdult(MIN_USER_AGE)
  @IsDate({message: 'Birth date must have "YYYY-MM-DD" format'})
  @IsOptional()
  @Transform(({value}) =>
    isDateString(value, {strictSeparator: true}) && maxLength(value, BIRTHDATE_FORMAT_LENGTH) && minLength(value, BIRTHDATE_FORMAT_LENGTH)
      ? dayjs(value).toDate()
      : value)
  public birthDate?: Date;


  @IsMongoId()
  @IsOptional()
  public avatar?: string;


  @IsString({each:true})
  @ArrayMaxSize(SPECIALIZATION_COUNT.MAX)
  @IsArray()
  @IsOptional()
  @Transform(({value}) =>
    isArray<string>(value) && arrayMaxSize(value, SPECIALIZATION_COUNT.MAX)
      ? Array.from(new Set(value))
      : value
  )
  public specialization?: string[];


  @IsEnum(City)
  @IsOptional()
  public city?: City;
}
