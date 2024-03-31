export interface DatabaseConfig {
    getNodeEnv(): string;
    //super Admin
    getSuperAdminName(): string;
    getSuperAdminPass(): string;
    //main server
    getServerHost(): string;
    getServerPort(): string;
    getSaltRounds(): string;
    getJwtSecret(): string;
    getAccessTokenExp(): string;
    getRefreshTokenExp(): string;
    getConfTokenEmailExp(): string;
    getConfTokenPassExp(): string;
    getRateLimitRequest(): string;
    // email
    getEmailHost(): string;
    getEmailLogin(): string;
    getEmailPassword(): string;
    // db
    _getDbHost(): string;
    _getDbPort(): string;
    _getDbName(): string;
    getDbMongoUrl(): string;
}
