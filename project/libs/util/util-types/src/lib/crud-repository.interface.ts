type idType = string | number;

export interface CRUDRepository<E, R> {
  findById(id: idType): Promise<R | null>;
  create(item: E): Promise<R>;
  update(id: idType, item: Partial<E>): Promise<R>;
  delete(id: idType): Promise<void>;
}
