import { CacheModule, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerMiddleware, LoggerModule } from '@andreafspeziale/logger';
import { CatsModule } from '../cats/cats.module';
import mapConfig, { Config, envSchema, Cache } from '../config';
import { HealthModule } from '../health/health.module';
import {
  getExceptionsFilterProvider,
  getRedisStore,
  getValidationPipeProvider,
} from './core.utils';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: (c) => mapConfig(envSchema.parse(c)),
    }),
    LoggerModule.forRootAsync({
      useFactory: (cs: ConfigService<Config, true>) => cs.get('logger'),
      inject: [ConfigService],
    }),
    CacheModule.registerAsync({
      isGlobal: true,
      useFactory: async (cs: ConfigService<Config, true>) =>
        await getRedisStore(cs.get<Cache>('cache')),
      inject: [ConfigService],
    }),
    HealthModule,
    CatsModule,
  ],
  providers: [getValidationPipeProvider(), getExceptionsFilterProvider()],
})
export class CoreModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(LoggerMiddleware)
      .exclude('(.*)/healthz', '/swagger(.*)', '/favicon.ico')
      .forRoutes('*');
  }
}
