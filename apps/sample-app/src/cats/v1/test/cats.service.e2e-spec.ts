import type { Cache as CacheManager } from 'cache-manager';
import { CacheModule, CACHE_MANAGER, INestApplication, NotFoundException } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import { LoggerModule } from '@andreafspeziale/logger';
import mapConfig, { Cache, Config, envSchema } from '../../../config';
import { CatsModule } from '../../cats.module';
import { CatsService } from '../cats.service';
import { getRedisStore } from '../../../core/core.utils';

describe('CatsService (spec)', () => {
  let app: INestApplication;
  let cacheManager: CacheManager & { store: { getClient: () => any } };
  let catsService: CatsService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: 'env/.env.test',
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
        CatsModule,
      ],
    }).compile();

    app = moduleRef.createNestApplication();

    cacheManager = app.get(CACHE_MANAGER);
    catsService = app.get(CatsService);

    await app.init();
  });

  it('Should return the expected cat', async () => {
    const expectedCat = { id: 1, name: 'Bubi', age: 7 };

    expect(await catsService.getCat(1)).toEqual(expectedCat);
  });

  it('Should return the expected cached cat', async () => {
    const expectedCat = { id: 1, name: 'Bubi', age: 7 };

    expect(await catsService.getCat(1)).toEqual(expectedCat);
  });

  it('Should throw the expected exception', async () => {
    await expect(catsService.getCat(2)).rejects.toThrow(NotFoundException);
  });

  afterEach(async () => {
    jest.clearAllMocks();
    await cacheManager.reset();
  });

  afterAll(async () => {
    cacheManager.store.getClient().quit(true);
    await app.close();
  });
});
