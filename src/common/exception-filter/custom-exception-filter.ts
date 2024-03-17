import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { ICustomErrors } from '../interfaces/error.interface';
import { HttpExceptionMessagesConst } from '../constans/http-exception-messages.const';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();

        const exceptionResponse: any = exception.getResponse();

        console.log('errorInfo', { status, exceptionResponse });

        switch (status) {
            case HttpStatus.BAD_REQUEST: {
                response.status(status).json(exceptionResponse as ICustomErrors);
                break;
            }
            case HttpStatus.UNAUTHORIZED: {
                response.status(status).json({ errorsMessages: [{ message: HttpExceptionMessagesConst.UNAUTHORIZED, field: '' }] } as ICustomErrors);
                break;
            }

            default:
                response.status(status).json(exceptionResponse);
                break;
        }
    }
}
