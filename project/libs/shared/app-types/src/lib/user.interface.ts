import { City } from "./city.enum";
import { UserRole } from "./user-role.enum";

export interface User {
  id?: string,
  name: string,
  email: string,
  aboutInfo?: string,
  avatar?: string,
  hashPassword: string,
  birthDate: Date,
  city: City,
  role: UserRole,
  registrationDate: Date,
  // specialization?: string[],
  // publishedTasksCount?: number,
  // newTasksCount?: number
  // completedTasksCount?: number,
  // failedTasksCount?: number,
  // rating?: number,
  // ratingPosition?: number
}
