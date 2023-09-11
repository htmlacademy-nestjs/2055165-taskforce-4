import { Request } from 'express';
import { HttpService } from '@nestjs/axios';
import { Body, Controller, Post, Req, UseFilters } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import LoginUserDTO from './dto/login-user.dto';
import { AxiosExceptionFilter } from '../../shared/filters/axios-exception.filter';
import CreateUserDTO from './dto/create-user.dto';
import UserBasicRDO from './rdo/user-basic.rdo';
import UserAuthRDO from './rdo/user-auth.rdo';


@Controller('auth')
@UseFilters(AxiosExceptionFilter)
export class AuthenticationController {
  private baseAuthUrl: string;
  private baseUsersUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService
  ) {
    this.baseAuthUrl = this.configService.getOrThrow<string>('gateway.serviceURLs.auth');
    this.baseUsersUrl = this.configService.getOrThrow<string>('gateway.serviceURLs.users');
  }

  @Post('/register')
  public async register(@Body() dto: CreateUserDTO) {
    const { data: user } = await this.httpService.axiosRef.post<UserBasicRDO>(`${this.baseAuthUrl}/register`, dto);
    return user;
  }


  @Post('/login')
  public async login(@Body() dto: LoginUserDTO) {
    const { data: authInfo } = await this.httpService.axiosRef.post<UserAuthRDO>(`${this.baseAuthUrl}/login`, dto);
    console.log('lrl', authInfo);
    const { data: user } = await this.httpService.axiosRef.get(`${this.baseUsersUrl}/${authInfo.id}`);
    return Object.assign(authInfo, user);
  }


  @Post('/refresh')
  public async refreshToken(@Req() req: Request) {
    const { data } = await this.httpService.axiosRef.post(`${this.baseAuthUrl}/refresh`, null, {
      headers: {'Authorization': req.headers['Authorization']}
    })
    return data;
  }

}
