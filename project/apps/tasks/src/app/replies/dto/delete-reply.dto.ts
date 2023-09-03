import { IsInt, IsMongoId, IsPositive } from "class-validator";

export default class DeleteReplyDTO {

  @IsMongoId()
  public executorId!: string; //будет браться из токена

  @IsInt()
  @IsPositive()
  public taskId!: number;
}
