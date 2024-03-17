import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IUserSession } from '../interfeces/output';

export const UserSession = createParamDecorator((key: keyof IUserSession, ctx: ExecutionContext): IUserSession | string => {
    const request = ctx.switchToHttp().getRequest();
    const userSession: IUserSession = request.user;
    return key ? userSession?.[key] : userSession;
});
