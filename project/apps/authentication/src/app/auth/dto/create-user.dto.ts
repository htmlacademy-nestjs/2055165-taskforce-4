import { City, UserRole } from "@project/shared/app-types";

export default class CreateUserDTO {
  public name!: string;
  public email!: string;
  public password!: string;
  public birthDate!: string;
  public avatar?: string;
  public city!: City;
  public role!: UserRole;
}
