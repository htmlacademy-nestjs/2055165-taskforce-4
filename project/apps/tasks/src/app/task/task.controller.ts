import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, ValidationPipe } from '@nestjs/common';
import { TaskService } from './task.service';
import CreateTaskDTO from './dto/create-task.dto';
import { fillRDO } from '@project/util/util-core';
import TaskFullRDO from './rdo/task-full.rdo';
import UpdateTaskDTO from './dto/update-task.dto';
import TaskBasicRDO from './rdo/task-basic.rdo';
import { TaskQuery } from '@project/database-service';
import PinTaskDTO from './dto/pin-task.dto';
import UnpinTaskDTO from './dto/unpin-task.dto';


@Controller('tasks')
export class TaskController {
  constructor(
    private readonly taskService: TaskService
  ) {}


  @Get('/')
  public async getTasks(@Query(new ValidationPipe({transform: true})) query: TaskQuery) {
    const tasks = await this.taskService.getTasks(query);
    return fillRDO(TaskBasicRDO, tasks);
  }

  @Post('/create')
  public async createTask(@Body(new ValidationPipe({whitelist: true, transform: true})) data: CreateTaskDTO) {
    const newTask = await this.taskService.createTask(data);
    return fillRDO(TaskFullRDO, newTask);
  }


  @Get('/:id')
  public async getTask(@Param('id', ParseIntPipe) taskId: number) {
    const existTask = await this.taskService.getTaskDetails(taskId);
    return fillRDO(TaskFullRDO, existTask);
  }


  @Delete('/:id')
  public async deleteTask(@Param('id', ParseIntPipe) taskId: number) {
    await this.taskService.deleteTask(taskId);
    //дополнительно удалять все отклики и комментарии к таску
    return 'OK';
  }


  @Patch('/:id')
  public async updateTask(@Param('id', ParseIntPipe) taskId: number, @Body(new ValidationPipe({whitelist: true, transform: true})) data: UpdateTaskDTO) {
    const updatedTask = await this.taskService.updateTask(taskId, data);
    return fillRDO(TaskFullRDO, updatedTask);
  }

  @Post('/:id/pin-task')
  public async pinTask(@Param('id', ParseIntPipe) taskId: number, @Body(ValidationPipe) data: PinTaskDTO) {
    const pin = await this.taskService.pinTask(taskId, data);
    return `Task ${taskId} has been pinned to Executor ${pin.executorId} successfully`;
  }


  @Delete('/:id/pin-task/')
  public async unpinTask(@Param('id', ParseIntPipe) taskId: number, @Body(ValidationPipe) {pinId}: UnpinTaskDTO) {
    const pin = await this.taskService.unpinTask(pinId);
    return `Task ${taskId} has been unpinned from Executor ${pin.executorId} successfully`;
  }
}
