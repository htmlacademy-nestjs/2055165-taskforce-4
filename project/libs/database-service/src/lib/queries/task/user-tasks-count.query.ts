import { IsEnum, IsMongoId} from "class-validator";
import { UserRole } from "@project/shared/app-types";

export class UserTasksCountQuery {
  @IsMongoId()
  public userId!: string

  @IsEnum(UserRole)
  public role!: UserRole;
}
