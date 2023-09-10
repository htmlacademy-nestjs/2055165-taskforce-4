import { Type } from "class-transformer";
import { IsInt, IsMongoId, IsOptional, IsPositive } from "class-validator";
import { DEFAULT_FEEDBACKS_COUNT_LIMIT } from "./feedback-query.constants";

export class FeedbackQuery {
  @IsMongoId()
  public executorId!: string

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
