import { LoggerLevel } from '@andreafspeziale/logger';
import { z } from 'zod';
import {
  HOST,
  PORT,
  API_PREFIX,
  SWAGGER,
  LOGGER_LEVEL,
  LOGGER_PRETTY,
  LOGGER_REDACT,
  NODE_ENV,
} from './config.defaults';
import { NodeEnv } from './config.interfaces';

export const baseEnvSchema = z.object({
  NODE_ENV: z.nativeEnum(NodeEnv).default(NODE_ENV),
  HOST: z.string().default(HOST),
  PORT: z.preprocess((val) => parseInt(val as string, 10), z.number()).default(PORT),
  API_PREFIX: z.string().default(API_PREFIX),
  SWAGGER: z.preprocess((val) => val === 'true', z.boolean()).default(SWAGGER),
  LOGGER_LEVEL: z.nativeEnum(LoggerLevel).default(LOGGER_LEVEL),
  LOGGER_PRETTY: z.preprocess((val) => val === 'true', z.boolean()).default(LOGGER_PRETTY),
  LOGGER_REDACT: z
    .preprocess((val) => (val as string).split(','), z.string().array())
    .default(LOGGER_REDACT),
});
