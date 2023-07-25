import { City } from "./city.enum";
import { TaskStatus } from "./task-status.enum";

export interface Task {
  id?: string;
  title: string;
  description: string;
  categoryId: string; //Ref?
  price: number;
  expirationDate?: Date;
  image?: string;
  address?: string;
  tags?: string[];
  city: City;
  status: TaskStatus;
  employerId: string; //Ref?
}
