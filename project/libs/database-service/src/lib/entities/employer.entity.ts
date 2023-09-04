import { genSalt, hash } from "bcrypt";

import { Employer } from "@project/shared/app-types";
import { UserEntity } from "./user.entity";

export class EmployerEntity extends UserEntity implements Omit<Employer, 'id'> {
  publishedTasksCount!: number | null;
  newTasksCount!: number | null;

  constructor(user: Omit<Employer, 'id'>) {
    super(user);
    this.fillEntity(user);
  }

  public fillEntity(user: Omit<Employer, 'id'>) {
    super.fillEntity(user);
    this.publishedTasksCount = user.publishedTasksCount;
    this.newTasksCount = user.newTasksCount;
  }

  public toObject() {
    return {
      ...super.toObject(),
      publishedTasksCount: this.publishedTasksCount,
      newTasksCount: this.newTasksCount
    }
  }

  public async setPassword(password: string): Promise<EmployerEntity> {
    const salt = await genSalt(10);
    this.hashPassword = await hash(password, salt);
    return this;
  }
}
