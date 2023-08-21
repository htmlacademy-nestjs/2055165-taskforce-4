import { Module } from '@nestjs/common';
import { StaticController } from './static.controller';
import { StaticService } from './static.service';
import { ConfigAppsModule } from '@project/config-service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigService } from '@nestjs/config';
import { DatabaseModule, FileDataRepository } from '@project/database-service';


@Module({
  imports: [
    DatabaseModule,
    ConfigAppsModule,
    ServeStaticModule.forRootAsync({
      imports: [ConfigAppsModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const rootPath = configService.get('fs-application.uploadDirectory');
        const serveRoot = configService.get('fs-application.serveRoot')
        return [{
          rootPath,
          serveRoot,
          serveStaticOptions: {
            fallthrough: true,
            etag: true,
          }
        }]
      }
    })
  ],
  controllers: [StaticController],
  providers: [StaticService, FileDataRepository],
})
export class StaticModule {}
