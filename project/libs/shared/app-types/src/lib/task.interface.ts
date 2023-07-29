import { City } from "./city.enum";
import { TaskStatus } from "./task-status.enum";

export interface Task {
  readonly id: string;
  title: string;
  description: string;
  categoryId: number; //Ref?
  price: number;
  expirationDate?: Date;
  image?: string;
  address?: string;
  tags?: string[];
  city: City;
  status: TaskStatus;
  employerId: string; //Ref?
  readonly createdAt: Date;
  updatedAt: Date
}
