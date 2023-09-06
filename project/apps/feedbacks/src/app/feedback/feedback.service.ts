import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';

import { FeedbackEntity, FeedbackQuery, FeedbackRepository, UserRepository } from '@project/database-service';
import CreateFeedbackDTO from './dto/create-feedback.dto';
import { Employer } from '@project/shared/app-types';

@Injectable()
export class FeedbackService {
  constructor(
    private readonly feedbackRepository: FeedbackRepository,
    private readonly userRepository: UserRepository // отключить
  ){}

  public async createFeedBack(dto: CreateFeedbackDTO, employerId: string) {
    const {text, taskId, executorId, rating} = dto;

    //проверка таска на существование через брокер
    //проверка таска на статус и привязанного к нему executorId через брокер

    const existEmployer = await this.userRepository.findById(employerId) as Employer;
    if (!existEmployer) {
      throw new BadRequestException('Employer with such id not found');
    }

    const newFeedback = {
      text,
      taskId,
      employer: existEmployer,
      executorId,
      rating,
    }
    //обновление рейтинга исполнителя...
    return this.feedbackRepository.create(new FeedbackEntity(newFeedback));
  }

  public async getExecutorFeedbacks(executorId: string, query: FeedbackQuery) {
    //проверка исполнителя на существование через брокер => сервис юзеров
    return this.feedbackRepository.findByExecutorId(executorId, query);
  }


  public async deleteFeedback(feedbackId: string) {
    await this.feedbackRepository.delete(feedbackId)
      .catch(() => {throw new NotFoundException('Feedback not found')});
  }
}
