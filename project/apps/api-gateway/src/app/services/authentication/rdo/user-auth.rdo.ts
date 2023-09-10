import { City, UserRole } from "@project/shared/app-types";
import { Expose, Transform } from "class-transformer";
import dayjs from "dayjs";

export default class UserAuthRDO {
  public id!: number;
  public name!: string;
  public email!: string;
  public avatar!: string;
  public aboutInfo!: string;
  public city!: City;
  public role!: UserRole;
  public registerDate!: string;
  public userAge!: string;
  public specialization!: string[];
  public accessToken!: string;
  public refreshToken!: string;
}
