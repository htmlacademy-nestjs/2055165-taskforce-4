import * as Joi from 'joi';

import { registerAs } from '@nestjs/config';

import { DbConfig } from './db-config.interface';


export default registerAs('mongo-db-notify', (): DbConfig => {
  if (
    !process.env.NOTIFY_MONGO_HOST ||
    !process.env.NOTIFY_MONGO_PORT ||
    !process.env.NOTIFY_MONGO_DB_NAME ||
    !process.env.NOTIFY_MONGO_USERNAME ||
    !process.env.NOTIFY_MONGO_PASSWORD ||
    !process.env.NOTIFY_MONGO_AUTH_DB
  ) {
    throw new Error(
      '[MongoDB Notify Config]: Some Environments didn\'t configure. Please check .env file.'
    );
  }

  const config: DbConfig = {
    host: process.env.NOTIFY_MONGO_HOST,
    port: process.env.NOTIFY_MONGO_PORT,
    name: process.env.NOTIFY_MONGO_DB_NAME,
    user: process.env.NOTIFY_MONGO_USERNAME,
    password: process.env.NOTIFY_MONGO_PASSWORD,
    authBase: process.env.NOTIFY_MONGO_AUTH_DB,
  };

  const validationSchema = Joi.object<DbConfig>({
    host: Joi.string().hostname().required(),
    port: Joi.number().port().required(),
    name: Joi.string().required(),
    user: Joi.string().required(),
    password: Joi.string().required(),
    authBase: Joi.string().required(),
  });

  const { error } = validationSchema.validate(config, { abortEarly: true });

  if (error) {
    throw new Error(
      `[MongoDB Notify Config]: Environments validation failed. Please check .env file.
      Error message: ${error.message}`,
    );
  }

  return config;
});
