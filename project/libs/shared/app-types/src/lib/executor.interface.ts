import { User } from "./user.interface";

export interface Executor extends User {
  specialization?: string[]
  completedTasksCount: number,
  failedTasksCount: number,
  rating: number,
  ratingPosition: number
}
