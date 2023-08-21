import * as Joi from 'joi';

import { registerAs } from '@nestjs/config';

import { DbConfig } from './db-config.interface';


export default registerAs('mongo-db', (): DbConfig => {
  if (
    !process.env.MONGO_DB_HOST ||
    !process.env.MONGO_DB_PORT ||
    !process.env.MONGO_DB_NAME ||
    !process.env.MONGO_ROOT_USERNAME ||
    !process.env.MONGO_ROOT_PASSWORD ||
    !process.env.MONGO_AUTH_DB
  ) {
    throw new Error(
      '[MongoDB Base Config]: Some Environments didn\'t configure. Please check .env file.'
    );
  }

  const config: DbConfig = {
    host: process.env.MONGO_DB_HOST,
    port: parseInt(process.env.MONGO_DB_PORT, 10),
    name: process.env.MONGO_DB_NAME,
    user: process.env.MONGO_ROOT_USERNAME,
    password: process.env.MONGO_ROOT_PASSWORD,
    authBase: process.env.MONGO_AUTH_DB,
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
      `[MongoDB Base Config]: Environments validation failed. Please check .env file.
      Error message: ${error.message}`,
    );
  }

  return config;
});
