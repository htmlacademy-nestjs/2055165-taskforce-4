import { Transform } from "class-transformer";
import { DEFAULT_SORT_DIRECTION, DEFAULT_SORT_TYPE, DEFAULT_TASKS_COUNT_LIMIT, DEFAULT_TASKS_STATUS } from './task-query.constants';
import { IsIn, IsInt, IsMongoId, IsNotEmpty, IsOptional, IsString } from "class-validator";


// enum CityParser {
//   'moscow' = 'Moscow',
//   'saint-petersburg' = 'SaintPetersburg',
//   'vladivostok'='Vladivostok'
// }

export class TaskQuery {
  @Transform(({ value } ) => +value || DEFAULT_TASKS_COUNT_LIMIT)
  @IsInt()
  @IsOptional()
  public limit = DEFAULT_TASKS_COUNT_LIMIT;

  @Transform(({ value }) => (+value))
  @IsInt()
  @IsOptional()
  public category?: number;


  @IsIn(['date', 'popular', 'discussed'])
  @IsOptional()
  public sort: 'date' | 'popular' | 'discussed' = DEFAULT_SORT_TYPE


  @IsIn(['Moscow', 'SaintPetersburg', 'Vladivostok'])
  @IsOptional()
  public city?: 'Moscow' | 'SaintPetersburg' | 'Vladivostok'


  @IsIn(['asc', 'desc'])
  @IsOptional()
  public sortDirection: 'desc' | 'asc' = DEFAULT_SORT_DIRECTION;


  @Transform(({ value }) => +value)
  @IsInt()
  @IsOptional()
  public page?: number;

  @IsMongoId()
  @IsOptional()
  public userId?: string;


  @IsIn(['New', 'Cancelled', 'InProgress', 'Completed', 'Failed'])
  @IsOptional()
  public status?: 'New' | 'Cancelled' | 'InProgress' | 'Completed' | 'Failed'


  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public tag?: string

}
