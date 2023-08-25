import { MinLength, MaxLength, IsOptional, IsInt, IsPositive, Min, IsDate, IsMongoId, ArrayMaxSize, ArrayMinSize, IsEnum } from "class-validator";
import { Type, Transform } from "class-transformer";
import dayjs from "dayjs";

import { City, TaskStatus } from "@project/shared/app-types";
import { ADRESS_LENGTH, DESCRIPTION_LENGTH, PRICE_VALUE, TAGS_COUNT, TAG_LENGTH, TITLE_LENGTH } from "../task-constants";


export default class UpdateTaskDTO {

  @IsOptional()
  @MinLength(TITLE_LENGTH.MIN)
  @MaxLength(TITLE_LENGTH.MAX)
  public title?: string;

  @IsOptional()
  @MinLength(DESCRIPTION_LENGTH.MIN)
  @MaxLength(DESCRIPTION_LENGTH.MAX)
  public description?: string;

  @IsOptional()
  @IsInt()
  @IsPositive()
  public categoryId?: number;

  @IsOptional()
  @Min(PRICE_VALUE.MIN)
  public price?: number;

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

  @IsOptional()
  @IsEnum(City)
  public city?: City;

  @IsOptional()
  @IsEnum(TaskStatus)
  public status?: TaskStatus;
}
