import { Module } from '@nestjs/common';
import { CategoriesService } from './category.service';
import { CategoryController } from './category.controller';
import { CategoryRepository, PrismaPostgresModule } from '@project/database-service';

@Module({
  imports: [PrismaPostgresModule],
  providers: [CategoriesService, CategoryRepository],
  exports: [CategoriesService, CategoryRepository],
  controllers: [CategoryController],
})
export class CategoryModule {}
