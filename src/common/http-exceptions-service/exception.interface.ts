import { HttpExceptionMessagesConst } from '../constans/http-exception-messages.const';

export interface ICustomErrors {
    errorsMessages: IErrorMessage[];
}

export interface IErrorMessage {
    message: string;
    field: string;
}

export interface IException {
    badRequestException(message: HttpExceptionMessagesConst, field: string): void;
    internalServerErrorException(message: HttpExceptionMessagesConst, field: string): void;
    forbiddenException(message: HttpExceptionMessagesConst, field: string): void;
    unauthorizedException(message: HttpExceptionMessagesConst, field: string): void;
}
