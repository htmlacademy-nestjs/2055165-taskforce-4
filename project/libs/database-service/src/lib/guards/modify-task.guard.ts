import { CanActivate, ExecutionContext, ForbiddenException, Inject, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { Request } from "express";
import { JwtService }  from "@nestjs/jwt"

import { DatabaseService } from "../prisma/database.service";
import { TaskStatus, TokenPayload, UserRole } from "@project/shared/app-types";

const statusUpdateScheme = {
  [TaskStatus.New] : {
    [UserRole.Employer] : TaskStatus.Cancelled,
    [UserRole.Executor] : undefined
  },
  [TaskStatus.InProgress] : {
    [UserRole.Employer] : TaskStatus.Completed,
    [UserRole.Executor] : TaskStatus.Failed
  },
  [TaskStatus.Cancelled] : {
    [UserRole.Employer] : undefined,
    [UserRole.Executor] : undefined
  },
  [TaskStatus.Completed] : {
    [UserRole.Employer] : undefined,
    [UserRole.Executor] : undefined
  },
  [TaskStatus.Failed] : {
    [UserRole.Employer] : undefined,
    [UserRole.Executor] : undefined
  }
}

@Injectable()
export class ModifyTaskGuard implements CanActivate {
  private prisma;
  constructor(
    @Inject(JwtService) private readonly jwtService: JwtService,
    @Inject(DatabaseService) private readonly dbService: DatabaseService
  ){
    this.prisma = dbService.prismaPostgresConnector;
  }

  async canActivate(cxt: ExecutionContext) {
    const {params, headers, body} = cxt.switchToHttp().getRequest<Request>();
    const token = headers.authorization?.replace('Bearer', '').trim();

    if (!token) {
      throw new UnauthorizedException('Permission denied. Only for authorized users.')
    }

      const {id, role} = this.jwtService.decode(token) as TokenPayload;
      const {taskId} = params;
      const taskIdParsed = Number.parseInt(taskId)
      const {status} = body as {status: TaskStatus};


      const task = await this.prisma.task.findUnique({where: {taskId: taskIdParsed}})
      await this.prisma.$disconnect();

      if (!task) throw new NotFoundException('Task not found.');

      if (task.employerId !== id) throw new ForbiddenException('This employer can\'t modify this task.')

      if (status) {
        const possibleUpdatedStatus = statusUpdateScheme[task.status][role];
        if (status !== possibleUpdatedStatus) {
          throw new ForbiddenException(`This status can't be assigned by ${role}.`)
        }
      }

    return true;
  }

}
