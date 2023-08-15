import { City } from "./city.enum";
import { TaskStatus } from "./task-status.enum";

export interface Task {
  readonly id: string;
  title: string;
  description: string;
  categoryId: number;
  price: number;
  expirationDate?: Date;
  image?: string;
  address?: string;
  tags?: string[];
  city: City;
  status: TaskStatus;
  commentsCount: number;
  repliesCount: number;
  employerId: string;
}
