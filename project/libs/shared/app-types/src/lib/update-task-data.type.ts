import { City } from "./city.enum";
import { TaskStatus } from "./task-status.enum";

export type UpdateTaskData = {
  title?: string;
  description?: string;
  categoryId?: number; //Ref?
  price?: number;
  expirationDate?: Date;
  image?: string;
  address?: string;
  tags?: string[];
  city?: City;
  status?: TaskStatus;
  updatedAt: Date
}
