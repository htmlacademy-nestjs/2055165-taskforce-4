import { City } from "./city.enum"

export type UpdateUserData = {
  name?: string,
  birthDate?: Date,
  avatar?: string,
  city?: City,
  aboutInfo?: string,
  specialization?: string[],
  hashPassword?: string
}
