import * as Joi from 'joi';

import { registerAs } from '@nestjs/config';

import { AppConfig } from '@project/shared/app-types';

export default registerAs('auth-application', (): AppConfig => {

  if (!process.env.NODE_ENV || !process.env.AUTH_APP_PORT) {
    throw new Error(
      '[Authentication Application Config]: Some Environments didn\'t configure. Please check .env file.'
    );
  }


  const config: AppConfig = {
    environment: process.env.NODE_ENV,
    port: parseInt(process.env.AUTH_APP_PORT, 10),
  };

  const validationSchema = Joi.object<AppConfig>({
    environment: Joi.string().valid('development', 'production', 'stage').required(),
    port: Joi.number().port().required(),
  });

  const { error } = validationSchema.validate(config, { abortEarly: true });

  if (error) {
    throw new Error(
      `[Authentication Application Config]: Environments validation failed. Please check .env file.
      Error message: ${error.message}`,
    );
  }

  return config;
});
