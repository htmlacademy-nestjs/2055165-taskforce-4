import { Body, Controller, Get, Param, Patch, UseGuards, ValidationPipe } from '@nestjs/common';
import { MongoidValidationPipe } from '@project/shared/shared-pipes';

import { ProfileService } from './profile.service';
import { fillRDO } from '@project/util/util-core';
import UpdateUserDTO from './dto/update-user.dto';
import UserFullRDO from './rdo/user-full.rdo';
import { AuthUser, JwtAuthGuard } from '@project/database-service';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class ProfileController {
  constructor(
    private readonly profileService: ProfileService
  ) {}


  @Get('/:id')
  public async getUserInfo(@Param('id', MongoidValidationPipe) userId: string) {
    const user = await this.profileService.getUserProfile(userId);
    return fillRDO(UserFullRDO, user, [user.role]);
  }


  // test with JWT
  @Patch('/profile/edit')
  public async updateUserInfo
    (
      @AuthUser('id') userId: string,
      @Body(new ValidationPipe({whitelist: true, transform: true})) data: UpdateUserDTO
    ) {

    const updatedUser = await this.profileService.updateUserProfile(userId, data);
    return fillRDO(UserFullRDO, updatedUser, [updatedUser.role]);
  }
}
