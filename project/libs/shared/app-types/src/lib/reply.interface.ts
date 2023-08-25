import { Task } from "./task.interface";

export interface Reply {
  readonly replyId: number;
  text?: string | null;
  task: Task;
  executorId: string;
}
