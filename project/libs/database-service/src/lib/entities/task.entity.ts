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
  commentsCount!: number;
  repliesCount!: number;
  employerId!: string;


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
    this.commentsCount = task.commentsCount;
    this.repliesCount = task.repliesCount;
    this.employerId = task.employerId;
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
      commentsCount: this.commentsCount,
      repliesCount: this.repliesCount,
      employerId: this.employerId,
    }
  }
}
