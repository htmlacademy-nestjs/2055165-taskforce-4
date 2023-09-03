import { UserRole } from "..";

export interface TokenPayload {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}
