import { Response } from 'express';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { COOKIE_NAME } from '../../constans/cookie.const';

@Injectable()
export class CookieService {
    constructor(private readonly configService: ConfigService) {}
    setRefreshToken(res: Response, refreshToken: string) {
        const maxAge: string = this.configService.get<string>('REFRESH_TOKEN_EXP')!;

        const cookieOptions = {
            httpOnly: true,
            secure: true,
            maxAge: parseFloat(maxAge) * 1000, //convert seconds to milliseconds
        };
        res.cookie(COOKIE_NAME.REFRESH_TOKEN, refreshToken, cookieOptions);
    }

    removeRefreshToken(res: Response) {
        const cookieOptions = {
            httpOnly: true,
            secure: true,
            maxAge: 0,
        };
        res.cookie(COOKIE_NAME.REFRESH_TOKEN, '', cookieOptions);
    }
}
