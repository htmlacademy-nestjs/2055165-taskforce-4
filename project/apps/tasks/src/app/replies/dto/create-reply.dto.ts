import { IsInt, IsMongoId, IsNotEmpty, IsOptional, IsPositive, IsString } from "class-validator";

export default class CreateReplyDTO {

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public text?: string;

  @IsInt()
  @IsPositive()
  public taskId!: number;

  @IsMongoId()
  public executorId!: string;
}
