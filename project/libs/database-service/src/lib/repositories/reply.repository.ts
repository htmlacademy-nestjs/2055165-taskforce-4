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

  public async find(taskId: number, executorId: string) {
    return this.prisma.reply.findUnique({
      where: {
        taskId_executorId: {
          taskId: taskId,
          executorId: executorId
        }
      }
    })
  }


  public async findAllByTaskId(taskId: number) {
    return this.prisma.reply.findMany({
      where: {
        task: {
          taskId
        }
      },
    })
  }


  public async delete(taskId: number, executorId: string) {
    return this.prisma.reply.delete({
      where: {
        taskId_executorId: {
          taskId: taskId,
          executorId: executorId
        }
      }
    })
  }


  public async pinTask(taskId: number, executorId: string) {
    return this.prisma.reply.deleteMany({
      where: {
        taskId,
        executorId: {
          not: executorId
        }
      }
    })
  }
}
