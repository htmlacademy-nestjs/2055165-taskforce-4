import { HttpService } from '@nestjs/axios';
import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CheckAuthGuard } from '../../shared/guards/check-auth-guard';
import { TaskQuery, UserTasksQuery } from '@project/database-service';
import { UserIdAndRoleInterceptor } from '../../shared/interceptors/user-id-role.interceptor';
import CreateTaskDTO from './dto/create-task.dto';
import UpdateTaskDTO from './dto/update-task.dto';
import PinTaskDTO from './dto/pin-task.dto';

@Controller('tasks')
export class TaskController {
  private baseTasksUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService
  ) {
    this.baseTasksUrl = this.configService.getOrThrow<string>('gateway.serviceURLs.tasks');
  }

  @Get('/')
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(UserIdAndRoleInterceptor)
  public async getNewTasks(@Query() {limit, category, sortType, city, sortDirection, page, tag}: TaskQuery, @Body() dto: object) {
    const categoryQuery = category ? `&category=${category}` : '';
    const sortTypeQuery = sortType ? `&sortType=${sortType}` : '';
    const cityQuery = city ? `&city=${city}` : '';
    const sortDirectionQuery = sortDirection ? `&sortDirection=${sortDirection}` : '';
    const pageQuery = page ? `&page=${page}` : '';
    const tagQuery = tag ? `&tag=${tag}` : '';


    const {data: tasks} = await this.httpService.axiosRef.get(
      `${this.baseTasksUrl}?limit=${limit}${categoryQuery}${sortTypeQuery}${cityQuery}${sortDirectionQuery}${pageQuery}${tagQuery}`,
    {data:dto})

    return tasks;
  }


  @Get('/mytasks')
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(UserIdAndRoleInterceptor)
  public async getUserTasks(@Query() {limit, status, page}: UserTasksQuery, @Body() dto: object) {
    const statusQuery = status ? `&status=${status}` : '';
    const pageQuery = page ? `&page=${page}` : '';

    const {data: tasks} = await this.httpService.axiosRef.get(
      `${this.baseTasksUrl}?limit=${limit}${statusQuery}${pageQuery}`,
    {data:dto})

    return tasks;
  }


  @Post('/create')
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(UserIdAndRoleInterceptor)
  public async createTask(@Body() data: CreateTaskDTO) {
    const {data: newTask} = await this.httpService.axiosRef.post(`${this.baseTasksUrl}/create`, data);
    return newTask;
  }


  @Get('/:taskId')
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(UserIdAndRoleInterceptor)
  public async getTask(@Param('taskId') taskId: string, @Body() dto: object) {
    const {data: existTask} = await this.httpService.axiosRef.get(`${this.baseTasksUrl}/${taskId}`, {data: dto});
    return existTask;
  }


  @Delete('/:taskId')
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(UserIdAndRoleInterceptor)
  public async deleteTask(@Param('taskId') taskId: string, @Body() dto: object) {
    await this.httpService.axiosRef.delete(`${this.baseTasksUrl}/${taskId}`, {data: dto});
    return 'Task deleted succesfully.'
  }


  @Patch('/:taskId')
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(UserIdAndRoleInterceptor)
  public async updateTask(@Param('taskId') taskId: string, @Body() data: UpdateTaskDTO) {
    const {data: updatedTask} = await this.httpService.axiosRef.patch(`${this.baseTasksUrl}/${taskId}`, data);
    return updatedTask
  }


  @Post('/:taskId/pin-task')
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(UserIdAndRoleInterceptor)
  public async pinTask(@Param('taskId') taskId: string, @Body() dto: PinTaskDTO) {
    return this.httpService.axiosRef.post(`${this.baseTasksUrl}/${taskId}/pin-task`, dto)
  }





}
