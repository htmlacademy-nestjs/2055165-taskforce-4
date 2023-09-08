import { ClassConstructor, plainToInstance } from "class-transformer";

import {DbConfig} from "@project/config-service"
import { RabbitMQConfig } from "@project/shared/app-types";

export type DateTimeUnit = 's' | 'm' | 'h' | 'd' | 'M' | 'y';
export type TimeAndUnit = { value: number; unit: DateTimeUnit };

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

export function parseTokenTime(time: string): TimeAndUnit {
  const regex = /^(\d+)([smhdMy])/;
  const match = regex.exec(time);

  if (!match) {
    throw new Error(`[parseTokenTime] Incorrect time string format: ${time}`);
  }

  const [, valueRaw, unitRaw] = match;
  const value = parseInt(valueRaw, 10);
  const unit = unitRaw as DateTimeUnit;

  if (isNaN(value)) {
    throw new Error(`[parseTokenTime] Can't parse value count. Result is NaN.`);
  }

  return { value, unit }
}
