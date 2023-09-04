export interface AppConfig {
  environment: string;
  port: number;
}

export interface FsUploaderConfig {
  serveRoot: string;
  environment: string;
  port: number;
  uploadDirectory: string;
}
