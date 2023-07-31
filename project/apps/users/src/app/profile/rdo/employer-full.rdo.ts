import { City, UserRole } from "@project/shared/app-types";
import { Expose } from "class-transformer";

export default class EmployerFullRDO {
  @Expose()
  public id!: number;

  @Expose()
  public name!: string;

  @Expose()
  public email!: string;

  @Expose()
  public avatar!: string;

  @Expose()
  public aboutInfo!: string;

  @Expose()
  public city!: City;

  @Expose()
  public role!: UserRole;

  @Expose({name: 'createdAt'})
  public registerDate!: string;

  @Expose()
  public publishedTasksCount!: number;

  @Expose()
  public newTasksCount!: number
}
