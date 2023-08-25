import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { MongoidValidationPipe, UpdateUserDataValidationPipe } from '@project/shared/shared-pipes';

import { ProfileService } from './profile.service';
import { UpdateUserData, UserRole } from '@project/shared/app-types';
import { fillRDO } from '@project/util/util-core';
import EmployerFullRDO from './rdo/employer-full.rdo';
import ExecutorFullRDO from './rdo/executor-full.rdo';

@Controller('users')
export class ProfileController {
  constructor(
    private readonly profileService: ProfileService
  ) {}


  @Get('/:id')
  public async getUserInfo(@Param('id', MongoidValidationPipe) userId: string) {
    const user = await this.profileService.getUserProfile(userId);

    if (user.role === UserRole.Employer) {
      return fillRDO(EmployerFullRDO, user);
    }

    return fillRDO(ExecutorFullRDO, user);
  }


    //полноценная реализация после добавления JWT токенов
    @Patch('/:id')
    public async updateUserInfo
      (
        @Body(new UpdateUserDataValidationPipe()) dto: UpdateUserData,
        @Param('id', MongoidValidationPipe) userId: string
      ) {

      const updatedUser = await this.profileService.updateUserProfile(userId, dto); //dto as updateData
      if (updatedUser.role === UserRole.Employer) {
        return fillRDO(EmployerFullRDO, updatedUser);
      }

      return fillRDO(ExecutorFullRDO, updatedUser);
    }
}
