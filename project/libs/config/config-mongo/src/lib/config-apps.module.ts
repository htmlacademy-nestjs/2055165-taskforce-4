import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import usersAppConfig from "./users-app.config";
import authAppConfig from "./auth-app.config";
import feedbacksAppConfig from "./feedbacks-app.config";

const ENV_USERS_FILE_PATH = 'apps/users/users.env';
const ENV_AUTH_FILE_PATH = 'apps/authentication/auth.env';
const ENV_FEEDBACKS_FILE_PATH = 'apps/feedbacks/feedbacks.env';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      load: [usersAppConfig, authAppConfig, feedbacksAppConfig],
      envFilePath: [ENV_USERS_FILE_PATH, ENV_AUTH_FILE_PATH, ENV_FEEDBACKS_FILE_PATH]
    })
  ]
})
export class ConfigAppsModule{}
