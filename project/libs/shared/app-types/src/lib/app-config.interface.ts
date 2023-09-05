export interface AppConfig {
  environment: string;
  port: string;
}

export interface FsUploaderConfig {
  serveRoot: string;
  environment: string;
  port: string;
  uploadDirectory: string;
}

export interface RabbitMQConfig {
  host: string,
  port: string;
  user: string;
  password: string;
}
