import { Reply, Task } from "@project/shared/app-types";

export class ReplyEntity implements Omit<Reply, 'replyId'> {
  text?: string | null;
  task!: Task;
  executorId!: string;


  constructor (reply: Omit<Reply, 'replyId'>) {
    this.fillEntity(reply);
  }

  public fillEntity(reply: Omit<Reply, 'replyId'>) {
    this.text = reply.text;
    this.task = reply.task;
    this.executorId = reply.executorId;
  }

  public toObject() {
    return {
      text: this.text,
      task: this.task,
      executorId: this.executorId,
    }
  }
}

