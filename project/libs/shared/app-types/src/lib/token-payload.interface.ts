import { UserRole } from "..";

export interface TokenPayload {
  sub: string;
  name: string;
  email: string;
  role: UserRole;
}
