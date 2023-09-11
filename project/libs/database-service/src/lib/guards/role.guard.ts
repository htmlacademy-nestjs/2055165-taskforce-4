import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { TokenPayload, UserRole } from '@project/shared/app-types';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(cxt: ExecutionContext) {
    const roles = this.reflector.get<UserRole[]>('roles', cxt.getHandler());
    if (!roles) {
      return true;
    }

    const request = cxt.switchToHttp().getRequest();
    const {role} = request.body as TokenPayload;

    if (!roles.includes(role)) {
      throw new ForbiddenException(`Forbidden resource. This endpoint only for ${roles.join(' ')} role.`)
    }

    return true;
  }
}
