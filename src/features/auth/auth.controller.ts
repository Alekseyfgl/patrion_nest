import { Controller, HttpCode, HttpStatus, Post, Request, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/password-js/local-auth.guard';
import { JwtAuthGuard } from './guards/password-js/jwt-auth.guard';
import { UserSession } from './decorators/session-user.decorator';
import { ITokens, IUserSession } from './interfeces/output';
import { BasicAuthGuard } from './guards/password-js/basic-auth.guard';
import { LoggerService } from '../../common/services/logger/logger.service';
import { ExceptionsService } from '../../common/http-exceptions-service/exeption.service';
import { CookieService } from '../../common/services/cookie/cookie.service';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly logger: LoggerService,
        private readonly exceptionsService: ExceptionsService,
        private readonly cookieService: CookieService,
    ) {}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    @HttpCode(HttpStatus.OK)
    async login(@Request() req, @Res({ passthrough: true }) res) {
        console.log(req.agent);
        const { accessToken, refreshToken }: ITokens = await this.authService.login(req.user);

        this.cookieService.setRefreshToken(res, refreshToken);

        return { accessToken };
    }

    @UseGuards(JwtAuthGuard)
    @Post('jwt_login')
    @HttpCode(HttpStatus.OK)
    async jwt_login(@UserSession() userSession: IUserSession) {
        return userSession;
    }

    @UseGuards(BasicAuthGuard)
    @Post('for-sa')
    @HttpCode(HttpStatus.OK)
    async basic_login() {
        // throw this.exceptionsService.unauthorizedException();

        this.logger.debug('AuthController', 'Hello world!!!');
        return { ok: true };
    }
}
