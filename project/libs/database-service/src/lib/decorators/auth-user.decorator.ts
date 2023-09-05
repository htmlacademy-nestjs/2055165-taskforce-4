import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import { TokenPayload } from "@project/shared/app-types";


export const AuthUser = createParamDecorator (
  (data: keyof TokenPayload, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user as TokenPayload;

    return data ? user?.[data] : user
  },
)
