import { randomUUID } from 'node:crypto';


import { Injectable } from '@nestjs/common';

import { FeedbackEntity, FeedbackMemoryRepository } from '@project/database-service';
import CreateFeedbackDTO from './dto/create-feedback.dto';
import { Feedback } from '@project/shared/app-types';

@Injectable()
export class FeedbackService {
  constructor(
    private readonly feedbackRepository: FeedbackMemoryRepository
  ){}

  public async createFeedBack(dto: CreateFeedbackDTO) {
    const {text, taskId, employerId, executorId, rating} = dto;

    const newFeedback: Feedback = {
      id: randomUUID(),
      text,
      taskId,
      employerId,
      executorId,
      rating,
      createdAt: new Date(),
      updatedAt: new Date()
    }

    return this.feedbackRepository.create(new FeedbackEntity(newFeedback));
  }

  public async getExecutorFeedbacks(executorId: string) {
    return this.feedbackRepository.findByExecutorId(executorId);
  }


  public async deleteFeedback(feedbackId: string) {
    await this.feedbackRepository.delete(feedbackId);
  }
}
