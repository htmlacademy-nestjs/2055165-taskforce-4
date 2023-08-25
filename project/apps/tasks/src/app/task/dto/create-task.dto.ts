import { City } from "@project/shared/app-types";
import { ADRESS_LENGTH, DESCRIPTION_LENGTH, PRICE_VALUE, TAGS_COUNT, TAG_LENGTH, TITLE_LENGTH } from "../task-constants";
import { ArrayMaxSize, ArrayMinSize, IsDate, IsEnum, IsInt, IsMongoId, IsOptional, IsPositive, MaxLength, Min, MinLength } from "class-validator";
import { Transform, Type } from "class-transformer";
import dayjs from "dayjs";

export default class CreateTaskDTO {

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
  public price!: number;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  @Transform(({value}) => value ? dayjs(value).toDate() : value)
  public expirationDate?: Date;

  @IsOptional()
  @IsMongoId()
  public image?: string;

  @IsOptional()
  @MinLength(ADRESS_LENGTH.MIN)
  @MaxLength(ADRESS_LENGTH.MAX)
  public address?: string;

  @IsOptional()
  @ArrayMinSize(TAGS_COUNT.MIN)
  @ArrayMaxSize(TAGS_COUNT.MAX)
  @MinLength(TAG_LENGTH.MIN, {each: true})
  @MaxLength(TAG_LENGTH.MAX, {each: true})
  public tags?: string[];

  @IsEnum(City)
  public city!: City;

  @IsMongoId()
  public employerId!: string;
}


