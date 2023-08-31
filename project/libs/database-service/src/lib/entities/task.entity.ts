import { Category, Task, TaskStatus } from "@project/shared/app-types";
import { City } from ".prisma/postgres-schema/index";

export class TaskEntity implements Omit<Task, 'taskId'> {
  title!: string;
  description!: string;
  category!: Category;
  price!: number;
  expirationDate?: Date | null;
  image?: string | null;
  address?: string | null;
  tags?: string[];
  city!: City;
  status!: TaskStatus;
  commentsCount!: number;
  repliesCount!: number;
  employerId!: string | null;
  pinnedId?: number | null;

  constructor(task: Omit<Task, 'taskId'>) {
    this.fillEntity(task);
  }

  public fillEntity(task: Omit<Task, 'taskId'>) {
    this.title = task.title;
    this.description = task.description;
    this.category = task.category;
    this.price = task.price;
    this.expirationDate = task.expirationDate;
    this.image = task.image;
    this.address = task.address;
    this.tags = task.tags;
    this.city = task.city;
    this.status = task.status;
    this.commentsCount = task.commentsCount;
    this.repliesCount = task.repliesCount;
    this.employerId = task.employerId;
    this.pinnedId = task.pinnedId
  }

  public toObject(): Omit<Task, 'taskId'> {
    return {
      title: this.title,
      description: this.description,
      category: this.category,
      price: this.price,
      expirationDate: this.expirationDate,
      image: this.image,
      address: this.address,
      tags: this.tags,
      city: this.city,
      status: this.status,
      commentsCount: this.commentsCount,
      repliesCount: this.repliesCount,
      employerId: this.employerId,
      pinnedId: this.pinnedId
    }
  }
}
