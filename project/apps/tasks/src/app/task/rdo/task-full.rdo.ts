import { City, TaskStatus } from "@project/shared/app-types";
import { Expose } from "class-transformer";

export default class TaskFullRDO {
  @Expose()
  public id!: string;

  @Expose()
  public title!: string;

  @Expose()
  public description!: string;

  @Expose()
  public category!: string;

  @Expose()
  public price!: number;

  @Expose()
  public expirationDate!: string;

  @Expose()
  public image!: string;

  @Expose()
  public address!: string;

  @Expose()
  public tags!: string[];

  @Expose()
  public city!: City;

  @Expose()
  public status!: TaskStatus;

  @Expose()
  public employerId!: string;
}
