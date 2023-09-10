import { City, UserRole } from "@project/shared/app-types";
import { Expose, Transform } from "class-transformer";
import dayjs from "dayjs";

export default class UserAuthFullRDO {
  @Expose()
  public id!: number;

  @Expose()
  public name!: string;

  @Expose()
  public email!: string;

  @Expose()
  public avatar!: string;

  @Expose()
  public aboutInfo!: string;

  @Expose()
  public city!: City;

  @Expose()
  public role!: UserRole;

  @Expose({name: 'createdAt'})
  public registerDate!: string;

  @Expose({groups: [UserRole.Employer]})
  public publishedTasksCount!: number;

  @Expose({groups: [UserRole.Employer]})
  public newTasksCount!: number

//баг библиотеки class-validator, при несовпадении имени свойства - игнорируются группы)
  @Transform(({obj, value}) => {
    if (obj.role === UserRole.Employer) return;
    return dayjs().diff(dayjs(value), 'years');
  })
  @Expose({name: 'birthDate', groups: [UserRole.Executor]})
  public userAge!: string;

  @Expose({groups: [UserRole.Executor]})
  public specialization!: string[];

  @Expose({groups: [UserRole.Executor]})
  public completedTasksCount!: number;

  @Expose({groups: [UserRole.Executor]})
  public failedTasksCount!: number;

  @Expose({groups: [UserRole.Executor]})
  public rating!: number;

  @Expose({groups: [UserRole.Executor]})
  public ratingPosition!: number;

  @Expose()
  public accessToken!: string;

  @Expose()
  public refreshToken!: string;
}
