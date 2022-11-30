import { Controller, Get, UseFilters, VERSION_NEUTRAL } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import {
  HealthCheck,
  HealthCheckService,
  HealthCheckResult,
  HealthIndicatorResult,
  MicroserviceHealthIndicator,
} from '@nestjs/terminus';
import { RedisOptions, Transport } from '@nestjs/microservices';
import type { Cache, Config } from '../config';
import { HealthCheckExceptionFilter } from './filters';

@ApiTags('healthz')
@Controller({
  path: 'healthz',
  version: VERSION_NEUTRAL,
})
export class HealthController {
  constructor(
    private readonly health: HealthCheckService,
    private readonly microservice: MicroserviceHealthIndicator,
    private readonly configService: ConfigService<Config, true>,
  ) {}

  @Get()
  @HealthCheck()
  @UseFilters(HealthCheckExceptionFilter)
  @ApiOperation({
    summary: 'Health check',
    description: 'Retrieve **Health** status.',
  })
  check(): Promise<HealthCheckResult> {
    return this.health.check([
      (): Promise<HealthIndicatorResult> =>
        // ? This might not make sense since if Redis shutsdown the APIs wont respond anymore
        // ? So this is mostly showcasing the Terminus capabilities
        this.microservice.pingCheck<RedisOptions>('redis', {
          transport: Transport.REDIS,
          options: {
            host: this.configService.get<Cache>('cache').host,
            port: this.configService.get<Cache>('cache').port,
          },
        }),
    ]);
  }
}
