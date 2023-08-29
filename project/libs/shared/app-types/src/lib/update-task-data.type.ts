import { Category, City, TaskStatus } from '@project/shared/app-types';


export type UpdateTaskData = {
  title?: string;
  description?: string;
  category?: Category;
  price?: number;
  expirationDate?: Date;
  image?: string;
  address?: string;
  tags?: string[];
  city?: City;
  status?: TaskStatus;
  repliesCount?: number;
  commentsCount?: number;
}
