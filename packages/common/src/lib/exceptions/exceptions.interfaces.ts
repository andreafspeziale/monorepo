import {
  ExampleObject,
  ExamplesObject,
} from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

export interface ApiExceptionResponseOptions {
  status: number;
  description?: string;
  example?: ExampleObject['value'];
  examples?: ExamplesObject;
}

export interface ExceptionResponse {
  code: string;
  message: string;
  details?: string[] | Record<string, unknown>;
}
