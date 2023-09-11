import { City, UserRole } from '@project/shared/app-types';


export interface User {
  readonly id: string,
  name: string,
  email: string,
  aboutInfo?: string,
  avatar?: string,
  hashPassword?: string,
  birthDate: Date,
  city: City
  role: UserRole,
  specialization?: string[]
}
