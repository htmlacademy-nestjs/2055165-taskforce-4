import { City } from "@project/shared/app-types";

export default class CreateTaskDTO {
  public title!: string;
  public description!: string;
  public category!: string;
  public price!: number;
  public expirationDate?: string;
  public image?: string;
  public address?: string;
  public tags?: string[];
  public city!: City;
  public employerId!: string;
}
