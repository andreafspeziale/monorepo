import { Injectable } from '@nestjs/common';
import { LoggerService } from '../lib/logger.service';

@Injectable()
export class TestService {
  constructor(private readonly logger: LoggerService) {
    this.logger.setContext(TestService.name);
  }

  getLogger(): LoggerService {
    return this.logger;
  }
}
