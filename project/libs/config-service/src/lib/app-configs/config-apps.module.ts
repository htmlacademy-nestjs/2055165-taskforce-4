import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";

import usersAppConfig from "./users-app.config";
import authAppConfig from "./auth-app.config";
import feedbacksAppConfig from "./feedbacks-app.config";
import fsAppConfig from "./fs-app.config";
import tasksAppConfig from "./tasks-app.config";
import notifyAppConfig from "./notify-app.config";
import jwtConfig from "./jwt.config";
import rabbitConfig from "./rabbit.config";


const ENV_USERS_FILE_PATH = 'apps/users/users.env';
const ENV_AUTH_FILE_PATH = 'apps/authentication/auth.env';
const ENV_FEEDBACKS_FILE_PATH = 'apps/feedbacks/feedbacks.env';
const ENV_FS_FILE_PATH = 'apps/fs/fs.env';
const ENV_TASKS_FILE_PATH = 'apps/tasks/tasks.env';
const ENV_NOTIFY_FILE_PATH = 'apps/notify/notify.env';


@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      load: [
        usersAppConfig,
        authAppConfig,
        jwtConfig,
        feedbacksAppConfig,
        fsAppConfig,
        tasksAppConfig,
        notifyAppConfig,
        rabbitConfig
      ],
      envFilePath: [
        ENV_USERS_FILE_PATH,
        ENV_AUTH_FILE_PATH,
        ENV_FEEDBACKS_FILE_PATH,
        ENV_FS_FILE_PATH,
        ENV_TASKS_FILE_PATH,
        ENV_NOTIFY_FILE_PATH
      ]
    })
  ],
  providers: [ConfigService],
  exports:[ConfigService]
})
export class ConfigAppsModule{}
