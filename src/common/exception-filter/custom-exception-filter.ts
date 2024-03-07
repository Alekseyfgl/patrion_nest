import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();

        const exceptionResponse: any = exception.getResponse();
        console.log('exceptionResponse', exceptionResponse);

        if (status === HttpStatus.BAD_REQUEST) {
            const customResponse = { errorsMessages: exceptionResponse.message };
            response.status(status).json(customResponse);
        } else {
            response.status(status).json(exceptionResponse);
            // response.status(status).json({
            //     statusCode: status,
            //     timestamp: new Date().toISOString(),
            //     path: request.url,
            // });
        }
    }
}
