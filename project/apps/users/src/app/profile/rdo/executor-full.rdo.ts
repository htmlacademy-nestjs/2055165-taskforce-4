import { City, UserRole } from "@project/shared/app-types";
import { Expose } from "class-transformer";

export default class ExecutorFullRDO {
    @Expose()
    public id!: number;

    @Expose()
    public name!: string;

    @Expose()
    public email!: string;

    @Expose()
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
