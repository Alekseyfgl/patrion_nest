interface IJwtStandardClaims {
    sub: string; // Subject - идентификатор пользователя
    iat?: number; // Issued At - время создания токена
    exp?: number; // Expiration Time - время истечения токена
    aud?: string | string[]; // Audience - получатели токена
    iss?: string; // Issuer - издатель токена
    jti?: string; // JWT ID - уникальный идентификатор токена
}
export interface IJwtPayload extends IJwtStandardClaims {
    userId: string;
    deviceId: string;
}

export type IUserSession = Pick<IJwtPayload, 'userId' | 'deviceId'>;

export interface ITokens {
    accessToken: string;
    refreshToken: string;
}
