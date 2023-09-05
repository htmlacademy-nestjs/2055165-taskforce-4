import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';

import { TaskRepository, TaskEntity, CategoryRepository, UserTasksQuery, ReplyRepository } from '@project/database-service'
import { Task, TaskStatus, UserRole } from '@project/shared/app-types';
import { TaskQuery } from '@project/database-service';
import CreateTaskDTO from './dto/create-task.dto';
import UpdateTaskDTO from './dto/update-task.dto';

@Injectable()
export class TaskService {
  constructor(
    private readonly taskRepository: TaskRepository,
    private readonly categoryRepository: CategoryRepository,
    private readonly replyRepository: ReplyRepository
  ){}

  public async createTask(data: CreateTaskDTO, employerId: string) {
    const category = await this.categoryRepository.findById(data.categoryId);

    if (!category) {
      throw new BadRequestException('Category not found.')
    }

    const newTask: Omit<Task, 'taskId'> = {
      ...data,
      category,
      status: TaskStatus.New,
      employerId,
      commentsCount: 0,
      repliesCount: 0
    }

    return this.taskRepository.create(new TaskEntity(newTask));
  }


  public async getNewTasks(query: TaskQuery) {
    return this.taskRepository.findNewTasks(query);
  }

  public async getUserTasks(query: UserTasksQuery, userId: string, role: UserRole) {
    const tasks = await this.taskRepository.findUserTasks(query, userId, role);
    return tasks;
  }


  public async getTaskDetails(taskId: number) {
    const existTask = await this.taskRepository.findById(taskId);
    if (! existTask) {
      throw new NotFoundException('Task not found');
    }
    return existTask;
  }


  public async deleteTask(taskId: number) {
    this.taskRepository.delete(taskId);
  }


  public async updateTask(taskId: number, data: UpdateTaskDTO) {
    const {categoryId,  ...restData} = data;

    let category
    if (categoryId) {
      category = await this.categoryRepository.findById(categoryId);
      if (!category) {
        throw new BadRequestException('Category not found');
      }
    }

    const updateTask = {
      ...restData,
      category
    }

    return this.taskRepository.update(taskId, updateTask);
  }


  public async pinTask(taskId: number, executorId: string) {

    await this.replyRepository.pinTask(taskId, executorId);
    //обновление исполнителя через брокер
    await this.taskRepository.update(taskId, {status: TaskStatus.InProgress});
  }
}
