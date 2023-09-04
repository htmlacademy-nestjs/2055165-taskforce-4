import { User } from "./user.interface";

export interface Employer extends User {
  publishedTasksCount: number | null,
  newTasksCount: number | null;
}
