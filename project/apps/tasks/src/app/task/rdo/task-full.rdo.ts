import { City, TaskStatus } from "@project/shared/app-types";
import { Expose, Type } from "class-transformer";
import { CategoryRDO } from "../../category/rdo/category.rdo";
import ReplyRDO from "../../replies/rdo/reply.rdo";


export default class TaskFullRDO {
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

  @Expose()
  @Type(() => ReplyRDO)
  public replies!: ReplyRDO[]
}
