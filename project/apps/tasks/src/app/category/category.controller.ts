import { Body, Controller, Get, Param, Patch, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDTO } from './dto/create-category.dto';
import { fillRDO } from '@project/util/util-core';
import { CategoryRDO } from './rdo/category.rdo';
import { UpdateCategoryDTO } from './dto/update-category.dto';
import { JwtAuthGuard, RoleGuard, Roles } from '@project/database-service';
import { UserRole } from '@project/shared/app-types';

@Controller('categories')
@UsePipes(new ValidationPipe({whitelist: true, transform: true}))
@UseGuards(JwtAuthGuard)
export class CategoryController {
  constructor (private readonly categoryService: CategoryService) {}

  @Post('/create')
  @UseGuards(RoleGuard)
  @Roles(UserRole.Employer)
  public async createOrGetExist(@Body() dto: CreateCategoryDTO) {
    const category = await this.categoryService.createOrGetExistCategory(dto);
    return fillRDO(CategoryRDO, category);
  }


  @Get('/:id')
  public async getCategory(@Param('id') categoryId: number) {
    const category = await this.categoryService.getByCategoryId(categoryId);
    return fillRDO(CategoryRDO, category);
  }


  @Patch('/:id')
  @UseGuards(RoleGuard)
  @Roles(UserRole.Employer)
  public async updateCategory(@Param('id') categoryId: number, @Body() dto: UpdateCategoryDTO) {
    const category = await this.categoryService.updateCategory(categoryId, dto);
    return fillRDO(CategoryRDO, category);
  }
}
