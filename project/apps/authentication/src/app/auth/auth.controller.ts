import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { fillRDO } from '@project/util/util-core';
import { AuthService } from './auth.service';
import CreateUserDTO from './dto/create-user.dto';
import UserBasicRDO from './rdo/user-basic.rdo';
import { NotifyService } from '@project/shared/notify';
import { RabbitRouting, RequestWithUser } from '@project/shared/app-types';
import { JwtRefreshGuard, LocalAuthGuard } from '@project/database-service';

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

    return fillRDO(UserBasicRDO, newUser);
  }


  @UseGuards(LocalAuthGuard)
  @Post('/login')
  public async loginUser(@Req() { user }: RequestWithUser) {
   return this.authService.createUserToken(user);
  }


  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  public async refreshToken(@Req() { user }: RequestWithUser) {
    return this.authService.createUserToken(user);
  }
}



