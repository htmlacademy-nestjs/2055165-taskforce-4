import { City, UserRole } from "@project/shared/app-types";
import { Expose, Transform } from "class-transformer";
import dayjs from "dayjs";

export default class ExecutorFullRDO {
    @Expose()
    public id!: number;

    @Expose()
    public name!: string;

    @Expose()
    public email!: string;

    @Expose({name: 'birthDate'})
    @Transform(({value}) => {
      return dayjs().diff(dayjs(value), 'years');
    })
    public userAge!: string;

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

    @Expose()
    public specialization!: string[];

    @Expose()
    public completedTasksCount!: number;

    @Expose()
    public failedTasksCount!: number;

    @Expose()
    public rating!: number;

    @Expose()
    public ratingPosition!: number;

}
