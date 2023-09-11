import { UserRole } from "@project/shared/app-types";
import { IsEnum, IsMongoId } from "class-validator";

export default class DeleteFeedbackDTO {
  @IsMongoId()
  public feedbackId!: string;

  @IsMongoId()
  public userId!: string;

  @IsEnum(UserRole)
  public role!: UserRole
}
