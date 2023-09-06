import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

export interface RabbitConfig {
    host: string;
    password: string;
    user: string;
    queue: string;
    exchange: string;
    port: string;
}

export default registerAs('rabbit', (): RabbitConfig => {
  if (
    !process.env.RABBIT_HOST ||
    !process.env.RABBIT_PORT ||
    !process.env.RABBIT_USERNAME ||
    !process.env.RABBIT_PASSWORD ||
    !process.env.RABBIT_QUEUE ||
    !process.env.RABBIT_EXCHANGE
  ){
    throw new Error(
      '[Rabbit Config]: Some Environments didn\'t configure. Please check .env file.'
    );
  }

  const config: RabbitConfig = {
      host: process.env.RABBIT_HOST,
      port: process.env.RABBIT_PORT,
      user: process.env.RABBIT_USERNAME,
      password: process.env.RABBIT_PASSWORD,
      queue: process.env.RABBIT_QUEUE,
      exchange: process.env.RABBIT_EXCHANGE,
  };

  const validationSchema = Joi.object<RabbitConfig>({
      host: Joi.string().valid().hostname().required(),
      port: Joi.number().port().required(),
      user: Joi.string().required(),
      password: Joi.string().required(),
      queue: Joi.string().required(),
      exchange: Joi.string().required(),
  });

  const { error } = validationSchema.validate(config, { abortEarly: true });

  if (error) {
    throw new Error(
      `[Rabbit Config]: Environments validation failed. Please check .env file.
       Error message: ${error.message}`,
    );
  }

  return config;
});
