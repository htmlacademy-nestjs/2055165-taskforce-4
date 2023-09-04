import * as Joi from 'joi';

import { registerAs } from '@nestjs/config';

import { DbConfig } from './db-config.interface';


export default registerAs('mongo-db-fs', (): DbConfig => {
  if (
    !process.env.FS_MONGO_HOST ||
    !process.env.FS_MONGO_PORT ||
    !process.env.FS_MONGO_DB_NAME ||
    !process.env.FS_MONGO_USERNAME ||
    !process.env.FS_MONGO_PASSWORD ||
    !process.env.FS_MONGO_AUTH_DB
  ) {
    throw new Error(
      '[MongoDB FS Config]: Some Environments didn\'t configure. Please check .env file.'
    );
  }

  const config: DbConfig = {
    host: process.env.FS_MONGO_HOST,
    port: parseInt(process.env.FS_MONGO_PORT, 10),
    name: process.env.FS_MONGO_DB_NAME,
    user: process.env.FS_MONGO_USERNAME,
    password: process.env.FS_MONGO_PASSWORD,
    authBase: process.env.FS_MONGO_AUTH_DB,
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
      `[MongoDB FS Config]: Environments validation failed. Please check .env file.
      Error message: ${error.message}`,
    );
  }

  return config;
});
