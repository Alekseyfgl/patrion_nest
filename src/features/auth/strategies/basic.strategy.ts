import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { BasicStrategy as Strategy } from 'passport-http';
import { ConfigService } from '@nestjs/config';
import { ExceptionsService } from '../../../common/http-exceptions-service/exeption.service';
import { Optional } from '../../../common/interfaces/optional.types';

@Injectable()
export class HttpBasicStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly configService: ConfigService,
        private readonly exceptionsService: ExceptionsService,
    ) {
        super();
    }

    validate(username: string, password: string) {
        const user: boolean = this.checkUser(username, password);
        if (!user) {
            throw this.exceptionsService.unauthorizedException();
        }
        return true;
    }

    private checkUser(username: string, password: string): boolean {
        const baseUserName: Optional<string> = this.configService.get<string>('BASE_USER_NAME');
        const baseUserPassword: Optional<string> = this.configService.get<string>('BASE_USER_PASSWORD');

        return baseUserName === username && baseUserPassword === password;
    }
}
