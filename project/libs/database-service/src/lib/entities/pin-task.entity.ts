import { PinTask } from "@project/shared/app-types";

export class PinTaskEntity implements Omit<PinTask, 'id'> {
  taskId!: number;
  executorId!: string;

  constructor(pinTask: Omit<PinTask, 'id'>) {
    this.fillEntity(pinTask);
  }

  public fillEntity(pinTask: Omit<PinTask, 'id'>) {
    this.taskId = pinTask.taskId;
    this.executorId = pinTask.executorId;
  }

  public toObject() {
    return {
      taskId: this.taskId,
      executorId: this.executorId
    }
  }
}
