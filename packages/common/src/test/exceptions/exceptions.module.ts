import { Module, Injectable, Controller, Get } from '@nestjs/common';

@Injectable()
export class ExceptionsService {
  async getException(): Promise<string> {
    return 'Hello exceptions world!';
  }
}

@Controller('exceptions')
export class ExceptionsController {
  constructor(private readonly exceptionsService: ExceptionsService) {}

  @Get()
  getException(): Promise<string> {
    return this.exceptionsService.getException();
  }
}

@Module({
  controllers: [ExceptionsController],
  providers: [ExceptionsService],
})
export class ExceptionsModule {}
