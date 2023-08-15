import { City } from "./city.enum";
import { UserRole } from "./user-role.enum";

export interface User {
  readonly id?: string,
  name: string,
  email: string,
  aboutInfo?: string,
  avatar?: string,
  hashPassword: string,
  birthDate: Date,
  city: City
  role: UserRole,
}
