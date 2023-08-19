import { Category } from "@project/shared/app-types";

export class CategoryEntity implements Omit<Category, 'categoryId'> {
  title!: string;


  constructor (category: Omit<Category, 'categoryId'>) {
    this.fillEntity(category);
  }


  public fillEntity(category: Omit<Category, 'categoryId'>) {
    this.title = category.title;
  }


  public toObject() {
    return {
      title: this.title,
    }
  }
}
