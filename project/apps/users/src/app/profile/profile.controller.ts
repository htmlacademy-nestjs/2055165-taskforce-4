import { Body, Controller, Get, Param, Patch } from '@nestjs/common';

import { ProfileService } from './profile.service';
import UpdateUserDTO from './dto/update-user.dto';
import { UserRole } from '@project/shared/app-types';
import { fillRDO } from '@project/util/util-core';
import EmployerFullRDO from './rdo/employer-full.rdo';
import ExecutorFullRDO from './rdo/executor-full.rdo';
import dayjs from 'dayjs';

@Controller('users')
export class ProfileController {
  constructor(
    private readonly profileService: ProfileService
  ) {}

  //полноценная реализация после добавления JWT токенов
  @Patch(':id')
  public async updateUserInfo(@Body() dto: UpdateUserDTO, @Param('id') userId: string) {

    const updatedUser = await this.profileService.UpdateUserProfile(userId, dto);
    if (updatedUser.role === UserRole.Employer) {
      return fillRDO(EmployerFullRDO, updatedUser);
    }

    const userAge = dayjs().diff(dayjs(updatedUser.birthDate), 'years');
    return fillRDO(ExecutorFullRDO, {...updatedUser, userAge});
  }

  @Get(':id')
  public async getUserInfo(@Param('id') userId: string) {
    const user = await this.profileService.getUserProfile(userId);

    if (user.role === UserRole.Employer) {
      return fillRDO(EmployerFullRDO, user);
    }

    const userAge = dayjs().diff(dayjs(user.birthDate), 'years');
    return fillRDO(ExecutorFullRDO, {...user, userAge});
  }
}
