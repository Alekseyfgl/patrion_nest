import { HttpException, HttpStatus } from '@nestjs/common';
import { HttpExceptionMessages } from '../constans/http-exception-messages';

export class CustomBadReqException extends HttpException {
    constructor(status: HttpStatus, message: HttpExceptionMessages, field: string = '') {
        super({ errorsMessages: [{ message, field }] }, status);
    }
}
