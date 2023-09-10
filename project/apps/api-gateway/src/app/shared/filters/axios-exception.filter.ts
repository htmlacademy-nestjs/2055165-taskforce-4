import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { AxiosError } from 'axios';

const INTERNAL_SERVER_ERROR_MESSAGE = 'Internal server error';

@Catch(AxiosError)
export class AxiosExceptionFilter implements ExceptionFilter {
  catch(error: AxiosError<Record<string, unknown>>, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();

    const status = error.response?.data.statusCode || HttpStatus.INTERNAL_SERVER_ERROR;
    const message = error.response?.data.message || INTERNAL_SERVER_ERROR_MESSAGE;
    const errorName = error.response?.data.error || ''

    response
      .status(status as number)
      .json({
        error: errorName,
        statusCode: status,
        message,
      });
  }
}
