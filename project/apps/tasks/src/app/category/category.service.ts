import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';

import { CategoryRepository, CategoryEntity } from '@project/database-service';
import { CreateCategoryDTO } from './dto/create-category.dto';
import { UpdateCategoryDTO } from './dto/update-category.dto';



@Injectable()
export class CategoryService {
  constructor(
    private readonly categoryRepository: CategoryRepository
  ){}


  public async createOrGetExistCategory(dto: CreateCategoryDTO) {
    const {title} = dto;
    const existCategory = await this.categoryRepository.findByTitle(title);

    if (!existCategory) {
      return this.categoryRepository.create(new CategoryEntity(dto));
    }
    return existCategory;
  }


  public async getByCategoryTitle(title: string) {
    return this.categoryRepository.findByTitle(title)
  }


  public async getByCategoryId(categoryId: number) {
    const existCategory = await this.categoryRepository.findById(categoryId);

    if (!existCategory) {
      throw new NotFoundException('Category not found');
    }
    return existCategory
  }


  public async updateCategory(categoryId: number, dto: UpdateCategoryDTO) {
    const {title: newTitle} = dto;
    const existCategory = await this.categoryRepository.findByTitle(newTitle);

    if (existCategory) {
      throw new ConflictException('The category with such title already exists.')
    }

    return this.categoryRepository.update(categoryId, newTitle);
  }


  public async deleteCategory(categoryId: number) {
    return this.categoryRepository.delete(categoryId);
  }
}
