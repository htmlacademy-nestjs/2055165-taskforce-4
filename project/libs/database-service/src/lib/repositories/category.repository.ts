import { Injectable } from "@nestjs/common";

import { CRUDRepository } from "@project/util/util-types";
import { CategoryEntity } from "../entities/category.entity";
import { Category } from "@project/shared/app-types";

import { PrismaPostgresService } from '../prisma/prisma-postgres.service'

@Injectable()
export class CategoryRepository implements CRUDRepository<CategoryEntity, string, Category> {
  constructor (private readonly prisma: PrismaPostgresService) {}


  public async create(item: CategoryEntity): Promise<Category> {
    const data = item.toObject();
    return this.prisma.category.create({data})
  }


  public async findById(categoryId: number): Promise<Category | null> {
    return this.prisma.category.findUnique({
      where: {categoryId}
    })
  }


  public async findByTitle(title: string): Promise<Category | null> {
    return this.prisma.category.findUnique({
      where: {title}
    })
  }


  public async update(categoryId: number, newTitle: string): Promise<Category> {
    return this.prisma.category.update({
      where: {categoryId},
      data: {title: newTitle}
    })
  }


  public async delete(categoryId: number): Promise<void> {
    await this.prisma.category.delete({
      where: {categoryId}
    });
  }
}
