import { Expose, Type } from "class-transformer";
import UserBasicRDO from "../../authentication/rdo/user-basic.rdo";

export default class CommentFullRDO {
    @Expose()
    public id!: string;

    @Expose()
    public text!: string;

    @Expose()
    public taskId!: number;

    @Expose()
    @Type(() => UserBasicRDO)
    public author!: UserBasicRDO;
}
