import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserAgeValidationPipe } from '@project/shared/shared-pipes'
import { fillRDO } from '@project/util/util-core';
import { AuthService } from './auth.service';
import CreateUserDTO from './dto/create-user.dto';
import UserBasicRDO from './rdo/user-basic.rdo';
import AuthUserDTO from './dto/auth-user.dto';
import AuthUserRDO from './rdo/auth-user.rdo';

@Controller('auth')
export class AuthController {
  constructor (private readonly authService: AuthService) {}

  @Post('/register')
  public async createUser(@Body(UserAgeValidationPipe) dto: CreateUserDTO) {
    const newUser = await this.authService.register(dto);
    return fillRDO(UserBasicRDO, newUser);
  }

  @Post('/login')
  public async loginUser(@Body() dto: AuthUserDTO) {
    const verifiedUser = await this.authService.authorize(dto);
    return fillRDO(AuthUserRDO, verifiedUser);
  }

  @Get('/')
  public async checkUserAuth() {
    throw new Error('Will be implemented after JWT tokens realization')
  }
}



