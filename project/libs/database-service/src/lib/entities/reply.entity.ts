import { Reply } from "@project/shared/app-types";

export class ReplyEntity implements Reply {
  id!: string;
  text!: string;
  taskId!: string;
  executorId!: string;
  createdAt!: Date;
  updatedAt!: Date;

  constructor (reply: Reply) {
    this.fillEntity(reply);
  }

  public fillEntity(reply: Reply) {
    this.id = reply.id;
    this.text = reply.text;
    this.taskId = reply.taskId;
    this.executorId = reply.executorId;
    this.createdAt = reply.createdAt;
    this.updatedAt = reply.updatedAt;
  }

  public toObject() {
    return {
      id: this.id,
      text: this.text,
      taskId: this.taskId,
      executorId: this.executorId,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }
  }
}

