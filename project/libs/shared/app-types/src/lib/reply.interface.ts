export interface Reply {
  readonly id: string;
  text: string;
  taskId: string;
  executorId: string;
  createdAt: Date;
  updatedAt: Date;
}
