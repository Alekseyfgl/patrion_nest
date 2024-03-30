import { Response } from 'express';
import { Injectable } from '@nestjs/common';
import { COOKIE_NAME } from '../../constans/cookie.const';
import { EnvConfigService } from '../env-config/env.config.service';

@Injectable()
export class CookieService {
    constructor(private readonly envConfigService: EnvConfigService) {}
    setRefreshToken(res: Response, refreshToken: string) {
        const maxAge: string = this.envConfigService.getRefreshTokenExp();

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
