import { User, Feedback } from "@project/shared/app-types";

export class FeedbackEntity implements Omit<Feedback, 'feedbackId'> {
  text!: string;
  taskId!: number;
  employer!: User;
  executorId!: string;
  rating!: number;

  constructor (feedBack: Omit<Feedback, 'feedbackId'>) {
    this.fillEntity(feedBack);
  }

  public fillEntity(feedback: Omit<Feedback, 'feedbackId'>) {
    this.text = feedback.text;
    this.taskId = feedback.taskId;
    this.executorId = feedback.executorId;
    this.employer = feedback.employer;
    this.rating = feedback.rating;
  }

  public toObject() {
    return {
      text: this.text,
      taskId: this.taskId,
      executorId: this.executorId,
      employer: this.employer,
      rating: this.rating,
    }
  }
}
