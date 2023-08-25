import { Injectable } from "@nestjs/common";
import { DatabaseService } from "../prisma/database.service";
import { ReplyEntity } from "../entities/reply.entity";

@Injectable()
export class ReplyRepository {
  private prisma;
  constructor(private readonly dbService: DatabaseService) {
    this.prisma = dbService.prismaPostgresConnector;
  }

  public async create(item: ReplyEntity) {
    const newData = item.toObject();
    return this.prisma.reply.create({
      data: {
        ...newData,
        task: {
          connect: {taskId: newData.task.taskId}
        }
      },
    })
  }


  public async getByTaskId(taskId: number) {
    return this.prisma.reply.findMany({
      where: {
        task: {
          taskId
        }
      },
    })
  }


  public async delete(replyId: number) {
    return this.prisma.reply.delete({
      where: {
        replyId
      }
    })
  }
}
