import { Injectable } from "@nestjs/common";
import { CRUDRepository } from "@project/util/util-types";
import { TaskEntity } from "../entities/task.entity";
import { PinTask, Task, UpdateTaskData, UserRole } from "@project/shared/app-types";
import { DatabaseService } from "../prisma/database.service";
import { TaskQuery } from '../queries/task/task.query';
import { PinTaskEntity } from "../entities/pin-task.entity";
import { UserTasksQuery } from "../queries/task/user-tasks.query";

const SortType = {
  'date': 'updatedAt',
  'discussed': 'commentsCount',
  'popular': 'repliesCount'
} as const;

@Injectable()
export class TaskRepository implements CRUDRepository<TaskEntity, Partial<Omit<Task, 'taskId'>>, Task> {
  private prisma;
  constructor(private readonly dbService: DatabaseService) {
    this.prisma = dbService.prismaPostgresConnector;
  }


  public async find({limit, category, page, status, tag, city, sortType, sortDirection}: TaskQuery) {

    return this.prisma.task.findMany({
      where: {
        city: city,
        status: status,
        category: {
          categoryId: category
        },
        tags: tag ? {has: tag} : undefined
      },
      take: limit,
      include: {
        category: true
      },
      orderBy: {
        [SortType[sortType]]: sortDirection
      },
      skip: page && page > 0 ? limit * (page - 1) : undefined,
    })
  }


  public async findUserTasks({userId, status, limit, page}: UserTasksQuery, role: UserRole) {
    if (role === UserRole.Employer) {
      return this.prisma.task.findMany({
        where: {
          status: status,
          employerId: userId
        },
        take: limit,
        include: {
          category: true
        },
        skip: page && page > 0 ? limit * (page - 1) : undefined
      });
    }

    return this.prisma.task.findMany({
      where: {
        status: status,
        pinnedTo: {
          executorId: userId
        }
      },
      take: limit,
      include: {
        category: true
      },
      skip: page && page > 0 ? limit * (page - 1) : undefined
    });


  }

  public async findById(taskId: number): Promise<Task | null> {
    return this.prisma.task.findUnique({
      where: {taskId},
      include: {
        category: true,
        replies: true,
        pinnedTo: {
          select: {
            executorId: true
          }
        }
      }
    })
  }


  public async create(item: TaskEntity): Promise<Task> {
    const taskData = item.toObject();

    return this.prisma.task.create({
      data: {
        ...taskData,
        category: {
          connect: {categoryId: taskData.category.categoryId}
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


  public async findPinByTaskId(taskId: number) {
    return this.prisma.pinnedTask.findUnique({
      where: {taskId}
    });
  }


  public async pin(item: PinTaskEntity) {
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


  public async unpin(taskId: number): Promise<PinTask> {
    return this.prisma.pinnedTask.delete({
      where: {taskId}
    });
  }

}
