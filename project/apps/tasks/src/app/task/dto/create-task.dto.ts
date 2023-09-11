import { City } from "@project/shared/app-types";
import { ADRESS_LENGTH, DESCRIPTION_LENGTH, PRICE_MAX_DECIMAL_DIGITS, PRICE_VALUE, TAGS_COUNT, TAG_LENGTH, TITLE_LENGTH } from "../task.constants";
import { ArrayMaxSize, ArrayMinSize, IsArray, IsDate, IsEnum, IsInt, IsMongoId, IsNumber, IsOptional, IsPositive, MaxLength, Min, MinDate, MinLength, arrayMaxSize, isArray, isNumber } from "class-validator";
import { Transform, Type } from "class-transformer";


export default class CreateTaskDTO {

  @IsMongoId()
  public userId!: string

  @MinLength(TITLE_LENGTH.MIN)
  @MaxLength(TITLE_LENGTH.MAX)
  public title!: string;

  @MinLength(DESCRIPTION_LENGTH.MIN)
  @MaxLength(DESCRIPTION_LENGTH.MAX)
  public description!: string;

  @IsInt()
  @IsPositive()
  public categoryId!: number;


  @Min(PRICE_VALUE.MIN)
  @IsNumber({}, {message: 'Price must be a number'})
  @Transform(({value}) => isNumber(value) ? parseFloat(value.toFixed(PRICE_MAX_DECIMAL_DIGITS)) : value)
  public price!: number;


  @MinDate(new Date(), {message: 'Task expiration date should be later than current date.'})
  @IsDate()
  @IsOptional()
  @Type(() => Date)
  public expirationDate?: Date;


  @IsMongoId()
  @IsOptional()
  public image?: string;


  @IsOptional()
  @MinLength(ADRESS_LENGTH.MIN)
  @MaxLength(ADRESS_LENGTH.MAX)
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

  @IsEnum(City)
  public city!: City;
}


