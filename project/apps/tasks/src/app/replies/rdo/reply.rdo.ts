import { Expose } from "class-transformer";

export default class ReplyRDO {
  @Expose()
  id!: string;

  @Expose()
  text!: string;

  @Expose()
  taskid!: string;

  @Expose()
  executorId!: string;
}
