import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { CategoryRepository, DatabaseModule, JwtAccessStrategy } from '@project/database-service';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { ConfigAppsModule, getJwtOptions } from '@project/config-service';

@Module({
  imports: [
    ConfigAppsModule,
    DatabaseModule,
    JwtModule.registerAsync({
      imports: [ConfigAppsModule],
      inject: [ConfigService],
      useFactory: getJwtOptions
    })
  ],
  providers: [CategoryService, CategoryRepository, JwtAccessStrategy],
  exports: [CategoryService, CategoryRepository],
  controllers: [CategoryController],
})
export class CategoryModule {}
