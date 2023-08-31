import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';

import { TaskRepository, TaskEntity, PinTaskEntity, CategoryRepository, UserTasksQuery } from '@project/database-service'
import { Task, TaskStatus, UserRole } from '@project/shared/app-types';
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

  public async getUserTasks(query: UserTasksQuery) {
    //получение роли из токена
    return this.taskRepository.findUserTasks(query, UserRole.Executor);
  }


  public async getTaskDetails(taskId: number) {
    const existTask = await this.taskRepository.findById(taskId);
    if (! existTask) {
      throw new NotFoundException('Task not found');
    }
    console.log(existTask);
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


    if (existTask.pinnedId) {
      throw new ConflictException('Task has already been pinned to another executor');
    }
    //проверка исполнителя через брокер
    //обновление исполнителя через брокер

    const pin = await this.taskRepository.pin(new PinTaskEntity({taskId, executorId}));
    await this.taskRepository.update(taskId, {status: TaskStatus.InProgress});
    return pin;
  }


  public async unpinTask(taskId: number) {
    const pin = await this.taskRepository.findPinByTaskId(taskId);

    if (! pin) {
      throw new NotFoundException('Task is not pinned');
    }

    await this.taskRepository.unpin(taskId);
    await this.taskRepository.update(pin.taskId, {status: TaskStatus.New});
    return pin;
  }
}
