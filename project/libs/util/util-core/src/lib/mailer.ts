import { MailerAsyncOptions } from '@nestjs-modules/mailer/dist/interfaces/mailer-async-options.interface';
import { ConfigService } from '@nestjs/config';
import * as path from 'node:path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { ConfigAppsModule } from '@project/config-service';

export function getMailerAsyncOptions(optionSpace: string): MailerAsyncOptions {
  return {
    imports: [ConfigAppsModule],
    useFactory: async (configService: ConfigService) => {
      return {
        transport: {
          host: configService.getOrThrow<string>(`${optionSpace}.host`),
          port: configService.getOrThrow<number>(`${optionSpace}.port`),
          secure: false,
          auth: {
            user: configService.getOrThrow<string>(`${optionSpace}.user`),
            pass: configService.getOrThrow<string>(`${optionSpace}.password`)
          }
        },
        defaults: {
          from: configService.get<string>(`${optionSpace}.from`),
        },
        template: {
          dir: path.resolve(__dirname, 'assets'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true
          }
        }
      }
    },
    inject: [ConfigService],
  }
}
