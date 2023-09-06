import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';

import { FeedbackEntity, FeedbackQuery, FeedbackRepository, UserRepository } from '@project/database-service';
import CreateFeedbackDTO from './dto/create-feedback.dto';
import { Employer } from '@project/shared/app-types';

@Injectable()
export class FeedbackService {
  constructor(
    private readonly feedbackRepository: FeedbackRepository,
    private readonly userRepository: UserRepository
  ){}

  public async createFeedBack(dto: CreateFeedbackDTO, employerId: string) {
    const {text, taskId, executorId, rating} = dto;



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

    return this.feedbackRepository.create(new FeedbackEntity(newFeedback));
  }

  public async getExecutorFeedbacks(executorId: string, query: FeedbackQuery) {

    return this.feedbackRepository.findByExecutorId(executorId, query);
  }


  public async deleteFeedback(feedbackId: string) {
    await this.feedbackRepository.delete(feedbackId)
      .catch(() => {throw new NotFoundException('Feedback not found')});
  }
}
