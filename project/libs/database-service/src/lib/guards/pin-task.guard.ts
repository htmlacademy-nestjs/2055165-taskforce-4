import { CanActivate, ConflictException, ExecutionContext, ForbiddenException, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { Request } from "express";

import { DatabaseService } from "../prisma/database.service";
import { TaskStatus } from "@project/shared/app-types";

@Injectable()
export class PinTaskGuard implements CanActivate {
  private prisma;
  constructor(
    @Inject(DatabaseService) private readonly dbService: DatabaseService
  ){
    this.prisma = dbService.prismaPostgresConnector;
  }

  async canActivate(cxt: ExecutionContext) {
    const {params: {taskId}, body: {executorId, userId}} = cxt.switchToHttp().getRequest<Request>();
    const taskIdParsed = Number.parseInt(taskId)

    const task = await this.prisma.task.findUnique({
      where: {
        taskId: taskIdParsed
      }
    })


    const reply = await this.prisma.reply.findUnique({
      where: {
        taskId_executorId: {
          taskId: taskIdParsed,
          executorId: executorId
        }
      }
    })


    const otherTaskInProgress = await this.prisma.reply.findFirst({
      where: {
        executorId,
        task: {
          status: {
            equals: TaskStatus.InProgress
          }
        }},
    })

    await this.prisma.$disconnect();


    if (!task) throw new NotFoundException('Task not found.');

    if (task.employerId !== userId) throw new ForbiddenException('This employer can\'t modify this task.')

    if (!reply) throw new NotFoundException('The executor didn\'t reply on this task')

    if (otherTaskInProgress) throw new ConflictException('The executor already has a task in progress.')

    if (task.status !== TaskStatus.New) throw new ConflictException('Task has already been pinned to another executor');


    return true;
  }

}
