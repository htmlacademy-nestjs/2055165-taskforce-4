import { Executor } from "@project/shared/app-types";
import { UserEntity } from "./user.entity";
import { genSalt, hash } from "bcrypt";

export class ExecutorEntity extends UserEntity implements Executor {
  specialization!: string[];
  completedTasksCount!: number;
  failedTasksCount!: number;
  rating!: number;
  ratingPosition!: number

  constructor(user: Executor) {
    super(user);
    this.fillEntity(user);
  }

  public fillEntity(user: Executor) {
    super.fillEntity(user);
    this.specialization = user.specialization;
    this.completedTasksCount = user.completedTasksCount;
    this.failedTasksCount = user.failedTasksCount;
    this.rating = user.rating;
    this.ratingPosition = user.ratingPosition;
  }

  public toObject() {
    return {
      ...super.toObject(),
      specialization: this.specialization,
      completedTasksCount: this.completedTasksCount,
      failedTasksCount: this.failedTasksCount,
      rating: this.rating,
      ratingPosition: this.ratingPosition
    }
  }

  public async setPassword(password: string): Promise<ExecutorEntity> {
    const salt = await genSalt(10);
    this.hashPassword = await hash(password, salt);
    return this;
  }
}
