import { IsMongoId } from "class-validator";

export default class DeleteFeedbackDTO {
  @IsMongoId()
  public feedbackId!: string;
}
