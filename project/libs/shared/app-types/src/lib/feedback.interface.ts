import { User } from "./user.interface";

export interface Feedback {
  readonly feedbackId: string;
  text: string;
  taskId: number;
  employer: User;
  executorId: string;
  rating: number;
}
