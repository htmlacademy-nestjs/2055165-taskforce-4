import { Employer } from "./employer.interface";

export interface Feedback {
  readonly feedbackId: string;
  text: string;
  taskId: number;
  employer: Employer;
  executorId: string;
  rating: number;
}
