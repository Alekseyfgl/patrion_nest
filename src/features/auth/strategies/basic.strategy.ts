import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { BasicStrategy as Strategy } from 'passport-http';
import { ExceptionsService } from '../../../common/http-exceptions-service/exeption.service';
import { Optional } from '../../../common/interfaces/optional.types';
import { EnvConfigService } from '../../../common/services/env-config/env.config.service';

@Injectable()
export class HttpBasicStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly envConfigService: EnvConfigService,
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
        const baseUserName: Optional<string> = this.envConfigService.getSuperAdminName();
        const baseUserPassword: Optional<string> = this.envConfigService.getSuperAdminPass();

        return baseUserName === username && baseUserPassword === password;
    }
}
