import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IUserSession } from '../interfeces/output';

export const SessionUser = createParamDecorator((data: unknown, ctx: ExecutionContext): IUserSession => {
    const request = ctx.switchToHttp().getRequest();
    //return userSession
    return request.user;
});
