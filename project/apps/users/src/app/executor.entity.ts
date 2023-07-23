import { UserRole, City, Executor } from '@project/shared/app-types';


export class ExecutorEntity implements Executor {
  id: string;
  name: string;
  email: string;
  aboutInfo: string;
  avatar: string;
  hashPassword: string;
  birthDate: Date;
  city: City;
  role: UserRole;
  registrationDate: Date;
  specialization: string[];
  completedTasksCount: number;
  failedTasksCount: number;
  rating: number;
  ratingPosition: number;

  constructor (executor: Executor) {
    this.fillEntity(executor);
  }

  public fillEntity(executor: Executor) {
    this.id = executor.id;
    this.name = executor.name;
    this.email = executor.email;
    this.aboutInfo = executor.aboutInfo;
    this.avatar = executor.avatar;
    this.hashPassword = executor.hashPassword;
    this.birthDate = executor.birthDate;
    this.city = executor.city;
    this.role = executor.role;
    this.registrationDate = executor.registrationDate;
    this.completedTasksCount = executor.completedTasksCount;
    this.failedTasksCount = executor.failedTasksCount;
    this.rating = executor.rating;
    this.ratingPosition = executor.ratingPosition;
  }

  public toObject() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      aboutInfo: this.aboutInfo,
      avatar: this.avatar,
      hashPassword: this.hashPassword,
      birthDate: this.birthDate,
      city: this.city,
      role: this.role,
      registrationDate: this.registrationDate,
      completedTasksCount: this.completedTasksCount,
      failedTasksCount: this.failedTasksCount,
      rating: this.rating,
      ratingPosition: this.ratingPosition,
    };
  }
}
