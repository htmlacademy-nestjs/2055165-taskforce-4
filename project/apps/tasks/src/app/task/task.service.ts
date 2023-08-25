import { Injectable, NotFoundException } from '@nestjs/common';

import { TaskRepository, TaskEntity } from '@project/database-service'
import { Task, TaskStatus } from '@project/shared/app-types';
import CreateTaskDTO from './dto/create-task.dto';
import { CategoriesService } from '../category/category.service';
import UpdateTaskDTO from './dto/update-task.dto';

@Injectable()
export class TaskService {
  constructor(
    private readonly taskRepository: TaskRepository,
    private readonly categoryService: CategoriesService,
  ){}

  public async createTask(dto: CreateTaskDTO) {
    const category = await this.categoryService.getByCategoryId(dto.categoryId);

    const newTask: Omit<Task, 'taskId'> = {
      ...dto,
      category,
      status: TaskStatus.New,
      commentsCount: 0,
      repliesCount: 0
    }

    return this.taskRepository.create(new TaskEntity(newTask));
  }

  // public async getTasks() {
  //   return this.taskRepository.findTasks();
  // }

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


  public async updateTask(taskId: string, dto: UpdateTaskDTO) {
    throw new Error('not implemented');
  }
}
