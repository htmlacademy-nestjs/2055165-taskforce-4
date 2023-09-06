import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards, ValidationPipe } from '@nestjs/common';
import { TaskService } from './task.service';
import CreateTaskDTO from './dto/create-task.dto';
import { fillRDO } from '@project/util/util-core';
import TaskFullRDO from './rdo/task-full.rdo';
import UpdateTaskDTO from './dto/update-task.dto';
import TaskBasicRDO from './rdo/task-basic.rdo';
import { AuthUser, JwtAuthGuard, ModifyTaskGuard, PinTaskGuard, RoleGuard, Roles, TaskQuery, UserTasksQuery } from '@project/database-service';
import PinTaskDTO from './dto/pin-task.dto';
import { TokenPayload, UserRole } from '@project/shared/app-types';

@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class TaskController {
  constructor(
    private readonly taskService: TaskService
  ) {}


  @Get('/')
  @Roles(UserRole.Executor)
  @UseGuards(RoleGuard)
  public async getNewTasks(@Query(new ValidationPipe({whitelist: true, transform: true})) query: TaskQuery) {
    const tasks = await this.taskService.getNewTasks(query);
    return fillRDO(TaskBasicRDO, tasks); //получить инфу о создателях
  }

  @Get('/mytasks')
  public async getUserTasks(
    @AuthUser() userData: TokenPayload,
    @Query(new ValidationPipe({whitelist: true, transform: true})) query: UserTasksQuery) {
    const {id, role} = userData;
    const tasks = await this.taskService.getUserTasks(query, id, role);
    return fillRDO(TaskBasicRDO, tasks) //получить инфу о создателях
  }


  @Post('/create')
  @Roles(UserRole.Employer)
  @UseGuards(RoleGuard)
  public async createTask(
    @AuthUser('id') userId: string,
    @Body(new ValidationPipe({whitelist: true, transform: true})) data: CreateTaskDTO) {

    const newTask = await this.taskService.createTask(data, userId);
    return fillRDO(TaskFullRDO, newTask); // получать инфу о создателе
  }


  @Get('/:taskId')
  public async getTask(@Param('taskId', ParseIntPipe) taskId: number) {
    const existTask = await this.taskService.getTaskDetails(taskId);
    return fillRDO(TaskFullRDO, existTask);  // получать инфу о создателе
  }


  @Delete('/:taskId')
  @Roles(UserRole.Employer)
  @UseGuards(RoleGuard, ModifyTaskGuard)
  public async deleteTask(@Param('taskId', ParseIntPipe) taskId: number) {
    await this.taskService.deleteTask(taskId);
    //дополнительно удалять все отклики и комментарии к таску
    return 'OK';
  }


  @Patch('/:taskId')
  @UseGuards(ModifyTaskGuard) // <-- + проверка модификации статуса
  public async updateTask(
    @Param('taskId', ParseIntPipe) taskId: number,
    @Body(new ValidationPipe({whitelist: true, transform: true})) data: UpdateTaskDTO
    ) {

    const updatedTask = await this.taskService.updateTask(taskId, data);
    return fillRDO(TaskFullRDO, updatedTask); // получать инфу о создателе
  }


  @Post('/:taskId/pin-task')
  @Roles(UserRole.Employer)
  @UseGuards(RoleGuard, PinTaskGuard)
  public async pinTask(
    @Param('taskId', ParseIntPipe) taskId: number,
    @Body(ValidationPipe) {executorId}: PinTaskDTO
    ) {

    await this.taskService.pinTask(taskId, executorId);
    return `Task ${taskId} has been pinned to Executor ${executorId} successfully`;
  }

}
