import { CanActivate, ConflictException, ExecutionContext, ForbiddenException, Inject, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { Request } from "express";
import { JwtService }  from "@nestjs/jwt"

import { DatabaseService } from "../prisma/database.service";
import { TaskStatus, TokenPayload } from "@project/shared/app-types";

@Injectable()
export class PinTaskGuard implements CanActivate {
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

      const {id} = this.jwtService.decode(token) as TokenPayload;
      const {taskId} = params;
      const taskIdParsed = Number.parseInt(taskId)

      const {executorId} = body;

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

      if (task.employerId !== id) throw new ForbiddenException('This employer can\'t modify this task.')

      if (!reply) throw new NotFoundException('The executor didn\'t reply on this task')

      if (otherTaskInProgress) throw new ConflictException('The executor already has a task in progress.')

      if (task.status !== TaskStatus.New) throw new ConflictException('Task has already been pinned to another executor');


    return true;
  }

}
