import { City } from "./city.enum";
import { UserRole } from "./user-role.enum";

export interface User {
  readonly id: number,
  name: string,
  email: string,
  aboutInfo?: string,
  avatar?: string,
  hashPassword: string,
  birthDate: Date,
  city: City,
  role: UserRole,
  readonly createdAt: Date,
  updatedAt: Date
}
