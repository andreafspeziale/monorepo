import { getBaseConfig } from '@andreafspeziale/common';
import type { Config, EnvSchema } from './config.interfaces';

export * from './config.interfaces';
export * from './config.schema';

export default (e: EnvSchema): Config => ({
  cache: {
    host: e.CACHE_HOST,
    port: e.CACHE_PORT,
    ttl: e.CACHE_TTL,
  },
  ...getBaseConfig(e),
});
