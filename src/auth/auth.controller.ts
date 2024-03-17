import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { LoginDto } from './interfeces/input';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';

// @UseGuards(AuthGuard)
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    @HttpCode(HttpStatus.OK)
    async login(@Body() dto: LoginDto) {
        const result = await this.authService.login(dto);
        return { st: 'good' };
    }
}
