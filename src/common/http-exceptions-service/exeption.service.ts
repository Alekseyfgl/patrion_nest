import { BadRequestException, ForbiddenException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { HttpExceptionMessagesConst } from '../constans/http-exception-messages.const';
import { IException } from './exception.interface';

@Injectable()
export class ExceptionsService implements IException {
    badRequestException(message = HttpExceptionMessagesConst.BAD_REQUEST, field = '') {
        throw new BadRequestException({ errorsMessages: [{ message, field }] });
    }
    internalServerErrorException(message: string = HttpExceptionMessagesConst.INTERNAL_SERVER_ERROR, field = '') {
        throw new InternalServerErrorException({ errorsMessages: [{ message, field }] });
    }
    forbiddenException(message = HttpExceptionMessagesConst.FORBIDDEN, field = '') {
        throw new ForbiddenException({ errorsMessages: [{ message, field }] });
    }
    unauthorizedException(message = HttpExceptionMessagesConst.UNAUTHORIZED, field = '') {
        throw new UnauthorizedException({ errorsMessages: [{ message, field }] });
    }

    notFoundException(message = HttpExceptionMessagesConst.NOT_FOUND, field = '') {
        throw new NotFoundException({ errorsMessages: [{ message, field }] });
    }
}
