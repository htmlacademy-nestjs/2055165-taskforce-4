import { Module } from '@nestjs/common';
import { StaticController } from './static.controller';
import { StaticService } from './static.service';
import { ConfigAppsModule, getJwtOptions } from '@project/config-service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigService } from '@nestjs/config';
import { DatabaseModule, FileDataRepository, JwtAccessStrategy } from '@project/database-service';
import { JwtModule } from '@nestjs/jwt';


@Module({
  imports: [
    DatabaseModule,
    ConfigAppsModule,
    JwtModule.registerAsync({
      imports: [ConfigAppsModule],
      inject: [ConfigService],
      useFactory: getJwtOptions
    }),
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
  providers: [StaticService, FileDataRepository, JwtAccessStrategy],
  controllers: [StaticController]
})
export class StaticModule {}
