import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { RepliesService } from '../replies/replies.service';

@Module({
  providers: [CategoriesService],
  exports: [RepliesService]
})
export class CategoriesModule {}
