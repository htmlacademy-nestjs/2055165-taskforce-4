import * as nanoid from 'nanoid';

import { Injectable } from '@nestjs/common';
import { TaskMemoryRepository, CategoryEntity } from '@project/database-service';
import { Category } from '@project/shared/app-types';

const taskIdGenerator = nanoid.customAlphabet('1234567890', 10);


@Injectable()
export class CategoriesService {
  constructor(
    private readonly taskRepository: TaskMemoryRepository
  ){}

  public async getByName(name: string) {
    return this.taskRepository.findByCategoryName(name)
  }

  public async getById(categoryId: number) {
    return this.taskRepository.findByCategoryId(categoryId);
  }

  public async createCategory(name: string) {
    const newData: Category = {
      id: Number.parseInt(taskIdGenerator(), 10),
      name,
      createdAt: new Date(),
      updatedAt: new Date()
    }

    return this.taskRepository.createCategory(new CategoryEntity(newData));
  }
}
