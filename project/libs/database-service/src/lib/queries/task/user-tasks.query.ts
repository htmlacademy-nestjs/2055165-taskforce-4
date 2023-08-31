import { Transform } from "class-transformer";
import { IsIn, IsInt, IsMongoId, IsOptional, IsPositive } from "class-validator";
import { DEFAULT_TASKS_COUNT_LIMIT, DEFAULT_TASKS_STATUS } from "./task-query.constants";
import { TaskStatus } from "@project/shared/app-types";

export class UserTasksQuery {
  @Transform(({ value } ) => +value || DEFAULT_TASKS_COUNT_LIMIT)
  @IsInt()
  @IsOptional()
  public limit: number = DEFAULT_TASKS_COUNT_LIMIT


  @Transform(({ value } ) => value || DEFAULT_TASKS_STATUS)
  @IsIn(Object.values(TaskStatus))
  @IsOptional()
  public status?: TaskStatus = DEFAULT_TASKS_STATUS


  @IsMongoId()
  @IsOptional()
  public userId!: string;


  @IsPositive()
  @IsInt()
  @IsOptional()
  public page?: number;
}
