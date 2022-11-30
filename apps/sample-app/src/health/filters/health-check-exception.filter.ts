import { Catch, ArgumentsHost, ServiceUnavailableException } from '@nestjs/common';
import type { HealthCheckResult } from '@nestjs/terminus';
import { LoggerService } from '@andreafspeziale/logger';
import { ExceptionsFilter, httpErrorStatusCodeDescription } from '@andreafspeziale/common';
import type { Request, Response } from 'express';

@Catch(ServiceUnavailableException)
export class HealthCheckExceptionFilter extends ExceptionsFilter {
  constructor(protected override readonly logger: LoggerService) {
    super(logger);

    this.logger.setContext(HealthCheckExceptionFilter.name);
  }

  override catch(exception: ServiceUnavailableException, host: ArgumentsHost): void {
    const context = host.switchToHttp();
    const request = context.getRequest<Request>();
    const response = context.getResponse<Response>();

    const healthCheckResult = exception.getResponse() as HealthCheckResult;
    const status = exception.getStatus();

    this.log(
      request,
      {
        code: `HTTP.${status}`,
        message: httpErrorStatusCodeDescription(status),
        details: healthCheckResult.details,
      },
      exception.stack || '',
    );

    response.status(status).json(healthCheckResult);
  }
}
