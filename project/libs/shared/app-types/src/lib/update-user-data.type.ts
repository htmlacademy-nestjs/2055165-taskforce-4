import { City } from "./city.enum"

export type UpdateUserData = {
  name?: string,
  birthDate?: Date,
  avatar?: string | null,
  city?: City,
  aboutInfo?: string | null,
  specialization?: string[],
  hashPassword?: string
}
