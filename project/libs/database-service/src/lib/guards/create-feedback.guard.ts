import { BadRequestException, CanActivate, ConflictException, ExecutionContext, ForbiddenException, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { Request } from "express";

import { DatabaseService } from "../prisma/database.service";
import { TaskStatus } from "@project/shared/app-types";

@Injectable()
export class CreateFeedbackGuard implements CanActivate {
  private prismaPsqlConnector;
  private prismaMongoConnector;

  constructor(
    @Inject(DatabaseService) private readonly dbService: DatabaseService
  ){
    this.prismaPsqlConnector = dbService.prismaPostgresConnector;
    this.prismaMongoConnector = dbService.prismaBaseMongoConnector;
  }

  async canActivate(cxt: ExecutionContext) {
    const {headers, body} = cxt.switchToHttp().getRequest<Request>();
    const token = headers.authorization?.replace('Bearer', '').trim();

    if (!token) {
      throw new UnauthorizedException('Permission denied. Only for authorized users.')
    }

    const {taskId, executorId, userId} = body;
    const taskIdParsed = Number.parseInt(taskId)

    if (!taskId || !executorId) {
      throw new BadRequestException('Some required fields are missing. Check your request.');
    }

    const task = await this.prismaPsqlConnector.task.findUnique({
      where: {taskId: taskIdParsed}
    })

    const pinnedReply = await this.prismaPsqlConnector.reply.findUnique({
      where: {
        taskId_executorId: {
          taskId,
          executorId
        }
      }
    })

    const existFeedback = await this.prismaMongoConnector.feedBack.findUnique({
      where: {taskId: taskIdParsed}
    })

    await this.prismaPsqlConnector.$disconnect();
    await this.prismaMongoConnector.$disconnect();

    if (!task) throw new BadRequestException('Task not found')

    if (existFeedback) throw new ConflictException('There is already another feedback on this task.')

    if (task.employerId !== userId) throw new ForbiddenException('You aren\'t employer of this task.')

    if (!pinnedReply) throw new BadRequestException('This task was pinned to another executor')

    if (task.status !== TaskStatus.Completed) throw new ConflictException('The executor still hasn\'t completed this task yet or it\'s failed')

    return true;
  }
}
