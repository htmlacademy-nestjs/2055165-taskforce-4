import { ClassConstructor, plainToInstance } from "class-transformer";

export function fillRDO<T, V>(someRDO: ClassConstructor<T>, plainObject: V, groups?: string[]) {
  return plainToInstance(someRDO, plainObject, { excludeExtraneousValues: true, groups });
}
