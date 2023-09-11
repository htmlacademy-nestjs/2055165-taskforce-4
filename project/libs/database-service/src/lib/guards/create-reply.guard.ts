import { BadRequestException, CanActivate, ConflictException, ExecutionContext, Inject, Injectable } from "@nestjs/common";
import { Request } from "express";

import { DatabaseService } from "../prisma/database.service";
import { TaskStatus } from "@project/shared/app-types";

@Injectable()
export class CreateReplyGuard implements CanActivate {
  private prisma;
  constructor(
    @Inject(DatabaseService) private readonly dbService: DatabaseService
  ){
    this.prisma = dbService.prismaPostgresConnector;
  }

  async canActivate(cxt: ExecutionContext) {
    const {body} = cxt.switchToHttp().getRequest<Request>();
    const {taskId, userId} = body;
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
          executorId: userId
        }
      }
    })

    await this.prisma.$disconnect();

    if (!task) throw new BadRequestException('Task not found');

    if (task.status !== TaskStatus.New) throw new ConflictException('This task has already pinned to another executor.')

    if (reply) throw new ConflictException('The executor has already replied on this task.')


    return true;
  }
}
