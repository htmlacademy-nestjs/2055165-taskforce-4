import { Injectable } from '@nestjs/common';

import { EmailSubscriberEntity, EmailSubscriberRepository } from '@project/database-service';
import { SubscriberDTO } from './dto/subscriber.dto';

@Injectable()
export class EmailSubscriberService {

  constructor(
    private readonly emailSubscriberRepository: EmailSubscriberRepository
  ) {}

  public async addSubscriber(dto: SubscriberDTO) {
    const {email, name} = dto;

    const existsSubscriber = await this.emailSubscriberRepository.findByEmail(email);

    if (!existsSubscriber) {
        return this.emailSubscriberRepository.create(new EmailSubscriberEntity({
          email,
          name,
          isSubscribed: true
        }));
    }

    return this.emailSubscriberRepository.updateSubscribeStatus(email, true)
  }

}
