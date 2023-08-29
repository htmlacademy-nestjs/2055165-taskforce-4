import { Injectable } from "@nestjs/common";
import { CRUDRepository } from "@project/util/util-types";
import { TaskEntity } from "../entities/task.entity";
import { PinTask, Task, UpdateTaskData, UserRole } from "@project/shared/app-types";
import { DatabaseService } from "../prisma/database.service";
import { TaskQuery } from '../queries/task/task.query';
import { PinTaskEntity } from "../entities/pin-task.entity";

@Injectable()
export class TaskRepository implements CRUDRepository<TaskEntity, Partial<Omit<Task, 'taskId'>>, Task> {
  private prisma;
  constructor(private readonly dbService: DatabaseService) {
    this.prisma = dbService.prismaPostgresConnector;
  }


  public async find({limit, category, page, userId, status, tag, city, sort, sortDirection}: TaskQuery) {


    // Список "Мои задания" для Role = Employer
    // await this.prisma.task.findMany({
    //   where: {
    //     status: status,
    //     employerId: userId
    //   }
    // })

    // Список "Мои задания" для Role = Executor ()
    return this.prisma.task.findMany({
      where: {
        status: status,
        pinned: {
            executorId: userId
        }
      }
    })


    // return this.prisma.task.findMany({
    //   where: {
    //     city: city,
    //     status: status,
    //     category: {
    //       categoryId: category
    //     },
    //     tags: tag ? {has: tag} : undefined
    //   },
    //   take: limit,
    //   include: {
    //     category: true
    //   },
    //   orderBy: [
    //     {'updatedAt': sortDirection}
    //   ],
    //   skip: page && page > 0 ? limit * (page - 1) : undefined,
    // })

  }


  public async findUserTasks({userId, status}: Pick<TaskQuery, 'userId' | 'status'>, role: UserRole) {
    if (role === UserRole.Employer) {

      return this.prisma.task.findMany({
        where: {
          status: status,
          employerId: userId
        },
        include: {
          category: true
        },
      });

    }

    return this.prisma.pinnedTask.findMany({
      where: {
        executorId: userId,
        task: {
          status
        }
      },
      include: {
        task: true
      }
    });


  }

  public async findById(taskId: number): Promise<Task | null> {
    return this.prisma.task.findUnique({
      where: {taskId},
      include: {
        category: true,
        replies: true
      }
    })
  }


  public async create(item: TaskEntity): Promise<Task> {
    const newData = item.toObject();

    return this.prisma.task.create({
      data: {
        ...newData,
        category: {
          connect: {categoryId: newData.category.categoryId}
        },
        replies: {
          connect: []
        }
      },
      include: {
        category: true,
      }
    })
  }


  public async update(taskId: number, item: UpdateTaskData): Promise<Task> {

    return this.prisma.task.update({
      where: {taskId},
      data: {
        ...item,
        category: item.category ? {
          connect: {categoryId: item.category.categoryId}
        } : undefined
      },
      include: {
        category: true,
        replies: true
      }
    })
  }


  public async delete(taskId: number): Promise<void> {
    await this.prisma.task.delete({
      where: {taskId}
    })
  }


  public async pin(item: PinTaskEntity): Promise<PinTask> {
    const {taskId, executorId} = item.toObject();

    return this.prisma.pinnedTask.create({
      data: {
        executorId,
        task: {
          connect: {taskId}
        }
      }
    })
  }


  public async findByPinId(pinId: number) {
    return this.prisma.pinnedTask.findUnique({
      where: {id: pinId}
    });
  }


  public async unpin(pinId: number): Promise<PinTask> {
    return this.prisma.pinnedTask.delete({
      where: {id: pinId}
    });
  }

}
