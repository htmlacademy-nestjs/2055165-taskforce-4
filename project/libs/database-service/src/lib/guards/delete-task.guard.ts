import { CanActivate, ExecutionContext, ForbiddenException, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { Request } from "express";

import { DatabaseService } from "../prisma/database.service";

@Injectable()
export class DeleteTaskGuard implements CanActivate {
  private prisma;
  constructor(
    @Inject(DatabaseService) private readonly dbService: DatabaseService
  ){
    this.prisma = dbService.prismaPostgresConnector;
  }

  async canActivate(cxt: ExecutionContext) {
    const {params: {taskId}, body:{userId}} = cxt.switchToHttp().getRequest<Request>();

      const taskIdParsed = Number.parseInt(taskId)

      const task = await this.prisma.task.findUnique({where: {taskId: taskIdParsed}})
      await this.prisma.$disconnect();

      if (!task) throw new NotFoundException('Task not found.');

      if (task.employerId !== userId) throw new ForbiddenException('This employer can\'t delete this task.')


    return true;
  }

}
