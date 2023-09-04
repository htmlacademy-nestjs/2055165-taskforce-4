import { BadRequestException, Injectable } from '@nestjs/common';

import { FeedbackEntity, FeedbackQuery, FeedbackRepository, UserRepository } from '@project/database-service';
import CreateFeedbackDTO from './dto/create-feedback.dto';
import { Employer } from '@project/shared/app-types';

@Injectable()
export class FeedbackService {
  constructor(
    private readonly feedbackRepository: FeedbackRepository,
    private readonly userRepository: UserRepository // отключить
  ){}

  public async createFeedBack(dto: CreateFeedbackDTO) {
    const {text, taskId, employerId, executorId, rating} = dto;

    //проверка таска на существование через брокер
    //проверка таска на статус и привязанного к нему executorId через брокер

    //проверка заказчика на существование через брокер => сервис юзеров
    //проверка исполнителя на существование через брокер => сервис юзеров
    const existEmployer = await this.userRepository.findById(employerId) as Employer;
    if (!existEmployer) {
      throw new BadRequestException('Employer with such id not found');
    }

    const existExecutor = await this.userRepository.findById(executorId);
    if (!existExecutor) {
      throw new BadRequestException('Executor with such id not found');
    }

    const newFeedback = {
      text,
      taskId,
      employer: existEmployer,
      executorId,
      rating,
    }

    return this.feedbackRepository.create(new FeedbackEntity(newFeedback));
  }

  public async getExecutorFeedbacks(executorId: string, query: FeedbackQuery) {
    //проверка исполнителя на существование через брокер => сервис юзеров
    return this.feedbackRepository.findByExecutorId(executorId, query);
  }


  public async deleteFeedback(feedbackId: string) {
    await this.feedbackRepository.delete(feedbackId);
  }
}
