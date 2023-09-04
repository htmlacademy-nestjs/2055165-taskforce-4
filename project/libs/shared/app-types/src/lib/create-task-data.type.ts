import {City} from '@project/shared/app-types'

export type CreateTaskData = {
  title: string;
  description: string;
  categoryId: number;
  price: number;
  expirationDate?: Date;
  image?: string;
  address?: string;
  tags?: string[];
  city: City;
  employerId: string // должно выводиться автоматически
}
