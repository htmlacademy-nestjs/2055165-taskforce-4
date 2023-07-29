import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';

import { UserMemoryRepository, UserEntity } from '@project/database-service';
import UpdateUserDTO from './dto/update-user.dto';
import dayjs from 'dayjs';
import { UserRole, UpdateUserData, User, Executor } from '@project/shared/app-types';


@Injectable()
export class ProfileService {
  constructor(
    private readonly userRepository: UserMemoryRepository
  ) {}

  private _isExecutor(user: User): asserts user is Executor {
    if (! ('specialization' in user) )
      throw new Error('Not an Executor');
  }


  // private _isEmployer(user: User): asserts user is Employer {
  //   if (! ('newTasksCount' in user) )
  //     throw new Error('Not an Employer');
  // }


  public async getUserProfile(id: number) {
    const existUser = await  this.userRepository.findById(id);

    if (!existUser) {
      throw new NotFoundException('User not found');
    }
    return existUser;
  }

  public async UpdateUserProfile(id: number, dto: UpdateUserDTO) {
    const {name, password, newPassword, birthDate, avatar, city, specialization, aboutInfo} = dto;

    const existUser = await this.userRepository.findById(id);

    if (!existUser) {
      throw new NotFoundException('User not found');
    }

    let userEntity = new UserEntity(existUser);
        //Валидация будет реализована позже
    let updateData: UpdateUserData;
    if (password && ! await userEntity.comparePassword(password)) {
      throw new UnauthorizedException('User\'s password is wrong');
    }
    if (newPassword) {
      userEntity = await userEntity.setPassword(newPassword);
      updateData = {
        hashPassword: userEntity.hashPassword,
        updatedAt: new Date()
      }
    } else {
      updateData = {
        name: name ?? existUser.name,
        birthDate: dayjs(birthDate).toDate() ?? existUser.birthDate,
        avatar: avatar ?? existUser.avatar,
        city: city ?? existUser.city,
        aboutInfo: aboutInfo ?? existUser.aboutInfo,
        updatedAt: new Date()
      }

      if (existUser.role === UserRole.Executor) {
        this._isExecutor(existUser);
        updateData.specialization = specialization ?? existUser.specialization;
      }
    }

    return this.userRepository.update(id, updateData);
  }
}
