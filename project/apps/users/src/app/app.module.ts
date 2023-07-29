import { Module } from '@nestjs/common';

import { ProfileModule } from './profile/profile.module';
import { BlogUserModule } from './blog-user/blog-user.module';

@Module({
  imports: [ProfileModule, BlogUserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
