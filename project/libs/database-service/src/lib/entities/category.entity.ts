import { Category } from "@project/shared/app-types";

export class CategoryEntity implements Category {
  id!: number;
  name!: string;
  createdAt!: Date;
  updatedAt!: Date;

  constructor (categpry: Category) {
    this.fillEntity(categpry);
  }


  public fillEntity(category: Category) {
    this.id = category.id;
    this.name = category.name;
    this.createdAt = category.createdAt;
    this.updatedAt = category.updatedAt;
  }


  public toObject() {
    return {
      id: this.id,
      name: this.name,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }
  }
}
