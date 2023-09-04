import { IsMongoId } from "class-validator";

export class GetExecutorFeedbacksDTO {

  @IsMongoId()
  public executorId!: string
}
