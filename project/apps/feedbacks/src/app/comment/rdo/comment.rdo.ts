import { Expose, Type } from "class-transformer";
import AuthorRDO from "./author.rdo";

export default class CommentRDO {
    @Expose()
    public id!: string;

    @Expose()
    public text!: string;

    @Expose()
    public taskId!: number;

    @Expose()
    @Type(() => AuthorRDO)
    public author!: AuthorRDO;
}
