import { Module } from '@nestjs/common';

import { StaticModule } from './static/static.module';

@Module({
  imports: [StaticModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
