import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';

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


  public async getNewTasks(query: TaskQuery) {
    return this.taskRepository.findNewTasks(query);
  }

  public async getUserTasks(query: UserTasksQuery) {
    //получение роли из токена
    const tasks = await this.taskRepository.findUserTasks(query, UserRole.Executor);
    console.log(tasks);
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


  public async pinTask(taskId: number, executorId: string) {
    const existTask = await this.taskRepository.findById(taskId);
    if (! existTask) {
      throw new NotFoundException('Task not found');
    }

    const existReply = await this.replyRepository.find(taskId, executorId);
    if (!existReply) {
      throw new NotFoundException('The executor didn\'t reply on this task')
    }


    if (existTask.status !== TaskStatus.New) {
      throw new ConflictException('Task has already been pinned to another executor');
    }
    //проверка исполнителя через брокер
    //обновление исполнителя через брокер

    await this.replyRepository.pinTask(taskId, executorId);

    await this.taskRepository.update(taskId, {status: TaskStatus.InProgress});
  }
}
