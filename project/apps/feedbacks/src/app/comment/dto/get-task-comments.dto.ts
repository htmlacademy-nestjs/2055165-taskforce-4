import { IsInt, IsPositive } from "class-validator";

export class GetTaskCommentsDTO {

  @IsPositive()
  @IsInt()
  public taskId!: number
}
