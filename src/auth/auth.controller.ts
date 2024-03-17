import { Controller, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { SessionUser } from './decorators/session-user.decorator';
import { IUserSession } from './interfeces/output';

// @UseGuards(AuthGuard)
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

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
    async jwt_login(@SessionUser() sessionUser: IUserSession) {
        return sessionUser;
    }
}
