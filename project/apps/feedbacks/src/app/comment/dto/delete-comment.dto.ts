import { IsMongoId } from "class-validator";

export default class DeleteCommentDTO {
  @IsMongoId()
  public commentId!: string;
}
