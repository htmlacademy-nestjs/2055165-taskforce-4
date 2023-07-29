export interface Reply {
  readonly id: string;
  text: string;
  taskId: string;
  executorId: string;
  readonly createdAt: Date;
  updatedAt: Date;
}
