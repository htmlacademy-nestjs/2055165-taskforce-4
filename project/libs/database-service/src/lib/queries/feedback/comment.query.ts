import { Type } from "class-transformer";
import { IsInt, IsOptional, IsPositive } from "class-validator";
import { DEFAULT_FEEDBACKS_COUNT_LIMIT } from "./feedback-query.constants";

export class CommentQuery {
  @IsPositive()
  @IsInt()
  @Type(() => Number)
  public taskId!: number


  @IsInt()
  @Type(() => Number)
  @IsOptional()
  public page?: number


  @IsInt()
  @IsPositive()
  @Type(() => Number)
  @IsOptional()
  public limit = DEFAULT_FEEDBACKS_COUNT_LIMIT
}
