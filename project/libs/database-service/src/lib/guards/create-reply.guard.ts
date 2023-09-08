import { BadRequestException, CanActivate, ConflictException, ExecutionContext, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { Request } from "express";
import { JwtService }  from "@nestjs/jwt"

import { DatabaseService } from "../prisma/database.service";
import { TaskStatus, TokenPayload } from "@project/shared/app-types";

@Injectable()
export class CreateReplyGuard implements CanActivate {
  private prisma;
  constructor(
    @Inject(JwtService) private readonly jwtService: JwtService,
    @Inject(DatabaseService) private readonly dbService: DatabaseService
  ){
    this.prisma = dbService.prismaPostgresConnector;
  }

  async canActivate(cxt: ExecutionContext) {
    const {headers, body} = cxt.switchToHttp().getRequest<Request>();
    const token = headers.authorization?.replace('Bearer', '').trim();

    if (!token) {
      throw new UnauthorizedException('Permission denied. Only for authorized users.')
    }

    const {sub: id} = this.jwtService.decode(token) as TokenPayload;
    const {taskId} = body;
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
          executorId: id
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
