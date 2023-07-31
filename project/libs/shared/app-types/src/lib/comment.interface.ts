export interface Comment {
  readonly id: string;
  text: string;
  taskId: string;
  authorId: string;
  readonly createdAt: Date;
  updatedAt: Date;
}
