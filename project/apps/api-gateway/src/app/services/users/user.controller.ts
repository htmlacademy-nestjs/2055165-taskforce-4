import { Body, Controller, Get, Param, Patch, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { CheckAuthGuard } from '../../shared/guards/check-auth-guard';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { UserIdAndRoleInterceptor } from '../../shared/interceptors/user-id-role.interceptor';
import UpdateUserDTO from './dto/update-user.dto';
import SubscriberDTO from './dto/subscriber.dto';

@Controller('users')
export class UserController {
  private baseUsersUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService
  ) {
    this.baseUsersUrl = this.configService.getOrThrow<string>('gateway.serviceURLs.users');
  }

  @Get('/:id')
  public async getUserInfo(@Param('id') userId: string) {
    const {data : user}= await this.httpService.axiosRef.get(`${this.baseUsersUrl}/${userId}`);
    return user
  }


  @Patch('/profile/edit')
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(UserIdAndRoleInterceptor)
  public async updateUserInfo(@Body() data: UpdateUserDTO) {
    const {data: updatedUser} = await this.httpService.axiosRef.patch(`${this.baseUsersUrl}/profile/edit`, data)
    return updatedUser
  }


  @Post('/profile/subscribe')
  @UseGuards(CheckAuthGuard)
  public async addSubscriber(@Body() dto: SubscriberDTO) {
    return this.httpService.axiosRef.post(`${this.baseUsersUrl}/profile/subscribe`, dto);
  }
}
