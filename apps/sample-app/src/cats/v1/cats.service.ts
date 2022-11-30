import { CACHE_MANAGER, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { LoggerService } from '@andreafspeziale/logger';
import type { Cache } from 'cache-manager';
import type { Cat } from './cats.interfaces';

@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [{ id: 1, name: 'Bubi', age: 7 }];

  constructor(
    private readonly logger: LoggerService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {
    this.logger.setContext(CatsService.name);
  }

  async getCat(id: number): Promise<Cat> {
    this.logger.log('Fetching cat...', {
      fn: this.getCat.name,
      id,
    });

    const cachedCat = await this.cacheManager.get<Cat>(id.toString());

    if (!cachedCat) {
      const filteredCats = this.cats.filter((c) => id === c.id);

      if (filteredCats.length !== 1 || !filteredCats[0]) {
        this.logger.error('Cat not found', {
          fn: this.getCat.name,
          id,
        });

        throw new NotFoundException();
      }

      this.logger.debug('Caching cat...', {
        fn: this.getCat.name,
        id,
      });

      await this.cacheManager.set(filteredCats[0].id.toString(), filteredCats[0]);

      return filteredCats[0];
    }

    this.logger.debug('Cat fetched from cache', {
      fn: this.getCat.name,
      id,
    });

    return cachedCat;
  }
}
