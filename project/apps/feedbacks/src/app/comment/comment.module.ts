import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';

@Module({
  providers: [CommentService],
  controllers: [],
})
export class CommentModule {}
