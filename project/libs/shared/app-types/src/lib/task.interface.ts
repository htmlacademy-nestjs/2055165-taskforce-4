import { City, TaskStatus } from '@project/shared/app-types';

export interface Task {
  readonly id: string;
  title: string;
  description: string;
  categoryId: number;
  price: number;
  expirationDate?: Date;
  image?: string;
  address?: string;
  tags?: string[];
  city: City;
  status: TaskStatus;
  commentsCount: number;
  repliesCount: number;
  employerId: string;
}
