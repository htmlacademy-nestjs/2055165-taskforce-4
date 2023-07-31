import { Expose } from "class-transformer";

export default class FeedbackRDO {
  @Expose()
  public id!: string

  @Expose()
  public text!: string;

  @Expose()
  public executorId!: string;

  @Expose()
  public rating!: number;
}
