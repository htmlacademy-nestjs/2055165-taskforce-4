import { Category, City, TaskStatus } from '@project/shared/app-types';

export interface Task {
  readonly taskId: number;
  title: string;
  description: string;
  category: Category;
  price: number;
  expirationDate?: Date | null;
  image?: string | null;
  address?: string | null;
  tags?: string[];
  city: City;
  status: TaskStatus;
  commentsCount: number;
  repliesCount: number;
  employerId: string | null;
  pinnedId?: number | null
}
