import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { ICustomErrors } from '../http-exceptions-service/exception.interface';
import { LoggerService } from '../services/logger/logger.service';

// @Catch(HttpException)
// export class HttpExceptionFilter implements ExceptionFilter {
//     constructor(private readonly logger: LoggerService) {}
//
//     catch(exception: HttpException, host: ArgumentsHost) {
//         const ctx = host.switchToHttp();
//         const response = ctx.getResponse<Response>();
//         const request = ctx.getRequest<Request>();
//         const status = exception.getStatus();
//
//         const exceptionResponse: any = exception.getResponse();
//
//         console.log(status);
//         this.logger.debug('HttpExceptionFilter ===>', '', { status, exceptionResponse });
//
//         switch (status) {
//             case HttpStatus.BAD_REQUEST: {
//                 response.status(status).json(exceptionResponse as ICustomErrors);
//                 break;
//             }
//             case HttpStatus.UNAUTHORIZED: {
//                 response.status(status).json({ errorsMessages: [{ message: HttpExceptionMessagesConst.UNAUTHORIZED, field: '' }] } as ICustomErrors);
//                 break;
//             }
//
//             case HttpStatus.INTERNAL_SERVER_ERROR: {
//                 response.status(status).json({ errorsMessages: [{ message: HttpExceptionMessagesConst.INTERNAL_SERVER_ERROR, field: '' }] } as ICustomErrors);
//                 break;
//             }
//
//             default:
//                 response.status(status).json(exceptionResponse);
//                 break;
//         }
//     }
// }

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
    constructor(private readonly logger: LoggerService) {}
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        // const request = ctx.getRequest<Request>();
        const status: number = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

        const exceptionResponse: unknown = exception.getResponse();

        this.logger.error('[AllExceptionFilter]', { status, exceptionResponse });

        switch (status) {
            case HttpStatus.BAD_REQUEST: {
                response.status(status).json(exceptionResponse as ICustomErrors);
                break;
            }
            case HttpStatus.UNAUTHORIZED: {
                response.status(status).json(exceptionResponse as ICustomErrors);
                break;
            }

            case HttpStatus.INTERNAL_SERVER_ERROR: {
                response.status(status).json(exceptionResponse as ICustomErrors);
                break;
            }

            default:
                response.status(status).json(exceptionResponse);
                break;
        }
    }
}
