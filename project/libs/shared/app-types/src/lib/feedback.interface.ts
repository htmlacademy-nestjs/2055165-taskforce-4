export interface Feedback {
  readonly id: string;
  text: string;
  taskId: string;
  employerId: string;
  executorId: string; //как лучше сделать?
  rating: number;
  readonly createdAt: Date;
  updatedAt: Date;
}
