import { Expose, Type } from "class-transformer";
import AuthorRDO from "../../comment/rdo/author.rdo";

export default class FeedbackRDO {
  @Expose()
  public id!: string

  @Expose()
  public text!: string;

  @Expose()
  public taskId!: number;

  @Expose()
  public executorId!: string;

  @Expose()
  public rating!: number;

  @Expose()
  @Type(() => AuthorRDO)
  public employer!: AuthorRDO


}
