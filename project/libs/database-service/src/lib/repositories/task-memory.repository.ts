import { Injectable } from '@nestjs/common';

import { CRUDRepository } from '@project/util/util-types';
import { TaskEntity } from '../entities/task.entity';
import { Category, Reply, Task, UpdateTaskData} from '@project/shared/app-types';
import { CategoryEntity } from '../entities/category.entity';
import { ReplyEntity } from '../entities/reply.entity';

@Injectable()
export class TaskMemoryRepository implements CRUDRepository<TaskEntity, UpdateTaskData, Task> {
  private taskRepository: Record<string, Task> = {};
  private categoryRepository: Record<number, Category> = {};
  private replyRepository: Record<string, Reply> = {};


  public async findById(taskId: string): Promise<Task | null> {
    if (! this.taskRepository[taskId]) {
      return null
    }

    return {...this.taskRepository[taskId]};
  }

  public async findTasks(): Promise<Task[]> {
    return [...Object.values(this.taskRepository)];
  }


  public async createCategory(category: CategoryEntity): Promise<Category> {
    const entry = category.toObject();
    this.categoryRepository[category.id] = entry;

    return entry;
  }

  public async findByCategoryName(name: string): Promise<Category | null> {
    const existCategory = Object.values(this.categoryRepository).find((item) => item.name === name);

    if (!existCategory) {
      return null;
    }

    return {...existCategory};
  }

  public async findByCategoryId(categoryId: number): Promise<Category | null> {
    if (! this.categoryRepository[categoryId]) {
      return null
    }

    return {...this.categoryRepository[categoryId]};
  }


  public async createReply(reply: ReplyEntity): Promise<Reply> {
    const entry = reply.toObject();
    this.replyRepository[reply.id] = entry;

    return entry;
  }


  public async deleteReply(replyId: string): Promise<void> {
    delete this.replyRepository[replyId];
  }

  public async getRepliesByTaskId(taskId: string): Promise<Reply[]> {
    return Object.values(this.replyRepository).filter((reply) => reply.taskId === taskId);
  }


  public async create(item: TaskEntity): Promise<Task> {
    const entry = item.toObject();
    this.taskRepository[item.id] = entry;

    return entry;
  }


  public async update(taskId: string, item: UpdateTaskData): Promise<Task> {
    this.taskRepository[taskId] = {...this.taskRepository[taskId], ...item};
    return {...this.taskRepository[taskId]};
  }


  public async delete(taskId: string): Promise<void> {
    delete this.taskRepository[taskId];
  }
}
