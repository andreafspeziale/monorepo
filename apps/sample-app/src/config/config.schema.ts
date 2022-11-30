import { baseEnvSchema } from '@andreafspeziale/common';
import { z } from 'zod';
import { CACHE_HOST, CACHE_TTL } from './config.defaults';

const cacheSchema = z.object({
  CACHE_HOST: z.string().default(CACHE_HOST),
  CACHE_PORT: z.preprocess((val) => parseInt(val as string, 10), z.number()),
  CACHE_TTL: z.preprocess((val) => parseInt(val as string, 10), z.number()).default(CACHE_TTL),
});

export const envSchema = baseEnvSchema.merge(cacheSchema);
