import { Request } from 'express';
import { HttpService } from '@nestjs/axios';
import { Body, Controller, Post, Req, UseFilters } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import LoginUserDTO from './dto/login-user.dto';
import { AxiosExceptionFilter } from '../../shared/filters/axios-exception.filter';
import CreateUserDTO from './dto/create-user.dto';
import UserBasicRDO from './rdo/user-basic.rdo';
import { fillRDO } from '@project/util/util-core';
import TasksCountRDO from './rdo/tasks-count.rdo';
import UserAuthFullRDO from './rdo/user-auth-full.rdo';
import UserAuthRDO from './rdo/user-auth.rdo';


@Controller('auth')
@UseFilters(AxiosExceptionFilter)
export class AuthenticationController {
  private baseAuthUrl: string;
  private baseTasksUrl: string;
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService
  ) {
    this.baseAuthUrl = this.configService.getOrThrow<string>('gateway.serviceURLs.auth');
    this.baseTasksUrl = this.configService.getOrThrow<string>('gateway.serviceURLs.tasks');
  }

  @Post('/register')
  public async register(@Body() dto: CreateUserDTO) {
    const { data: user } = await this.httpService.axiosRef.post<UserBasicRDO>(`${this.baseAuthUrl}/register`, dto);
    return user;
  }


  @Post('/login')
  public async login(@Body() dto: LoginUserDTO) {
    const { data: authUser } = await this.httpService.axiosRef.post<UserAuthRDO>(`${this.baseAuthUrl}/login`, dto);
    const { data: userTasksCount } = await this.httpService.axiosRef.get<TasksCountRDO>(`${this.baseTasksUrl}/count?userId=${authUser.id}&role=${authUser.role}`);
    return fillRDO(UserAuthFullRDO, Object.assign(authUser, userTasksCount), [authUser.role]);
  }


  @Post('/refresh')
  public async refreshToken(@Req() req: Request) {
    const { data } = await this.httpService.axiosRef.post(`${this.baseAuthUrl}/refresh`, null, {
      headers: {'Authorization': req.headers['Authorization']}
    })
    return data;
  }

}
