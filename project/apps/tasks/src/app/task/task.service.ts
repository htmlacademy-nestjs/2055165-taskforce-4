import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';

import { TaskRepository, TaskEntity, PinTaskEntity, CategoryRepository } from '@project/database-service'
import { Task, TaskStatus } from '@project/shared/app-types';
import { TaskQuery } from '@project/database-service';
import PinTaskDTO from './dto/pin-task.dto';
import CreateTaskDTO from './dto/create-task.dto';
import UpdateTaskDTO from './dto/update-task.dto';

@Injectable()
export class TaskService {
  constructor(
    private readonly taskRepository: TaskRepository,
    private readonly categoryRepository: CategoryRepository,
  ){}

  public async createTask(data: CreateTaskDTO) {
    const category = await this.categoryRepository.findById(data.categoryId);

    if (!category) {
      throw new BadRequestException('Category not found.')
    }

    const newTask: Omit<Task, 'taskId'> = {
      ...data,
      category,
      status: TaskStatus.New,
      commentsCount: 0,
      repliesCount: 0
    }

    return this.taskRepository.create(new TaskEntity(newTask));
  }


  public async getTasks(query: TaskQuery) {
    return this.taskRepository.find(query);
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

    const existTask = await this.taskRepository.findById(taskId);
    if (! existTask) {
      throw new NotFoundException('Task not found');
    }

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

  public async pinTask(taskId: number, {executorId}: PinTaskDTO) {

    const existTask = await this.taskRepository.findById(taskId);
    if (! existTask) {
      throw new NotFoundException('Task not found');
    }

    const pin = await this.taskRepository.pin(new PinTaskEntity({taskId, executorId}));
    await this.taskRepository.update(taskId, {status: TaskStatus.InProgress});
    return pin;
  }

  public async unpinTask(pinId: number) {
    const pin = await this.taskRepository.findByPinId(pinId);

    if (! pin) {
      throw new NotFoundException('Pin not found');
    }

    await this.taskRepository.unpin(pinId);
    await this.taskRepository.update(pin.taskId, {status: TaskStatus.New});
    return pin;
  }
}
