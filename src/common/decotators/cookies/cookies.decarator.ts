import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { COOKIE_NAME } from '../../constans/cookie.const';

export const Cookies = createParamDecorator((data: COOKIE_NAME, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return data ? request.cookies?.[data] : request.cookies;
});
