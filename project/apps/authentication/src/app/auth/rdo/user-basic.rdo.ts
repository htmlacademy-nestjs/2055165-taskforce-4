import { City, UserRole } from "@project/shared/app-types";
import { Expose } from "class-transformer";

export default class UserBasicRDO {
  @Expose()
  public id!: number;

  @Expose()
  public name!: string;

  @Expose()
  public email!: string;

  @Expose()
  public birthDate!: string;

  @Expose()
  public avatar!: string;

  @Expose()
  public city!: City;

  @Expose()
  public role!: UserRole;

  @Expose({name: 'createdAt'})
  public registerDate!: string;
}
