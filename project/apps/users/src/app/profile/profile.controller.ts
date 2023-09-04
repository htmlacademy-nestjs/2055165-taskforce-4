import { Body, Controller, Get, Param, Patch, UseGuards, ValidationPipe } from '@nestjs/common';
import { MongoidValidationPipe } from '@project/shared/shared-pipes';

import { ProfileService } from './profile.service';
import { fillRDO } from '@project/util/util-core';
import UpdateUserDTO from './dto/update-user.dto';
import UserFullRDO from './rdo/user-full.rdo';
import { JwtAuthGuard } from '@project/database-service';

@Controller('users')
export class ProfileController {
  constructor(
    private readonly profileService: ProfileService
  ) {}


  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  public async getUserInfo(@Param('id', MongoidValidationPipe) userId: string) {
    const user = await this.profileService.getUserProfile(userId);
    return fillRDO(UserFullRDO, user, [user.role]);
  }


    //полноценная реализация после добавления JWT токенов
  @Patch('/:id')
  public async updateUserInfo
    (
      @Body(new ValidationPipe({whitelist: true, transform: true})) data: UpdateUserDTO,
      @Param('id', MongoidValidationPipe) userId: string
    ) {

    const updatedUser = await this.profileService.updateUserProfile(userId, data);
    return fillRDO(UserFullRDO, updatedUser, [updatedUser.role]);
  }
}
