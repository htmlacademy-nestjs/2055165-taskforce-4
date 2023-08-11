import { City } from "./city.enum";
import { UserRole } from "./user-role.enum";

export interface User {
  readonly id: string,
  name: string,
  email: string,
  aboutInfo?: string | null,
  avatar?: string | null,
  hashPassword: string,
  birthDate: Date,
  city: City,
  role: UserRole,
  readonly createdAt: Date,
  updatedAt: Date
}
