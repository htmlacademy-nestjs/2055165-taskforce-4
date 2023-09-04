import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, ValidationPipe } from '@nestjs/common';
import { TaskService } from './task.service';
import CreateTaskDTO from './dto/create-task.dto';
import { fillRDO } from '@project/util/util-core';
import TaskFullRDO from './rdo/task-full.rdo';
import UpdateTaskDTO from './dto/update-task.dto';
import TaskBasicRDO from './rdo/task-basic.rdo';
import { TaskQuery, UserTasksQuery } from '@project/database-service';
import PinTaskDTO from './dto/pin-task.dto';

@Controller('tasks')
export class TaskController {
  constructor(
    private readonly taskService: TaskService
  ) {}


  @Get('/')
  public async getNewTasks(@Query(new ValidationPipe({whitelist: true, transform: true})) query: TaskQuery) {
    const tasks = await this.taskService.getNewTasks(query);
    return fillRDO(TaskBasicRDO, tasks);
  }

  @Get('/mytasks')
  public async getUserTasks(@Query(new ValidationPipe({whitelist: true, transform: true})) query: UserTasksQuery) {
    const tasks = await this.taskService.getUserTasks(query);
    return fillRDO(TaskBasicRDO, tasks)
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

  @Post('/:taskId/pin-task')
  public async pinTask(@Param('taskId', ParseIntPipe) taskId: number, @Body(ValidationPipe) {executorId}: PinTaskDTO) {
    await this.taskService.pinTask(taskId, executorId);
    return `Task ${taskId} has been pinned to Executor ${executorId} successfully`;
  }

}
