import dayjs from 'dayjs';

import { Injectable, NotFoundException } from '@nestjs/common';

import { TaskRepository, TaskEntity } from '@project/database-service'
import { Task, TaskStatus, UpdateTaskData } from '@project/shared/app-types';
import CreateTaskDTO from './dto/create-task.dto';
import { CategoriesService } from '../category/category.service';
import { RepliesService } from '../replies/replies.service';
import UpdateTaskDTO from './dto/update-task.dto';

@Injectable()
export class TaskService {
  constructor(
    private readonly taskRepository: TaskRepository,
    private readonly categoryService: CategoriesService,
    // private readonly replyService: RepliesService
  ){}

  public async createTask(dto: CreateTaskDTO) {
    const {title, description, price, expirationDate, image, address, tags, city, employerId} = dto

    const category = await this.categoryService.getByCategoryId(dto.categoryId);

    const newTask: Omit<Task, 'taskId'> = {
      title,
      description,
      price,
      image,
      address,
      tags,
      city,
      status: TaskStatus.New,
      employerId,
      category,
      commentsCount: 0,
      repliesCount: 0
    }

    if (expirationDate) {
      newTask.expirationDate = dayjs(expirationDate).toDate();
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
