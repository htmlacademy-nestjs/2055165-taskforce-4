import { UserRole } from "@project/shared/app-types";
import { IsEnum, IsMongoId } from "class-validator";

export default class UserDTO {
  @IsMongoId()
  public userId!: string

  @IsEnum(UserRole)
  public role!: UserRole
}
