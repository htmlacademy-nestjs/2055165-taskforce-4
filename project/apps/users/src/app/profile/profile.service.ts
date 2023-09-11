import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';

import { UserRepository, UserEntity } from '@project/database-service';
import { UserRole, UpdateUserData, RawRatingStats, RawFailedExecutorsTasksCount } from '@project/shared/app-types';
import UpdateUserDTO from './dto/update-user.dto';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import TasksCountRDO from './rdo/tasks-count.rdo';

type RatingInfo = {
  rating?: number,
  ratingPosition?: number
}

@Injectable()
export class ProfileService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly configService: ConfigService,
    private readonly httpService: HttpService
  ) {}


  public async getUserProfile(id: string) {
    const existUser = await this.userRepository.findById(id);

    if (!existUser) {
      throw new NotFoundException('User not found');
    }

    const baseTasksUrl = this.configService.getOrThrow<string>('gateway.serviceURLs.tasks');
    const baseFeedbacksUrl = this.configService.getOrThrow<string>('gateway.serviceURLs.feedbacks')

    const { data: userTasksCount } = await this.httpService.axiosRef.get<TasksCountRDO>(`${baseTasksUrl}/count?userId=${existUser.id}&role=${existUser.role}`);
    let ratingInfo = {};
    if (existUser.role === UserRole.Executor) {
      const {data: executorsRatingStats} = await this.httpService.axiosRef.get<RawRatingStats[]>(`${baseFeedbacksUrl}/feedback/executors-stats`);
      const {data: failedExecutorsTasksCount } = await this.httpService.axiosRef.get<RawFailedExecutorsTasksCount[]>(`${baseTasksUrl}/failed-count`);
      ratingInfo = this.calcExecutorRating(existUser.id, executorsRatingStats, failedExecutorsTasksCount);
    }

    return Object.assign(existUser, userTasksCount, ratingInfo);
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

  private calcExecutorRating(executorId:string, stats: RawRatingStats[], tasksCount: RawFailedExecutorsTasksCount[]): RatingInfo {
    const failedTasks: Map<string, number> = new Map();
    tasksCount.forEach(({executorId, failedTasksCount}) => failedTasks.set(executorId, failedTasksCount));

    const info = stats.map(({executorId, sumRatingValue, feedbacksCount}) => {
      const failedTasksCount = failedTasks.get(executorId) || 0;

      const rating = parseFloat((sumRatingValue/(feedbacksCount + failedTasksCount)).toFixed(2));
      return {executorId, rating};
    })

    info.sort((a, b) => b.rating - a.rating);
    const ratingValue = info.find((executorInfo) => executorInfo.executorId === executorId)?.rating;

    return {
      rating: ratingValue,
      ratingPosition: ratingValue ? info.findIndex((executorInfo) => executorInfo.executorId === executorId) + 1 : ratingValue
    }
  }
}
