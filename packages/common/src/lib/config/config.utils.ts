import { BaseConfig, BaseEnvSchema } from './config.interfaces';

export const getBaseConfig = (e: BaseEnvSchema): BaseConfig => ({
  service: {
    name: process.env.npm_package_name || '',
    version: process.env.npm_package_version || '',
  },
  env: e.NODE_ENV,
  server: {
    host: e.HOST,
    port: e.PORT,
    apiPrefix: e.API_PREFIX,
    swagger: e.SWAGGER,
  },
  logger: {
    level: e.LOGGER_LEVEL,
    pretty: e.LOGGER_PRETTY,
    redact: e.LOGGER_REDACT,
  },
});
