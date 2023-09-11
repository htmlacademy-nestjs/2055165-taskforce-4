import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from "@nestjs/common";

@Injectable()
export class UserIdAndRoleInterceptor implements NestInterceptor {
  public intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest();
    request.body['userId'] = request.user.sub;
    request.body['role'] = request.user.role;

    return next.handle();
  }
}
