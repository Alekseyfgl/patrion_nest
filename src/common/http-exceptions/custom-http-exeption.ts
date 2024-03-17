import { HttpException, HttpStatus } from '@nestjs/common';
import { HttpExceptionMessagesConst } from '../constans/http-exception-messages.const';

export class CustomReqException extends HttpException {
    constructor(status: HttpStatus, message: HttpExceptionMessagesConst, field: string = '') {
        super({ errorsMessages: [{ message, field }] }, status);
    }
}
