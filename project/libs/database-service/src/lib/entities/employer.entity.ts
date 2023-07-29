import { Employer } from '@project/shared/app-types';
import { UserEntity } from './user.entity';


export class EmployerEntity extends UserEntity {
  publishedTasksCount!: number;
  newTasksCount!: number;

  constructor (employer: Employer) {
    super(employer)
    this.fillEntity(employer);
  }

  public fillEntity(employer: Employer) {
    this.publishedTasksCount = employer.publishedTasksCount;
    this.newTasksCount = employer.newTasksCount;
  }

  public toObject() {
    return {
     ...super.toObject(),
      publishedTasksCount: this.publishedTasksCount,
      newTasksCount: this.newTasksCount
    };
  }
}
