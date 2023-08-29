import { City } from '@project/shared/app-types'

export type UpdateUserData = {
  name?: string,
  birthDate?: Date,
  avatar?: string,
  city?: City,
  aboutInfo?: string,
  specialization?: string[],
  hashPassword?: string
}
