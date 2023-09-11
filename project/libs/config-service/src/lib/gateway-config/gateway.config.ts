import * as Joi from 'joi';

import { registerAs } from '@nestjs/config';


export type GatewayConfig = {
  environment: string;
  port: string;
  httpTimeout: string;
  redirectsCount: string;
  serviceURLs: {
    users: string;
    auth: string;
    feedbacks: string;
    static: string;
    categories: string;
    replies: string;
    tasks: string
  }
}

export default registerAs('gateway', ():GatewayConfig => {

  if (!process.env.API_GATEWAY_ENV ||
      !process.env.API_GATEWAY_PORT ||
      !process.env.HTTP_CLIENT_MAX_REDIRECTS ||
      !process.env.HTTP_CLIENT_TIMEOUT ||
      !process.env.USERS_SERVICE_URL ||
      !process.env.AUTH_SERVICE_URL ||
      !process.env.FEEDBACKS_SERVICE_URL ||
      !process.env.STATIC_SERVICE_URL ||
      !process.env.CATEGORIES_SERVICE_URL ||
      !process.env.REPLIES_SERVICE_URL ||
      !process.env.TASKS_SERVICE_URL
      ) {
    throw new Error(
      '[Gateway Config]: Some Environments didn\'t configure. Please check .env file.'
    );
  }

  const config: GatewayConfig = {
    environment: process.env.API_GATEWAY_ENV,
    port: process.env.API_GATEWAY_PORT,
    httpTimeout: process.env.HTTP_CLIENT_TIMEOUT,
    redirectsCount: process.env.HTTP_CLIENT_MAX_REDIRECTS,
    serviceURLs: {
      users: process.env.USERS_SERVICE_URL,
      auth: process.env.AUTH_SERVICE_URL,
      feedbacks: process.env.FEEDBACKS_SERVICE_URL,
      static: process.env.STATIC_SERVICE_URL,
      categories: process.env.CATEGORIES_SERVICE_URL,
      replies: process.env.REPLIES_SERVICE_URL,
      tasks: process.env.TASKS_SERVICE_URL
    }
  };

  const validationSchema = Joi.object<GatewayConfig>({
    environment: Joi.string().valid('development', 'production', 'stage').required(),
    port: Joi.number().port().required(),
    httpTimeout: Joi.number().positive(),
    redirectsCount: Joi.number().positive(),
    serviceURLs: {
      users: Joi.string().uri(),
      auth: Joi.string().uri(),
      feedbacks: Joi.string().uri(),
      static: Joi.string().uri(),
      categories: Joi.string().uri(),
      replies: Joi.string().uri(),
      tasks: Joi.string().uri(),
  }

  });

  const { error } = validationSchema.validate(config, { abortEarly: true });

  if (error) {
    throw new Error(
      `[Gateway Config]: Environments validation failed. Please check .env file.
      Error message: ${error.message}`,
    );
  }

  return config;
});
