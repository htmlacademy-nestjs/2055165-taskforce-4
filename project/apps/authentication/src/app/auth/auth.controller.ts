import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { fillRDO } from '@project/util/util-core';
import { AuthService } from './auth.service';
import CreateUserDTO from './dto/create-user.dto';
import UserBasicRDO from './rdo/user-basic.rdo';
import { NotifyService } from '@project/shared/notify';
import { RabbitRouting, RequestWithTokenPayload, RequestWithUser } from '@project/shared/app-types';
import { JwtAuthGuard, JwtRefreshGuard, LocalAuthGuard } from '@project/database-service';
import UserAuthRDO from './rdo/user-auth.rdo';

@Controller('auth')
export class AuthController {
  constructor (
    private readonly authService: AuthService,
    private readonly notifyService: NotifyService
  ) {}


  @Post('/register')
  public async createUser(@Body() data: CreateUserDTO) {
    const newUser = await this.authService.register(data);

    const { email, name } = newUser;
    await this.notifyService.sendNotification({ email, name }, RabbitRouting.WelcomeMessage)

    return fillRDO(UserBasicRDO, newUser, [newUser.role]);
  }


  @UseGuards(LocalAuthGuard)
  @Post('/login')
  public async loginUser(@Req() { user }: RequestWithUser) {
   const tokens = await this.authService.createUserToken(user);
   return Object.assign(user, tokens);
  }


  @UseGuards(JwtRefreshGuard)
  @Post('/refresh')
  public async refreshToken(@Req() { user }: RequestWithUser) {
    return this.authService.createUserToken(user);
  }


  @UseGuards(JwtAuthGuard)
  @Get('/')
  public async checkToken(@Req() { user: payload }: RequestWithTokenPayload) {
    return payload;
  }
}



