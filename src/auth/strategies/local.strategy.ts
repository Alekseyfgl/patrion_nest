import { HttpStatus, Injectable } from '@nestjs/common';
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from '../auth.service';
import { CustomReqException } from '../../common/http-exceptions/custom-http-exeption';
import { HttpExceptionMessagesConst } from '../../common/constans/http-exception-messages.const';
import { Nullable } from '../../common/interfaces/optional.types';
import { IUser } from '../../user/interfeces/output';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
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
            throw new CustomReqException(HttpStatus.BAD_REQUEST, HttpExceptionMessagesConst.BAD_REQUEST);
        }
        const user: Nullable<IUser> = await this.authService.validateUser(loginOrEmail, password);
        if (!user) {
            throw new CustomReqException(HttpStatus.UNAUTHORIZED, HttpExceptionMessagesConst.UNAUTHORIZED);
        }
        return user;
    }
}
