import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiExceptionResponse, httpExceptionExamples } from '@andreafspeziale/common';
import { CatsService } from './cats.service';
import { Cat, CatParam } from './dto';

@ApiTags('cats')
@Controller({
  path: 'cats',
  version: '1',
})
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get(':id')
  @ApiOperation({
    summary: 'Retrieves a cat by id',
    description: 'A Cat is a sample entity. If not found throws a NotFoundException.',
  })
  @ApiExceptionResponse({
    status: 400,
    example: httpExceptionExamples.ValidationException.value,
  })
  @ApiExceptionResponse({
    status: 404,
    example: httpExceptionExamples.NotFoundException.value,
  })
  async getConfiguration(@Param() { id }: CatParam): Promise<Cat> {
    const { id: _, ...res } = await this.catsService.getCat(id);
    return res;
  }
}
