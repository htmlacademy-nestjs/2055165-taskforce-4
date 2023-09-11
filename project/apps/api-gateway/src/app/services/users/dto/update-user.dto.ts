import { City } from "@project/shared/app-types";

export default class UpdateUserDTO {
  public name?: string;
  public password?: string;
  public newPassword?: string;
  public aboutInfo?: string;
  public birthDate?: Date;
  public avatar?: string;
  public specialization?: string[];
  public city?: City;
}
