import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

import { TaskService } from './task.service';
import CreateTaskDTO from './dto/create-task.dto';
import { fillRDO } from '@project/util/util-core';
import TaskFullRDO from './rdo/task-full.rdo';
import UpdateTaskDTO from './dto/update-task.dto';
import CreateReplyDTO from '../replies/dto/create-reply.dto';
import ReplyRDO from '../replies/rdo/reply.rdo';
import TaskBasicRDO from './rdo/task-basic.rdo';


@Controller('tasks')
export class TaskController {
  constructor(
    private readonly taskService: TaskService
  ) {}

  //добавить реализацию с параметрами и пагинацией
  // @Get()
  // public async getTasks() {
  //   const tasks = await this.taskService.getTasks();
  //   return fillRDO(TaskBasicRDO, tasks);

  // }

  @Post('/create')
  public async createTask(@Body() dto: CreateTaskDTO) {
    const newTask = await this.taskService.createTask(dto);
    return fillRDO(TaskFullRDO, newTask);
  }

  @Get('/:id')
  public async getTask(@Param('id') taskId: number) {
    const existTask = await this.taskService.getTaskDetails(taskId);
    return fillRDO(TaskFullRDO, existTask);
  }

  @Delete('/:id')
  public async deleteTask(@Param('id') taskId: number) {
    await this.taskService.deleteTask(taskId);
    //дополнительно удалять все отклики и комментарии к таску
    return 'OK';
  }

  @Patch('/:id')
  public async updateTask(@Param('id') taskId: string, @Body() dto: UpdateTaskDTO) {
    const updatedTask = await this.taskService.updateTask(taskId, dto);
    return fillRDO(TaskFullRDO, updatedTask);
  }
}
