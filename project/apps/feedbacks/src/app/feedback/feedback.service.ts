import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';

import { FeedbackEntity, FeedbackQuery, FeedbackRepository, UserRepository } from '@project/database-service';
import CreateFeedbackDTO from './dto/create-feedback.dto';

@Injectable()
export class FeedbackService {
  constructor(
    private readonly feedbackRepository: FeedbackRepository,
    private readonly userRepository: UserRepository
  ){}

  public async createFeedBack(dto: CreateFeedbackDTO, employerId: string) {
    const {text, taskId, executorId, rating} = dto;

    const existEmployer = await this.userRepository.findById(employerId);
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


  public async getExecutorFeedbacks(query: FeedbackQuery) {
    return this.feedbackRepository.findByExecutorId(query);
  }


  public async deleteFeedback(feedbackId: string) {
    await this.feedbackRepository.delete(feedbackId)
      .catch(() => {throw new NotFoundException('Feedback not found')});
  }


  public async getExecutorRatingStats() {
    return this.feedbackRepository.getExecutorRatingStats();
  }
}
