import { IsInt, IsMongoId, IsNotEmpty, IsPositive, Max, MaxLength, Min, MinLength } from "class-validator";
import { FEEDBACK_LENGTH, FEEDBACK_RATING } from "../feedback.constants";

export default class CreateFeedbackDTO {
  @IsMongoId()
  public userId!: string

  @MinLength(FEEDBACK_LENGTH.MIN)
  @MaxLength(FEEDBACK_LENGTH.MAX)
  public text!: string;

  @IsPositive()
  @IsInt()
  public taskId!: number;

  @IsMongoId()
  @IsNotEmpty()
  public executorId!: string;

  @Min(FEEDBACK_RATING.MIN)
  @Max(FEEDBACK_RATING.MAX)
  @IsInt()
  public rating!: number;
}
