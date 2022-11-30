import { HttpException } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ExceptionResponse } from './exceptions.interfaces';

export class Exception extends HttpException {
  constructor(response: ExceptionResponse, status: number) {
    super(response, status);
  }

  @ApiProperty()
  code!: string;

  @ApiProperty()
  message!: string;

  @ApiPropertyOptional({
    oneOf: [
      {
        type: 'array',
        items: {
          type: 'string',
        },
      },
      {
        type: 'object',
        additionalProperties: { type: 'unknown' },
      },
    ],
  })
  details?: string[] | Record<string, unknown>;
}
