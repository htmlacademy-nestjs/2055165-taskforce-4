import { Expose } from "class-transformer";

export default class ReplyRDO {
  @Expose()
  replyId!: number;

  @Expose()
  text!: string;

  @Expose()
  taskId!: number;

  @Expose()
  executorId!: string;

  @Expose({name: 'createdAt'})
  publishedAt!: string
}
