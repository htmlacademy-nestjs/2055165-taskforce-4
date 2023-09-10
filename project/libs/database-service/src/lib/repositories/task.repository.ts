import { Injectable } from "@nestjs/common";
import { CRUDRepository } from "@project/util/util-types";
import { TaskEntity } from "../entities/task.entity";
import { QuerySortType, Task, TaskStatus, UpdateTaskData, UserRole } from "@project/shared/app-types";
import { DatabaseService } from "../prisma/database.service";
import { TaskQuery } from '../queries/task/task.query';
import { UserTasksQuery } from "../queries/task/user-tasks.query";
import { DEFAULT_SORT_DIRECTION } from "../queries/task/task-query.constants";

const SortType = {
  [QuerySortType.Date]: 'createdAt',
  [QuerySortType.Discussed]: 'commentsCount',
  [QuerySortType.Popular]: 'repliesCount',
} as const;

@Injectable()
export class TaskRepository implements CRUDRepository<TaskEntity, Partial<Omit<Task, 'taskId'>>, Task> {
  private prisma;
  constructor(private readonly dbService: DatabaseService) {
    this.prisma = dbService.prismaPostgresConnector;
  }


  public async findNewTasks({limit, category, page, tag, city, sortType, sortDirection}: TaskQuery) {

    return this.prisma.task.findMany({
      where: {
        city: city,
        status: TaskStatus.New,
        category: {
          categoryId: category
        },
        tags: tag ? {has: tag} : undefined
      },
      take: limit,
      include: {
        category: true,
        replies: true
      },
      orderBy: {
        [SortType[sortType]]: sortDirection
      },
      skip: page && page > 0 ? limit * (page - 1) : undefined,
    })
  }


  public async findUserTasks({status, limit, page}: UserTasksQuery, userId: string, role: UserRole) {
    if (role === UserRole.Employer) {
      return this.prisma.task.findMany({
        where: {
          employerId: userId,
          status: status
        },
        take: limit,
        include: {
          category: true,
          replies: true
        },
        orderBy: {
          createdAt: DEFAULT_SORT_DIRECTION
        },
        skip: page && page > 0 ? limit * (page - 1) : undefined
      });
    }

    return this.prisma.task.findMany({
      where: {
        status: status,
        replies: {
          some: {
            executorId: userId
          }
        }
      },
      take: limit,
      select: {status: true, createdAt: true, updatedAt: true},
      // include: {
      //   category: true
      // },
      orderBy: {
        status: 'asc'
      },
      skip: page && page > 0 ? limit * (page - 1) : undefined
    });


  }

  public async findById(taskId: number): Promise<Task | null> {
    return this.prisma.task.findUnique({
      where: {taskId},
      include: {
        category: true,
        replies: {
          select: {
            executorId: true,
            text: true,
            createdAt: true
          }
        },
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


  public async getUserTasksCount(userId: string, role: UserRole) {

    if (role === UserRole.Employer) {
      const newTasksCount = await this.prisma.task.count({
        where: {
          employerId: userId,
          status: TaskStatus.New
        }
      })

      const publishedTasksCount = await this.prisma.task.count({
        where: {employerId: userId}
      })

      return {newTasksCount, publishedTasksCount}
    }


    const [completed, failed] = await this.prisma.task.groupBy({
      where: {
        replies: {every: { executorId: userId }},
        OR: [
          {status: TaskStatus.Failed},
          {status: TaskStatus.Completed}
        ]
      },
      by: ['status'],
      _count: true
    })

    return {
      completedTasksCount: completed?._count || 0,
      failedTasksCount: failed?._count || 0
    };
  }


  public async getFailedTasksCount() {
    return this.prisma.reply.groupBy({
      where: {
        task: {status: TaskStatus.Failed}
      },
      by: 'executorId',
      _count: true
    }).then((agg) => agg.map(({_count, executorId}) => ({failedTasksCount: _count || 0, executorId})))
  }
}
