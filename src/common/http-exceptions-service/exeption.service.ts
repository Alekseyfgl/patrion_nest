import { BadRequestException, ForbiddenException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { HttpExceptionMessagesConst } from '../constans/http-exception-messages.const';

export interface IException {
    badRequestException(message: HttpExceptionMessagesConst, field: string): void;
    internalServerErrorException(message: HttpExceptionMessagesConst, field: string): void;
    forbiddenException(message: HttpExceptionMessagesConst, field: string): void;
    unauthorizedException(message: HttpExceptionMessagesConst, field: string): void;
}

@Injectable()
export class ExceptionsService implements IException {
    badRequestException(message = HttpExceptionMessagesConst.BAD_REQUEST, field = ''): void {
        throw new BadRequestException({ errorsMessages: [{ message, field }] });
    }
    internalServerErrorException(message = HttpExceptionMessagesConst.INTERNAL_SERVER_ERROR, field = ''): void {
        throw new InternalServerErrorException({ errorsMessages: [{ message, field }] });
    }
    forbiddenException(message = HttpExceptionMessagesConst.FORBIDDEN, field = ''): void {
        throw new ForbiddenException({ errorsMessages: [{ message, field }] });
    }
    unauthorizedException(message = HttpExceptionMessagesConst.UNAUTHORIZED, field = ''): void {
        throw new UnauthorizedException({ errorsMessages: [{ message, field }] });
    }

    notFoundException(message = HttpExceptionMessagesConst.NOT_FOUND, field = ''): void {
        throw new NotFoundException({ errorsMessages: [{ message, field }] });
    }
}
