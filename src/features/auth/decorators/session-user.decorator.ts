import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IUserSession } from '../interfeces/output';
import { Optional } from '../../../common/interfaces/optional.types';

export const UserSession = createParamDecorator((key: Optional<keyof IUserSession>, ctx: ExecutionContext): IUserSession | string => {
    const request = ctx.switchToHttp().getRequest();
    const userSession: IUserSession = request.user;
    return key ? userSession?.[key] : userSession;
});
