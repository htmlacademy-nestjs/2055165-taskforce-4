import { BadRequestException, CanActivate, ConflictException, ExecutionContext, ForbiddenException, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { Request } from "express";
import { JwtService }  from "@nestjs/jwt"

import { DatabaseService } from "../prisma/database.service";
import { TaskStatus, TokenPayload } from "@project/shared/app-types";

@Injectable()
export class CreateFeedbackGuard implements CanActivate {
  private prismaPsqlConnector;
  constructor(
    @Inject(JwtService) private readonly jwtService: JwtService,
    @Inject(DatabaseService) private readonly dbService: DatabaseService
  ){
    this.prismaPsqlConnector = dbService.prismaPostgresConnector;
  }

  async canActivate(cxt: ExecutionContext) {
    const {headers, body} = cxt.switchToHttp().getRequest<Request>();
    const token = headers.authorization?.replace('Bearer', '').trim();

    if (!token) {
      throw new UnauthorizedException('Permission denied. Only for authorized users.')
    }

    const {sub: employerId} = this.jwtService.decode(token) as TokenPayload;
    const {taskId, executorId} = body;
    const taskIdParsed = Number.parseInt(taskId)


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

    await this.prismaPsqlConnector.$disconnect()

    if (!task) throw new BadRequestException('Task not found')

    if (task.employerId !== employerId) throw new ForbiddenException('You aren\'t employer of this task.')

    if (!pinnedReply) throw new BadRequestException('This task was pinned to another executor')

    if (task.status !== TaskStatus.Completed) throw new ConflictException('The executor still hasn\'t completed this task yet or it\'s failed')

    return true;
  }
}
