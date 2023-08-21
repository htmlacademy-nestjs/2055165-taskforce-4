import { Module } from '@nestjs/common';

import { StaticModule } from './static/static.module';
import { ConfigAppsModule } from '@project/config-service';

@Module({
  imports: [StaticModule, ConfigAppsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
