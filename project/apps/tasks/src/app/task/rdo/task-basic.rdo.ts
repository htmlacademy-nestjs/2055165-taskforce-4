import { City, TaskStatus } from "@project/shared/app-types";
import { Expose, Type } from "class-transformer";
import { CategoryRDO } from "../../category/rdo/category.rdo";

export default class TaskBasicRDO {
  @Expose()
  public taskId!: number;

  @Expose()
  public title!: string;

  @Expose()
  public description!: string;

  @Expose()
  @Type(() => CategoryRDO)
  public category!: CategoryRDO;

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
  public repliesCount!: number;

  @Expose()
  public commentsCount!: number;

  @Expose({name: 'createdAt'})
  public registerDate!: string;
}
