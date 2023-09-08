import { ConfigService } from '@nestjs/config';
import { getRabbitMQConnectionString } from './helpers';
import { ConfigAppsModule } from '@project/config-service';

export function getRabbitMQOptions(optionSpace: string) {
  return {
    imports:[ConfigAppsModule],
    useFactory: async (config: ConfigService) => ({
      exchanges: [
          {
            name: config.getOrThrow<string>(`${optionSpace}.queue`),
            type: 'direct'
          }
      ],
      uri:getRabbitMQConnectionString({
        host: config.getOrThrow<string>(`${optionSpace}.host`),
        password: config.getOrThrow<string>(`${optionSpace}.password`),
        user: config.getOrThrow<string>(`${optionSpace}.user`),
        port: config.getOrThrow<string>(`${optionSpace}.port`),
      }),
      connectionInitOptions: { wait: true },
      enableControllerDiscovery: true,
    }),
    inject: [ConfigService]
  }
}
