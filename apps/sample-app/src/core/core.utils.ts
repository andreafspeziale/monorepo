import { Provider, ValidationPipe } from '@nestjs/common';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { ExceptionsFilter } from '@andreafspeziale/common';
import { redisStore } from 'cache-manager-redis-store';
import type { Cache } from '../config';

export const getValidationPipeProvider = (): Provider => ({
  provide: APP_PIPE,
  useFactory: (): ValidationPipe =>
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
});

export const getExceptionsFilterProvider = (): Provider => ({
  provide: APP_FILTER,
  useClass: ExceptionsFilter,
});

// ! https://github.com/dabroek/node-cache-manager-redis-store/issues/40
// ! https://github.com/dabroek/node-cache-manager-redis-store/issues/52
export const getRedisStore = async ({ host, port, ttl }: Cache): Promise<any> => {
  const store = await redisStore({
    socket: {
      host,
      port,
    },
    ttl,
  });

  return {
    store: () => store,
  };
};
