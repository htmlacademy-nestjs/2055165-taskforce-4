import { Executor } from '@project/shared/app-types';
import { UserEntity } from './user.entity';


export class ExecutorEntity extends UserEntity {
  specialization!: string[];
  completedTasksCount!: number;
  failedTasksCount!: number;
  rating!: number;
  ratingPosition!: number;

  constructor (executor: Executor) {
    super(executor);
    this.fillEntity(executor);
  }

  public fillEntity(executor: Executor) {
    this.specialization = executor.specialization;
    this.completedTasksCount = executor.completedTasksCount;
    this.failedTasksCount = executor.failedTasksCount;
    this.rating = executor.rating;
    this.ratingPosition = executor.ratingPosition;
  }

  public toObject() {
    return {
      ...super.toObject(),
      specialization: this.specialization,
      completedTasksCount: this.completedTasksCount,
      failedTasksCount: this.failedTasksCount,
      rating: this.rating,
      ratingPosition: this.ratingPosition,
    };
  }
}
