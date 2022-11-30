import type { z } from 'zod';
import type { BaseConfig } from '@andreafspeziale/common';
import type { envSchema } from './config.schema';

export interface Cache {
  host: string;
  port: number;
  ttl: number;
}

export interface CacheConfig {
  cache: Cache;
}

export type EnvSchema = z.infer<typeof envSchema>;
export type Config = BaseConfig & CacheConfig;
