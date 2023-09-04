import { IsInt, IsMongoId, IsPositive, MaxLength, MinLength } from "class-validator";
import { COMMENT_LENGTH } from "../comment.constants";

export default class CreateCommentDTO {

  @MinLength(COMMENT_LENGTH.MIN)
  @MaxLength(COMMENT_LENGTH.MAX)
  public text!: string;

  @IsInt()
  @IsPositive()
  public taskId!: number;

  @IsMongoId()
  public authorId!: string; //убрать после добавления JWT
}
