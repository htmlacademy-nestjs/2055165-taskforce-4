import { ClassConstructor, plainToInstance } from "class-transformer";

import {DbConfig} from "@project/config-service"
import { RabbitMQConfig } from "@project/shared/app-types";

export function fillRDO<T, V>(someRDO: ClassConstructor<T>, plainObject: V, groups?: string[]) {
  return plainToInstance(someRDO, plainObject, { excludeExtraneousValues: true, groups });
}

export function getMongoConnectionString({user, password, host, port, name, authBase}: DbConfig): string {
  return `mongodb://${user}:${password}@${host}:${port}/${name}?authSource=${authBase}`;
}

export function getPostgresConnectionString({user, password, host, port, name}: DbConfig): string {
  return `postgresql://${user}:${password}@${host}:${port}/${name}?schema=public`;
}

export function getRabbitMQConnectionString({user, password, host, port}: RabbitMQConfig ): string {
  return `amqp://${user}:${password}@${host}:${port}`;
}
