import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { CategoryRepository, DatabaseModule } from '@project/database-service';

@Module({
  imports: [DatabaseModule],
  providers: [CategoryService, CategoryRepository],
  exports: [CategoryService, CategoryRepository],
  controllers: [CategoryController],
})
export class CategoryModule {}
