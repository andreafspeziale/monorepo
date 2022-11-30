import { applyDecorators } from '@nestjs/common';
import { ApiResponse, getSchemaPath } from '@nestjs/swagger';
import { Exception } from './exception';
import { ApiExceptionResponseOptions } from './exceptions.interfaces';

export const ApiExceptionResponse = ({
  status,
  description,
  example,
  examples,
}: ApiExceptionResponseOptions) =>
  applyDecorators(
    ApiResponse({
      status,
      description,
      content: {
        'application/json': {
          schema: { $ref: getSchemaPath(Exception) },
          example,
          examples,
        },
      },
    }),
  );
