import { IsInt, IsMongoId, IsNotEmpty, IsOptional, IsPositive, IsString } from "class-validator";

export default class CreateReplyDTO {

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  public text?: string;

  @IsPositive()
  @IsInt()
  public taskId!: number;

  @IsMongoId()
  public executorId!: string;
}
