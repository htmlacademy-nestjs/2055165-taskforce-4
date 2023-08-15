import * as Joi from 'joi';

import { registerAs } from '@nestjs/config';

import { AppConfig } from '@project/shared/app-types';

const DEFAULT_USERS_APP_PORT = 3000;

export default registerAs('users-application', (): AppConfig => {
  const config: AppConfig = {
    environment: process.env.NODE_ENV || 'development',
    port: parseInt(process.env.USERS_APP_PORT || DEFAULT_USERS_APP_PORT.toString(), 10),
  };

  const validationSchema = Joi.object<AppConfig>({
    environment: Joi.string().valid('development', 'production', 'stage').required(),
    port: Joi.number().port().default(DEFAULT_USERS_APP_PORT),
  });

  const { error } = validationSchema.validate(config, { abortEarly: true });

  if (error) {
    throw new Error(
      `[Users Application Config]: Environments validation failed. Please check .env file.
      Error message: ${error.message}`,
    );
  }

  return config;
});
