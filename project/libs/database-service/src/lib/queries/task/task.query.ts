import { Transform, Type } from "class-transformer";
import { DEFAULT_SORT_DIRECTION, DEFAULT_SORT_TYPE, DEFAULT_TASKS_COUNT_LIMIT, DEFAULT_TASKS_STATUS } from './task-query.constants';
import { IsIn, IsInt, IsNotEmpty, IsOptional, IsPositive, IsString } from "class-validator";
import { City, QuerySortType } from "@project/shared/app-types";


export class TaskQuery {
  @Transform(({ value } ) => +value || DEFAULT_TASKS_COUNT_LIMIT)
  @IsInt()
  @IsOptional()
  public limit: number = DEFAULT_TASKS_COUNT_LIMIT


  @IsInt()
  @IsOptional()
  @Type(() => Number)
  public category?: number;


  @Transform(({ value } ) => value || DEFAULT_SORT_TYPE)
  @IsIn(Object.values(QuerySortType))
  @IsOptional()
  public sortType: QuerySortType = DEFAULT_SORT_TYPE


  @IsIn(Object.values(City))
  @IsOptional()
  public city?: City


  @Transform(({ value } ) => value || DEFAULT_SORT_DIRECTION)
  @IsIn(['asc', 'desc'])
  @IsOptional()
  public sortDirection: 'desc' | 'asc' = DEFAULT_SORT_DIRECTION


  @IsPositive()
  @IsInt()
  @IsOptional()
  @Type(() => Number)
  public page?: number;


  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public tag?: string
}
