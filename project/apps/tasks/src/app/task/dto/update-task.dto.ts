import { City, TaskStatus } from "@project/shared/app-types";

export default class UpdateTaskDTO {
  public title?: string;
  public description?: string;
  public category?: string;
  public price?: number;
  public expirationDate?: string;
  public image?: string;
  public address?: string;
  public tags?: string[];
  public city?: City;
  public status?: TaskStatus;
}
