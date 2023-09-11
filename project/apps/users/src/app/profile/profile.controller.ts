import { Body, Controller, Get, Param, Patch, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { MongoidValidationPipe } from '@project/shared/shared-pipes';

import { ProfileService } from './profile.service';
import { fillRDO } from '@project/util/util-core';
import UpdateUserDTO from './dto/update-user.dto';
import UserFullRDO from './rdo/user-full.rdo';
import { JwtAuthGuard, RoleGuard, Roles } from '@project/database-service';
import { NotifyService } from '@project/shared/notify';
import { RabbitRouting, UserRole } from '@project/shared/app-types';

@Controller('users')
export class ProfileController {
  constructor(
    private readonly profileService: ProfileService,
    private readonly notifyService: NotifyService
  ) {}


  @Get('/:id')
  public async getUserInfo(@Param('id', MongoidValidationPipe) userId: string) {
    const user = await this.profileService.getUserProfile(userId);
    return fillRDO(UserFullRDO, user, [user.role]);
  }


  @Patch('/profile/edit')
  public async updateUserInfo(@Body(new ValidationPipe({whitelist: true, transform: true})) data: UpdateUserDTO) {
    await this.profileService.updateUserProfile(data);

    const updatedUser = await this.profileService.getUserProfile(data.userId)
    return fillRDO(UserFullRDO, updatedUser, [updatedUser.role]);
  }


  @Post('/:id/subscribe')
  @Roles(UserRole.Executor)
  @UseGuards(JwtAuthGuard, RoleGuard)
  public async addSubscriber(@Param('id', MongoidValidationPipe) userId: string) {
    const {email, name} = await this.profileService.getUserProfile(userId);
    await this.notifyService.sendNotification({email, name}, RabbitRouting.AddSubscriber)
  }
}
