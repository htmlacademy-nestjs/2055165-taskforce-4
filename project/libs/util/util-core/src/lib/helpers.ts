import { ClassConstructor, plainToInstance } from "class-transformer";

export function fillRDO<T, V>(someRDO: ClassConstructor<T>, plainObject: V, groups?: string[]) {
  return plainToInstance(someRDO, plainObject, { excludeExtraneousValues: true, groups });
}

export function getMongoConnectionString({username, password, host, port, databaseName, authDatabase}: Record<string, string>): string {
  return `mongodb://${username}:${password}@${host}:${port}/${databaseName}?authSource=${authDatabase}`;
}
