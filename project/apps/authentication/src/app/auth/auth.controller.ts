import { Body, Controller, Get, Post } from '@nestjs/common';
import { fillRDO } from '@project/util/util-core';
import { AuthService } from './auth.service';
import CreateUserDTO from './dto/create-user.dto';
import UserBasicRDO from './rdo/user-basic.rdo';
import AuthUserDTO from './dto/auth-user.dto';
import AuthUserRDO from './rdo/auth-user.rdo';
import { NotifyService } from '../notify/notify.service';

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
    await this.notifyService.registerSubscriber({ email, name })

    return fillRDO(UserBasicRDO, newUser);
  }

  @Post('/login')
  public async loginUser(@Body() dto: AuthUserDTO) {
    const verifiedUser = await this.authService.authorize(dto);
    const accessToken = await this.authService.createUserToken(verifiedUser);
    return fillRDO(AuthUserRDO, Object.assign(verifiedUser, accessToken));
  }

  @Get('/')
  public async checkUserAuth() {
    throw new Error('Will be implemented after JWT tokens realization')
  }
}



