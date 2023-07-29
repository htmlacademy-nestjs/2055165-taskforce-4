import { City, Task, TaskStatus } from "@project/shared/app-types";

export class TaskEntity implements Task {
  id!: string;
  title!: string;
  description!: string;
  categoryId!: number;
  price!: number;
  expirationDate?: Date;
  image?: string;
  address?: string;
  tags?: string[];
  city!: City;
  status!: TaskStatus;
  employerId!: string;
  createdAt!: Date;
  updatedAt!: Date

  constructor(task: Task) {
    this.fillEntity(task);
  }

  public fillEntity(task: Task) {
    this.id = task.id;
    this.title = task.title;
    this.description = task.description;
    this.categoryId = task.categoryId;
    this.price = task.price;
    this.expirationDate = task.expirationDate;
    this.image = task.image;
    this.address = task.address;
    this.tags = task.tags;
    this.city = task.city;
    this.status = task.status;
    this.employerId = task.employerId;
    this.createdAt = task.createdAt;
    this.updatedAt = task.updatedAt;
  }

  public toObject() {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      categoryId: this.categoryId,
      price: this.price,
      expirationDate: this.expirationDate,
      image: this.image,
      address: this.address,
      tags: this.tags,
      city: this.city,
      status: this.status,
      employerId: this.employerId,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }
  }
}
