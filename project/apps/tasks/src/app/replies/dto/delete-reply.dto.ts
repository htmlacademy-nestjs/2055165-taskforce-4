import { Type } from "class-transformer";
import { IsInt, IsMongoId, IsPositive } from "class-validator";

export default class DeleteReplyDTO {
  @IsMongoId()
  public userId!: string

  @IsInt()
  @IsPositive()
  @Type(() => Number)
  public taskId!: number;
}
