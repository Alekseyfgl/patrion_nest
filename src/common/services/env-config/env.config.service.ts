import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { DatabaseConfig } from './env.config.interface';
import { ExceptionsService } from '../../http-exceptions-service/exeption.service';
import { createMsgEnv, ENV } from './env.config.const';
import { Optional } from '../../interfaces/optional.types';

@Injectable()
export class EnvConfigService implements DatabaseConfig {
    constructor(
        private readonly configService: ConfigService,
        private readonly exceptionsService: ExceptionsService,
    ) {}

    getNodeEnv(): string {
        const env = ENV.NODE_ENV;
        const value: Optional<ENV> = this.configService.get<ENV>(env);
        if (!value) throw this.exceptionsService.internalServerErrorException(createMsgEnv(env), env);

        return value;
    }

    getSuperAdminName(): string {
        const env = ENV.SUPER_ADMIN_NAME;
        const value: Optional<ENV> = this.configService.get<ENV>(env);
        if (!value) throw this.exceptionsService.internalServerErrorException(createMsgEnv(env), env);

        return value;
    }

    getSuperAdminPass(): string {
        const env = ENV.SUPER_ADMIN_PASSWORD;
        const value: Optional<ENV> = this.configService.get<ENV>(env);
        if (!value) throw this.exceptionsService.internalServerErrorException(createMsgEnv(env), env);

        return value;
    }

    getServerPort(): string {
        const env = ENV.SERVER_PORT;
        const value: Optional<ENV> = this.configService.get<ENV>(env);
        if (!value) throw this.exceptionsService.internalServerErrorException(createMsgEnv(env), env);

        return value;
    }

    getServerHost(): string {
        const env = ENV.SERVER_HOST;
        const value: Optional<ENV> = this.configService.get<ENV>(env);
        if (!value) throw this.exceptionsService.internalServerErrorException(createMsgEnv(env), env);

        return value;
    }

    getSaltRounds(): string {
        const env = ENV.SALT_ROUNDS;
        const value: Optional<ENV> = this.configService.get<ENV>(env);
        if (!value) throw this.exceptionsService.internalServerErrorException(createMsgEnv(env), env);

        return value;
    }

    getJwtSecret(): string {
        const env = ENV.JWT_SECRET;
        const value: Optional<ENV> = this.configService.get<ENV>(env);
        if (!value) throw this.exceptionsService.internalServerErrorException(createMsgEnv(env), env);

        return value;
    }

    getAccessTokenExp(): string {
        const env = ENV.ACCESS_TOKEN_EXP;
        const value: Optional<ENV> = this.configService.get<ENV>(env);
        if (!value) throw this.exceptionsService.internalServerErrorException(createMsgEnv(env), env);

        return value;
    }

    getRefreshTokenExp(): string {
        const env = ENV.REFRESH_TOKEN_EXP;
        const value: Optional<ENV> = this.configService.get<ENV>(env);
        if (!value) throw this.exceptionsService.internalServerErrorException(createMsgEnv(env), env);

        return value;
    }

    getConfTokenEmailExp(): string {
        const env = ENV.CONFIRMATION_TOKEN_EMAIL_EXP;
        const value: Optional<ENV> = this.configService.get<ENV>(env);
        if (!value) throw this.exceptionsService.internalServerErrorException(createMsgEnv(env), env);

        return value;
    }

    getConfTokenPassExp(): string {
        const env = ENV.CONFIRMATION_TOKEN_PASSWORD_EXP;
        const value: Optional<ENV> = this.configService.get<ENV>(env);
        if (!value) throw this.exceptionsService.internalServerErrorException(createMsgEnv(env), env);

        return value;
    }

    getRateLimitRequest(): string {
        const env = ENV.RATE_REQ_LIMIT;
        const value: Optional<ENV> = this.configService.get<ENV>(env);
        if (!value) throw this.exceptionsService.internalServerErrorException(createMsgEnv(env), env);

        return value;
    }

    getEmailHost(): string {
        const env = ENV.EMAIL_HOST;
        const value: Optional<ENV> = this.configService.get<ENV>(env);
        if (!value) throw this.exceptionsService.internalServerErrorException(createMsgEnv(env), env);

        return value;
    }

    getEmailLogin(): string {
        const env = ENV.EMAIL_LOGIN;
        const value: Optional<ENV> = this.configService.get<ENV>(env);
        if (!value) throw this.exceptionsService.internalServerErrorException(createMsgEnv(env), env);

        return value;
    }

    getEmailPassword(): string {
        const env = ENV.EMAIL_PASSWORD;
        const value: Optional<ENV> = this.configService.get<ENV>(env);
        if (!value) throw this.exceptionsService.internalServerErrorException(createMsgEnv(env), env);

        return value;
    }

    getDbMongoUrl(): string {
        const host: string = this._getDbHost();
        const port: string = this._getDbPort();
        const name: string = this._getDbName();
        return `mongodb://${host}:${port}/${name}`;
    }

    _getDbHost(): string {
        const env = ENV.MONGO_DB_HOST;
        const value: Optional<ENV> = this.configService.get<ENV>(env);
        if (!value) throw this.exceptionsService.internalServerErrorException(createMsgEnv(env), env);

        return value;
    }

    _getDbPort(): string {
        const env = ENV.MONGO_DB_PORT;
        const value: Optional<ENV> = this.configService.get<ENV>(env);
        if (!value) throw this.exceptionsService.internalServerErrorException(createMsgEnv(env), env);

        return value;
    }

    _getDbName(): string {
        const env = ENV.MONGO_DB_NAME;
        const value: Optional<ENV> = this.configService.get<ENV>(env);
        if (!value) throw this.exceptionsService.internalServerErrorException(createMsgEnv(env), env);

        return value;
    }
}
