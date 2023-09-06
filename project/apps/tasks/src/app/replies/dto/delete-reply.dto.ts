import { IsInt, IsPositive } from "class-validator";

export default class DeleteReplyDTO {

  @IsInt()
  @IsPositive()
  public taskId!: number;
}
