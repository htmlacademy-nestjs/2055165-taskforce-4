import { MinLength, MaxLength, IsOptional, IsInt, IsPositive, Min, IsDate, IsMongoId, ArrayMaxSize, ArrayMinSize, IsEnum, isNumber, IsNumber, MinDate, IsArray, arrayMaxSize, isArray } from "class-validator";
import { Type, Transform } from "class-transformer";

import {IsRedundantFields} from '@project/shared/validate-decorators'
import { City, TaskStatus } from "@project/shared/app-types";
import { ADRESS_LENGTH, DESCRIPTION_LENGTH, PRICE_MAX_DECIMAL_DIGITS, PRICE_VALUE, TAGS_COUNT, TAG_LENGTH, TITLE_LENGTH } from "../task.constants";


export default class UpdateTaskDTO {

  @MinLength(TITLE_LENGTH.MIN)
  @MaxLength(TITLE_LENGTH.MAX)
  @IsOptional()
  public title?: string;


  @MinLength(DESCRIPTION_LENGTH.MIN)
  @MaxLength(DESCRIPTION_LENGTH.MAX)
  @IsOptional()
  public description?: string;


  @IsOptional()
  @IsInt()
  @IsPositive()
  public categoryId?: number;


  @Min(PRICE_VALUE.MIN)
  @IsNumber({}, {message: 'Price must be a number'})
  @IsOptional()
  @Transform(({value}) => isNumber(value) ? parseFloat(value.toFixed(PRICE_MAX_DECIMAL_DIGITS)) : value)
  public price?: number;


  @MinDate(new Date(), {message: 'Task expiration date should be later than current date.'})
  @IsDate()
  @IsOptional()
  @Type(() => Date)
  public expirationDate?: Date;


  @IsOptional()
  @IsMongoId()
  public image?: string;


  @MinLength(ADRESS_LENGTH.MIN)
  @MaxLength(ADRESS_LENGTH.MAX)
  @IsOptional()
  public address?: string;

  @MinLength(TAG_LENGTH.MIN, {each: true})
  @MaxLength(TAG_LENGTH.MAX, {each: true})
  @ArrayMinSize(TAGS_COUNT.MIN)
  @ArrayMaxSize(TAGS_COUNT.MAX)
  @IsArray()
  @IsOptional()
  @Transform(({value}) =>
    isArray<string>(value) && arrayMaxSize(value, TAGS_COUNT.MAX)
      ? Array.from(new Set(value))
      : value
  )
  public tags?: string[];

  @IsOptional()
  @IsEnum(City)
  public city?: City;

  @IsRedundantFields(['status'])
  @IsEnum(TaskStatus)
  @IsOptional()
  public status?: TaskStatus;
}
