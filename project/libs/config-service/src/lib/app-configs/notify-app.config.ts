import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

export interface NotifyConfig {
  environment: string;
  port: string;
  rabbit: {
    host: string;
    password: string;
    user: string;
    queue: string;
    exchange: string;
    port: string;
  }
}

export default registerAs('notify-app', (): NotifyConfig => {
  if (
    !process.env.NODE_ENV ||
    !process.env.NOTIFY_APP_PORT ||
    !process.env.RABBIT_HOST ||
    !process.env.RABBIT_PORT ||
    !process.env.RABBIT_USERNAME ||
    !process.env.RABBIT_PASSWORD ||
    !process.env.RABBIT_QUEUE ||
    !process.env.RABBIT_EXCHANGE
  ){
    throw new Error(
      '[Notify Config]: Some Environments didn\'t configure. Please check .env file.'
    );
  }

  const config: NotifyConfig = {
    environment: process.env.NODE_ENV,
    port: process.env.NOTIFY_APP_PORT,

    rabbit: {
      host: process.env.RABBIT_HOST,
      port: process.env.RABBIT_PORT,
      user: process.env.RABBIT_USERNAME,
      password: process.env.RABBIT_PASSWORD,
      queue: process.env.RABBIT_QUEUE,
      exchange: process.env.RABBIT_EXCHANGE,
    }
  };

  const validationSchema = Joi.object<NotifyConfig>({
    environment: Joi.string().valid('development', 'production', 'stage'),
    port: Joi.number().port().required(),
    rabbit: Joi.object({
      host: Joi.string().valid().hostname().required(),
      port: Joi.number().port().required(),
      user: Joi.string().required(),
      password: Joi.string().required(),
      queue: Joi.string().required(),
      exchange: Joi.string().required(),
    })
  });

  const { error } = validationSchema.validate(config, { abortEarly: true });

  if (error) {
    throw new Error(
      `[Notify Config]: Environments validation failed. Please check .env file.
       Error message: ${error.message}`,
    );
  }

  return config;
});
