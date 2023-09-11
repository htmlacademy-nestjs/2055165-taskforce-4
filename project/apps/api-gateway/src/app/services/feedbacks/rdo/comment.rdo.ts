import { Expose } from "class-transformer";

export default class CommentRDO {
  @Expose()
  public id!: string;

  @Expose()
  public text!: string;

  @Expose()
  public taskId!: number;

  @Expose()
  public authorId!: string;
}
