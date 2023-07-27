import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';

import { UserMemoryRepository, UserEntity } from '@project/database-service';
import UpdateUserDTO from './dto/update-user.dto';
import dayjs from 'dayjs';
// import { UserRole } from '@project/shared/app-types';


@Injectable()
export class ProfileService {
  constructor(
    private readonly userRepository: UserMemoryRepository
  ) {}

  public async getUserProfile(id: number) {
    return this.userRepository.findById(id);
  }

  public async UpdateUserProfile(id: number, dto: UpdateUserDTO) {
    const {name, password, newPassword, birthDate, avatar, city, aboutInfo} = dto;

    const existUser = await this.userRepository.findById(id);

    if (!existUser) {
      throw new NotFoundException('User not found');
    }

    let userEntity = new UserEntity(existUser);
        //Валидация будет реализована позже
    if (password && ! await userEntity.comparePassword(password)) {
      throw new UnauthorizedException('User\'s password is wrong');
    }
    if (newPassword) {
      userEntity = await userEntity.setPassword(newPassword);
    }


    const updateData = {
      name: name ?? existUser.name,
      birthDate: dayjs(birthDate).toDate() ?? existUser.birthDate,
      avatar: avatar ?? existUser.avatar,
      city: city ?? existUser.city,
      aboutInfo: aboutInfo ?? existUser.aboutInfo,
    }

    // if (existUser.role === UserRole.Executor) {
    //   updateData.specialization = specialization ?? existUser.specialization;
    // }

    return this.userRepository.update(id, updateData);
  }
}
