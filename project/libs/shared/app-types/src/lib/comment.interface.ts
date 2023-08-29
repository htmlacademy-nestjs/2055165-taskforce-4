import { User } from "./user.interface";

export interface Comment {
  readonly commentId: string;
  text: string;
  taskId: number;
  author: User;
}
