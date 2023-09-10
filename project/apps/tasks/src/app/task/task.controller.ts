import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards, ValidationPipe } from '@nestjs/common';
import { TaskService } from './task.service';
import CreateTaskDTO from './dto/create-task.dto';
import { fillRDO } from '@project/util/util-core';
import TaskFullRDO from './rdo/task-full.rdo';
import UpdateTaskDTO from './dto/update-task.dto';
import TaskBasicRDO from './rdo/task-basic.rdo';
import { AuthUser, JwtAuthGuard, ModifyTaskGuard, PinTaskGuard, RoleGuard, Roles, TaskQuery, UserTasksCountQuery, UserTasksQuery } from '@project/database-service';
import PinTaskDTO from './dto/pin-task.dto';
import { TokenPayload, UserRole } from '@project/shared/app-types';

@Controller('tasks')
export class TaskController {
  constructor(
    private readonly taskService: TaskService
  ) {}


  @Get('/')
  @Roles(UserRole.Executor)
  @UseGuards(JwtAuthGuard, RoleGuard)
  public async getNewTasks(@Query(new ValidationPipe({whitelist: true, transform: true})) query: TaskQuery) {
    const tasks = await this.taskService.getNewTasks(query);
    return fillRDO(TaskBasicRDO, tasks);
  }


  @Get('/mytasks')
  @UseGuards(JwtAuthGuard)
  public async getUserTasks(
    @AuthUser() userData: TokenPayload,
    @Query(new ValidationPipe({whitelist: true, transform: true})) query: UserTasksQuery) {
    const {sub: userId, role} = userData;
    const tasks = await this.taskService.getUserTasks(query, userId, role);
    return fillRDO(TaskBasicRDO, tasks);
  }


  @Get('/count')
  public async getUserTasksCount(
    @Query(new ValidationPipe({whitelist: true})) query: UserTasksCountQuery) {
    return this.taskService.getUserTasksCount(query);
  }


  @Get('/failed-count')
  public async getFailedTasksCount() {
    return this.taskService.getFailedTasksCount();
  }


  @Post('/create')
  @Roles(UserRole.Employer)
  @UseGuards(JwtAuthGuard, RoleGuard)
  public async createTask(
    @AuthUser('sub') userId: string,
    @Body(new ValidationPipe({whitelist: true, transform: true})) data: CreateTaskDTO) {

    const newTask = await this.taskService.createTask(data, userId);
    return fillRDO(TaskFullRDO, newTask);
  }


  @Get('/:taskId')
  @UseGuards(JwtAuthGuard)
  public async getTask(@Param('taskId', ParseIntPipe) taskId: number) {
    const existTask = await this.taskService.getTaskDetails(taskId);
    return fillRDO(TaskFullRDO, existTask);
  }


  @Delete('/:taskId')
  @Roles(UserRole.Employer)
  @UseGuards(JwtAuthGuard, RoleGuard, ModifyTaskGuard)
  public async deleteTask(@Param('taskId', ParseIntPipe) taskId: number) {
    await this.taskService.deleteTask(taskId);
    return 'OK';
  }


  @Patch('/:taskId')
  @UseGuards(JwtAuthGuard, ModifyTaskGuard)
  public async updateTask(
    @Param('taskId', ParseIntPipe) taskId: number,
    @Body(new ValidationPipe({whitelist: true, transform: true})) data: UpdateTaskDTO
    ) {

    const updatedTask = await this.taskService.updateTask(taskId, data);
    return fillRDO(TaskFullRDO, updatedTask);
  }



  @Post('/:taskId/pin-task')
  @Roles(UserRole.Employer)
  @UseGuards(JwtAuthGuard, RoleGuard, PinTaskGuard)
  public async pinTask(
    @Param('taskId', ParseIntPipe) taskId: number,
    @Body(ValidationPipe) {executorId}: PinTaskDTO
    ) {

    await this.taskService.pinTask(taskId, executorId);
    return `Task ${taskId} has been pinned to Executor ${executorId} successfully`;
  }

}
