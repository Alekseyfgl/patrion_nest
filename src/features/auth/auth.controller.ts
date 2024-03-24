import { Controller, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/password-js/local-auth.guard';
import { JwtAuthGuard } from './guards/password-js/jwt-auth.guard';
import { UserSession } from './decorators/session-user.decorator';
import { IUserSession } from './interfeces/output';
import { BasicAuthGuard } from './guards/password-js/basic-auth.guard';
import { LoggerService } from '../../common/logger/logger.service';
import { ExceptionsService } from '../../common/http-exceptions-service/exeption.service';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly logger: LoggerService,
        private readonly exceptionsService: ExceptionsService,
    ) {}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    @HttpCode(HttpStatus.OK)
    async login(@Request() req) {
        const tokens = await this.authService.login(req.user);
        return tokens;
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
