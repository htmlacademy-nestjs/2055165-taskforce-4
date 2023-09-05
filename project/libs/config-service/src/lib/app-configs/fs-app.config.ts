import * as Joi from 'joi';

import { registerAs } from '@nestjs/config';

import { FsUploaderConfig } from '@project/shared/app-types';



export default registerAs('fs-application', (): FsUploaderConfig => {

  if (
    !process.env.NODE_ENV ||
    !process.env.FS_APP_PORT ||
    !process.env.UPLOAD_DIRECTORY ||
    !process.env.SERVE_ROOT
  ) {
    throw new Error(
      '[FS Application Config]: Some Environments didn\'t configure. Please check .env file.'
    );
  }


  const config: FsUploaderConfig = {
    environment: process.env.NODE_ENV,
    port: process.env.FS_APP_PORT,
    uploadDirectory: process.env.UPLOAD_DIRECTORY,
    serveRoot: process.env.SERVE_ROOT
  };

  const validationSchema = Joi.object<FsUploaderConfig>({
    environment: Joi.string().valid('development', 'production', 'stage').required(),
    port: Joi.number().port().required(),
    uploadDirectory: Joi.string().required(),
    serveRoot: Joi.string().required()
  });

  const { error } = validationSchema.validate(config, { abortEarly: true });

  if (error) {
    throw new Error(
      `[FS Application Config]: Environments validation failed. Please check .env file.
      Error message: ${error.message}`,
    );
  }

  return config;
});
