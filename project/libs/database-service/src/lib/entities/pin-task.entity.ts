import { PinTask } from "@project/shared/app-types";

export class PinTaskEntity implements Omit<PinTask, 'pinId'> {
  taskId!: number;
  executorId!: string;

  constructor(pinTask: Omit<PinTask, 'pinId'>) {
    this.fillEntity(pinTask);
  }

  public fillEntity(pinTask: Omit<PinTask, 'pinId'>) {
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
