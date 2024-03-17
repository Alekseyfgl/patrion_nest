import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from '../const/auth.const';
import { AuthService } from '../auth.service'; // Убедитесь, что путь до констант верный

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtConstants.secret,
        });
    }

    async validate(payload: any) {
        // Здесь вы можете добавить логику валидации пользователя
        // Например, проверить, существует ли пользователь в базе данных
        return { userId: payload.sub, username: payload.username };
    }
}
