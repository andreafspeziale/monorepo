import type { Cache } from 'cache-manager';
import { createMock } from '@golevelup/ts-jest';
import { CACHE_MANAGER, INestApplication, NotFoundException } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import { LoggerModule } from '@andreafspeziale/logger';
import mapConfig, { Config, envSchema } from '../../../config';
import type { Cat } from '../cats.interfaces';
import { CatsService } from '../cats.service';

describe('CatsService (spec)', () => {
  let app: INestApplication;
  const cacheManager = createMock<Cache>();
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
      ],
      providers: [CatsService, { provide: CACHE_MANAGER, useValue: cacheManager }],
    }).compile();

    app = moduleRef.createNestApplication();

    catsService = app.get(CatsService);

    await app.init();
  });

  it('Should return the expected cat', async () => {
    const expectedCat = { id: 1, name: 'Bubi', age: 7 };

    const mockMemcachedGet = jest.spyOn(cacheManager, 'get');
    const mockMemcachedSetWithMeta = jest.spyOn(cacheManager, 'set');

    mockMemcachedGet.mockResolvedValueOnce(null);
    mockMemcachedSetWithMeta.mockResolvedValueOnce();

    expect(await catsService.getCat(1)).toEqual(expectedCat);

    expect(mockMemcachedGet).toHaveBeenNthCalledWith(1, expectedCat.id.toString());
    expect(mockMemcachedSetWithMeta).toHaveBeenNthCalledWith(
      1,
      expectedCat.id.toString(),
      expectedCat,
    );
  });

  it('Should return the expected cached cat', async () => {
    const expectedCachedCat: Cat = { id: 1, name: 'Bubi', age: 7 };

    const mockMemcachedGet = jest.spyOn(cacheManager, 'get');
    const mockMemcachedSetWithMeta = jest.spyOn(cacheManager, 'set');

    mockMemcachedGet.mockResolvedValueOnce(expectedCachedCat);

    expect(await catsService.getCat(1)).toEqual(expectedCachedCat);

    expect(mockMemcachedGet).toHaveBeenNthCalledWith(1, expectedCachedCat.id.toString());
    expect(mockMemcachedSetWithMeta).toHaveBeenCalledTimes(0);
  });

  it('Should throw the expected exception', async () => {
    const catId = 2;

    const mockMemcachedGet = jest.spyOn(cacheManager, 'get');
    const mockMemcachedSet = jest.spyOn(cacheManager, 'set');

    jest.spyOn(cacheManager, 'get').mockResolvedValueOnce(null);

    await expect(catsService.getCat(catId)).rejects.toThrow(NotFoundException);

    expect(mockMemcachedGet).toHaveBeenNthCalledWith(1, catId.toString());
    expect(mockMemcachedSet).toHaveBeenCalledTimes(0);
  });

  afterEach(async () => {
    jest.clearAllMocks();
  });

  afterAll(async () => {
    await app.close();
  });
});
