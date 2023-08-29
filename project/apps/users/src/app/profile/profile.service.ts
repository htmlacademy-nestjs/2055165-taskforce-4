import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';

import { UserRepository, UserEntity } from '@project/database-service';
import { UserRole, UpdateUserData } from '@project/shared/app-types';
import UpdateUserDTO from './dto/update-user.dto';


@Injectable()
export class ProfileService {
  constructor(
    private readonly userRepository: UserRepository
  ) {}

  // private _isExecutor(user: User): asserts user is Executor {
  //   if (! (user.role === UserRole.Executor) )
  //     throw new Error('Not an Executor');
  // }

  // private _isEmployer(user: User): asserts user is Employer {
  //   if (! (user.role === UserRole.Employer) )
  //     throw new Error('Not an Employer');
  // }


  public async getUserProfile(id: string) {
    const existUser = await this.userRepository.findById(id);

    if (!existUser) {
      throw new NotFoundException('User not found');
    }
    return existUser;
  }


  public async updateUserProfile(id: string, dto: UpdateUserDTO) {
    const {password, newPassword, ...profileData} = dto;

    const existUser = await this.userRepository.findById(id);

    if (!existUser) {
      throw new NotFoundException('User not found');
    }

    let userEntity = new UserEntity(existUser);

    let updateData: UpdateUserData;

    if (password && ! await userEntity.comparePassword(password)) {
      throw new BadRequestException('User\'s current password is wrong');
    }
    if (newPassword) {
      userEntity = await userEntity.setPassword(newPassword);
      updateData = { hashPassword: userEntity.hashPassword }
    } else {
      if (existUser.role === UserRole.Employer && dto.specialization) {
        throw new BadRequestException('"specialization" data is restricted for this user');
      }

      updateData = profileData
    }

    return this.userRepository.update(id, updateData);
  }
}
