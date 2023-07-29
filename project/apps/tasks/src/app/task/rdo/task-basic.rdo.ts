import { City, TaskStatus } from "@project/shared/app-types";
import { Expose } from "class-transformer";

export default class TaskBasicRDO {
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
  public address!: string;

  @Expose()
  public tags!: string[];

  @Expose()
  public city!: City;

  @Expose()
  public status!: TaskStatus;

  @Expose()
  public employerId!: string;

  @Expose()
  //добавить в сущность Task
  public repliesCount!: number;

  @Expose()
  //добавить в сущность Task
  public commentsCount!: number;

  @Expose({name: 'createdAt'})
  public registerDate!: string;
}
