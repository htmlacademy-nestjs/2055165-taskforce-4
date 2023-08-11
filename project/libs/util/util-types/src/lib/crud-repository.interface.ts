type idType = string | number;

export interface CRUDRepository<EntityType, UpdateDataType, ReturnType> {
  findById(id: idType): Promise<ReturnType | null>;
  create(item: EntityType): Promise<ReturnType | null>;
  update(id: idType, item: UpdateDataType): Promise<ReturnType>;
  delete(id: idType): Promise<void>;
}
