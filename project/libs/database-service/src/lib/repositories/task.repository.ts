import { Injectable } from "@nestjs/common";

import { CRUDRepository } from "@project/util/util-types";
import { TaskEntity } from "../entities/task.entity";
import { Task, UpdateTaskData } from "@project/shared/app-types";
import { DatabaseService } from "../prisma/database.service";

@Injectable()
export class TaskRepository implements CRUDRepository<TaskEntity, UpdateTaskData, Task> {
  private prisma;
  constructor(private readonly dbService: DatabaseService) {
    this.prisma = dbService.prismaPostgres;
  }

  findById(taskId: number): Promise<Task | null> {
    return this.prisma.task.findUnique({
      where: {taskId},
      include: {
        category: true
      }
    })
  }


  create(item: TaskEntity): Promise<Task> {
    const newData = item.toObject();
    return this.prisma.task.create({
      data: {
        ...newData,
        category: {
          connect: {categoryId: newData.category.categoryId}
        }
      },
      include: {
        category: true
      }
    })
  }


  public async update(id: number, item: UpdateTaskData): Promise<Task> {
    throw new Error("Method not implemented.");
  }


  public async delete(taskId: number): Promise<void> {
    await this.prisma.task.delete({
      where: {taskId}
    })
  }

}
