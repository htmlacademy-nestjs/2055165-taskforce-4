import { CanActivate, ExecutionContext, ForbiddenException, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { Request } from "express";

import { DatabaseService } from "../prisma/database.service";
import { TaskStatus, UserRole } from "@project/shared/app-types";

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
    @Inject(DatabaseService) private readonly dbService: DatabaseService
  ){
    this.prisma = dbService.prismaPostgresConnector;
  }

  async canActivate(cxt: ExecutionContext) {
    const {params: {taskId}, body} = cxt.switchToHttp().getRequest<Request>();

      const taskIdParsed = Number.parseInt(taskId)
      const status = body.status as {status: TaskStatus};
      const role = body.role as UserRole;
      const userId = body.userId;


      const task = await this.prisma.task.findUnique({where: {taskId: taskIdParsed}})
      await this.prisma.$disconnect();

      if (!task) throw new NotFoundException('Task not found.');

      if (task.employerId !== userId) throw new ForbiddenException('This employer can\'t modify this task.')

      if (status) {
        const possibleUpdatedStatus = statusUpdateScheme[task.status][role];
        if (!possibleUpdatedStatus && status !== possibleUpdatedStatus) {
          throw new ForbiddenException(`This status can't be assigned by ${role}.`)
        }
      }

    return true;
  }

}
