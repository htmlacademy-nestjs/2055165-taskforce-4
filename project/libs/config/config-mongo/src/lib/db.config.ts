import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

const DEFAULT_MONGO_PORT = 27017;
const DEFAULT_MONGO_HOST = 'localhost;'

export interface DbConfig {
  host: string;
  name: string;
  port: number;
  user: string;
  password: string;
  authBase: string;
}

export default registerAs('db', (): DbConfig => {
  const config: DbConfig = {
    host: process.env.MONGO_DB_HOST ?? DEFAULT_MONGO_HOST,
    port: parseInt(process.env.MONGO_DB_PORT ?? DEFAULT_MONGO_PORT.toString(), 10),
    name: process.env?.MONGO_DB_NAME ?? '',
    user: process.env.MONGO_DB_USER ?? '',
    password: process.env.MONGO_DB_PASSWORD ?? '',
    authBase: process.env.MONGO_DB_AUTH_BASE ?? '',
  };

  const validationSchema = Joi.object<DbConfig>({
    host: Joi.string().hostname().default(DEFAULT_MONGO_HOST),
    port: Joi.number().port().default(DEFAULT_MONGO_PORT),
    name: Joi.string().required(),
    user: Joi.string().required(),
    password: Joi.string().required(),
    authBase: Joi.string().required(),
  });

  const { error } = validationSchema.validate(config, { abortEarly: true });

  if (error) {
    throw new Error(
      `[DB Config]: Environments validation failed. Please check .env file.
      Error message: ${error.message}`,
    );
  }

  return config;
});
