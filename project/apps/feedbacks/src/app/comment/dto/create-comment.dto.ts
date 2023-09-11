import { IsInt, IsMongoId, IsPositive, MaxLength, MinLength } from "class-validator";
import { COMMENT_LENGTH } from "../comment.constants";
import { Type } from "class-transformer";

export default class CreateCommentDTO {

  @IsMongoId()
  public userId!: string

  @MinLength(COMMENT_LENGTH.MIN)
  @MaxLength(COMMENT_LENGTH.MAX)
  public text!: string;

  @IsInt()
  @IsPositive()
  @Type(() => Number)
  public taskId!: number;
}
