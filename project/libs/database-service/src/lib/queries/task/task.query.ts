import { Transform } from "class-transformer";
import { IsRedundantFields } from '@project/shared/validate-decorators'
import { DEFAULT_SORT_DIRECTION, DEFAULT_SORT_TYPE, DEFAULT_TASKS_COUNT_LIMIT, DEFAULT_TASKS_STATUS } from './task-query.constants';
import { IsIn, IsInt, IsMongoId, IsNotEmpty, IsOptional, IsPositive, IsString } from "class-validator";
import { City, TaskStatus } from "@project/shared/app-types";


// enum CityParser {
//   'moscow' = 'Moscow',
//   'saint-petersburg' = 'SaintPetersburg',
//   'vladivostok'='Vladivostok'
// }

export class TaskQuery {
  @Transform(({ value } ) => +value || DEFAULT_TASKS_COUNT_LIMIT)
  @IsInt()
  @IsOptional()
  public limit: number = DEFAULT_TASKS_COUNT_LIMIT


  @IsInt()
  @IsOptional()
  public category?: number;


  @Transform(({ value } ) => value || DEFAULT_SORT_TYPE)
  @IsIn(['date', 'popular', 'discussed'])
  @IsOptional()
  public sortType: 'date' | 'popular' | 'discussed' = DEFAULT_SORT_TYPE


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
  public page?: number;


  @Transform(({ value } ) => value || DEFAULT_TASKS_STATUS)
  @IsIn(Object.values(TaskStatus))
  @IsOptional()
  public status: TaskStatus = DEFAULT_TASKS_STATUS


  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public tag?: string

}
