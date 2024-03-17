import { HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { BasicStrategy as Strategy } from 'passport-http';
import { ConfigService } from '@nestjs/config';
import { CustomReqException } from '../../common/http-exceptions/custom-http-exeption';
import { HttpExceptionMessagesConst } from '../../common/constans/http-exception-messages.const';
import { Optional } from '../../common/interfaces/optional.types';

@Injectable()
export class HttpBasicStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly configService: ConfigService) {
        super();
    }

    validate(username: string, password: string) {
        const user: boolean = this.checkUser(username, password);
        if (!user) {
            throw new CustomReqException(HttpStatus.UNAUTHORIZED, HttpExceptionMessagesConst.UNAUTHORIZED);
        }
        return true;
    }

    private checkUser(username: string, password: string): boolean {
        const baseUserName: Optional<string> = this.configService.get<string>('BASE_USER_NAME');
        const baseUserPassword: Optional<string> = this.configService.get<string>('BASE__USER_PASSWORD');

        return baseUserName === username && baseUserPassword === password;
    }
}
