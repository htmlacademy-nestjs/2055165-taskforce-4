import { Feedback } from "@project/shared/app-types";

export class FeedbackEntity implements Feedback {
  id!: string;
  text!: string;
  taskId!: string;
  employerId!: string;
  executorId!: string;
  rating!: number;
  createdAt!: Date;
  updatedAt!: Date;

  constructor (feedBack: Feedback) {
    this.fillEntity(feedBack);
  }

  public fillEntity(feedback: Feedback) {
    this.id = feedback.id;
    this.text = feedback.text;
    this.taskId = feedback.taskId;
    this.executorId = feedback.executorId;
    this.employerId = feedback.employerId;
    this.rating = feedback.rating;
    this.createdAt = feedback.createdAt;
    this.updatedAt = feedback.updatedAt;
  }

  public toObject() {
    return {
      id: this.id,
      text: this.text,
      taskId: this.taskId,
      executorId: this.executorId,
      employerId: this.employerId,
      rating: this.rating,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }
  }
}
