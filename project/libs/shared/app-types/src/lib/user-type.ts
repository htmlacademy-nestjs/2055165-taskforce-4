import { User } from "./user.interface";

export type UserType<T> = T extends User
  ? T
  : never
;
