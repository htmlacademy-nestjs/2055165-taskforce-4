import { Expose } from "class-transformer";

export default class CommentRDO {

  @Expose()
  public id!: string;

  @Expose()
  public text!: string;

  @Expose()
  public taskId!: string;

  @Expose()
  public authorId!: string;
}
