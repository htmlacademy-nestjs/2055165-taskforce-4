import { IsDate, IsEmail, IsEnum, IsMongoId, IsOptional, MaxLength, MinLength } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import dayjs from 'dayjs';

import { City, UserRole } from "@project/shared/app-types";
import { NAME_LENGTH, PASSWORD_LENGTH } from "../auth.constants";


export default class CreateUserDTO {

  @MinLength(NAME_LENGTH.MIN)
  @MaxLength(NAME_LENGTH.MAX)
  public name!: string;

  @IsEmail()
  public email!: string;

  @MinLength(PASSWORD_LENGTH.MIN)
  @MaxLength(PASSWORD_LENGTH.MAX)
  public password!: string;

  @IsDate()
  @Type(() => Date)
  @Transform(({value}) => dayjs(value).toDate())
  public birthDate!: Date;

  @IsOptional()
  @IsMongoId()
  public avatar?: string;

  @IsEnum(City)
  public city!: City;

  @IsEnum(UserRole)
  public role!: UserRole;
}
