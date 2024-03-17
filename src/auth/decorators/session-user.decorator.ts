import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const UserSession = createParamDecorator((key: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const userSession = request.user;
    return key ? userSession?.[key] : userSession;
});
