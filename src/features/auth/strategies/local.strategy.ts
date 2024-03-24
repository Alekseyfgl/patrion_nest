import { Injectable } from '@nestjs/common';
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from '../auth.service';
import { IUser } from '../../user/interfeces/output';
import { ExceptionsService } from '../../../common/http-exceptions-service/exeption.service';
import { Nullable } from '../../../common/interfaces/optional.types';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly authService: AuthService,
        private readonly exceptionsService: ExceptionsService,
    ) {
        super({
            usernameField: 'loginOrEmail',
            passwordField: 'password',
        });
    }

    /**
     * Валидация пользователя по логину или email и паролю.
     * @param loginOrEmail Логин или email пользователя.
     * @param password Пароль пользователя.
     * @returns {Promise<IUser>} В случае успеха возвращает объект пользователя.
     * @throws {CustomReqException} Если данные не прошли валидацию или пользователь не найден.
     */
    async validate(loginOrEmail: string, password: string): Promise<IUser> {
        if (loginOrEmail.length < 3 || loginOrEmail.length > 10) {
            throw this.exceptionsService.badRequestException();
        }
        const user: Nullable<IUser> = await this.authService.validateUser(loginOrEmail, password);
        if (!user) {
            throw this.exceptionsService.unauthorizedException();
        }
        return user;
    }
}
