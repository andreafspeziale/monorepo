import { Module } from '@nestjs/common';
import { CatsController as CatsControllerV1 } from './v1/cats.controller';
import { CatsService as CatsServiceV1 } from './v1/cats.service';

@Module({
  providers: [CatsServiceV1],
  controllers: [CatsControllerV1],
  imports: [],
})
export class CatsModule {}
