import { randomUUID } from 'node:crypto';

import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import dayjs from 'dayjs';

import { TaskMemoryRepository, TaskEntity } from '@project/database-service'
import { Task, TaskStatus, UpdateTaskData } from '@project/shared/app-types';
import CreateTaskDTO from './dto/create-task.dto';
import { CategoriesService } from '../categories/categories.service';
import { RepliesService } from '../replies/replies.service';
import UpdateTaskDTO from './dto/update-task.dto';
import CreateReplyDTO from '../replies/dto/create-reply.dto';

@Injectable()
export class TaskService {
  constructor(
    private readonly taskRepository: TaskMemoryRepository,
    private readonly categoryService: CategoriesService,
    private readonly replyService: RepliesService
  ){}

  public async createTask(dto: CreateTaskDTO) {
    const {title, description, price, expirationDate, image, address, tags, city, employerId} = dto
    const existCategory = await this.categoryService.getByName(dto.category);

    const newTask: Task = {
      id: randomUUID(),
      title,
      description,
      price,
      expirationDate: dayjs(expirationDate).toDate(),
      image,
      address,
      tags,
      city,
      status: TaskStatus.New,
      createdAt: new Date(),
      updatedAt: new Date(),
      employerId,
      categoryId: 0
    }

    if (existCategory) {
      newTask.categoryId = existCategory.id;
    } else {
      const newCategory = await this.categoryService.createCategory(dto.category);
      newTask.categoryId = newCategory.id
    }

    const task = await this.taskRepository.create(new TaskEntity(newTask));
    return {...task, category: dto.category}
  }

  public async getTasks() {
    return this.taskRepository.findTasks();
  }

  public async getTaskDetails(taskId: string) {
    const existTask = await this.taskRepository.findById(taskId);
    if (! existTask) {
      throw new NotFoundException('Task not found');
    }

    const taskCategory = await this.categoryService.getById(existTask.categoryId);
    return {...existTask, category: taskCategory?.name}
  }


  public async deleteTask(taskId: string) {
    return this.taskRepository.delete(taskId);
  }


  public async updateTask(taskId: string, dto: UpdateTaskDTO) {
    const {title, description, category, price, expirationDate, image, address, tags, city, status} = dto;

    const existTask = await this.taskRepository.findById(taskId);

    if (!existTask) {
      throw new NotFoundException('Task not found');
    }

    const updateData: UpdateTaskData = {
      title: title ?? existTask.title,
      description: description ?? existTask.description,
      price: price ?? existTask.price,
      expirationDate: dayjs(expirationDate).toDate() ?? existTask.expirationDate,
      image: image ?? existTask.image,
      address: address ?? existTask.address,
      tags: tags ?? existTask.tags,
      city: city ?? existTask.city,
      status: status ?? existTask.status,
      updatedAt: new Date()
    }

    if (category) {
      const existCategory = await this.categoryService.getByName(category);
      if (existCategory) {
        updateData.categoryId = existCategory.id;
      } else {
        const newCategory = await this.categoryService.createCategory(category);
        updateData.categoryId = newCategory.id;
      }
    }

    const updatedTask = await this.taskRepository.update(taskId, updateData);
    const taskReplies = await this.replyService.getTaskReplies(updatedTask.id);
    return {...updatedTask, category, replies: taskReplies}
  }

  public async createTaskReply(taskId: string, dto: CreateReplyDTO) {
    if (taskId !== dto.taskId) {
      throw new ConflictException('Can\'t create reply for this task');
    }

    await this.replyService.createReply(dto);
    return this.replyService.getTaskReplies(taskId);
  }

  public async deleteTaskReply(taskId: string, replyId: string) {
    await this.replyService.deleteReply(replyId);
    return this.replyService.getTaskReplies(taskId);
  }

}
