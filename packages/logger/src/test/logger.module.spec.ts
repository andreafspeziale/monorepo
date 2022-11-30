import { ConfigModule, ConfigService } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import {
  LoggerService,
  LoggerModule,
  LoggerConfig,
  LoggerLevel,
  LoggerModuleOptions,
} from '../lib';
import { TestService } from './test.service';

const loggerModuleoptions: LoggerModuleOptions = {
  level: LoggerLevel.Silent,
  pretty: false,
  redact: ['password'],
};

const returnConfig = (): LoggerConfig => ({ logger: loggerModuleoptions });

describe('LoggerModule (spec)', () => {
  it('Should correctly instantiate LoggerModule and LoggerService ', async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          load: [returnConfig],
        }),
        LoggerModule.forRootAsync({
          useFactory: (configService: ConfigService<ReturnType<typeof returnConfig>>) =>
            configService.get('logger') as LoggerModuleOptions,
          inject: [ConfigService],
        }),
      ],
      providers: [TestService],
    }).compile();

    const loggerModule = await moduleRef.resolve(LoggerModule);
    const loggerService = await moduleRef.resolve(LoggerService);

    expect(loggerModule).toBeInstanceOf(LoggerModule);
    expect(loggerService).toBeInstanceOf(LoggerService);

    const testService = moduleRef.get(TestService);

    const testServiceLogger = testService.getLogger();

    expect(testServiceLogger['context']).toBe('TestService');
    expect(testServiceLogger).toBeInstanceOf(LoggerService);
  });
});
