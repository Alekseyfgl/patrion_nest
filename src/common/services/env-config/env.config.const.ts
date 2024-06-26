export const createMsgEnv = (property: string): string => `Property - ${property} from env not found!`;

export const enum ENV {
    NODE_ENV = 'NODE_ENV',
    //super Admin
    SUPER_ADMIN_NAME = 'SUPER_ADMIN_NAME',
    SUPER_ADMIN_PASSWORD = 'SUPER_ADMIN_PASSWORD',
    //main server
    SERVER_HOST = 'SERVER_HOST',
    SERVER_PORT = 'SERVER_PORT',
    SALT_ROUNDS = 'SALT_ROUNDS',
    JWT_SECRET = 'JWT_SECRET',
    ACCESS_TOKEN_EXP = 'ACCESS_TOKEN_EXP',
    REFRESH_TOKEN_EXP = 'REFRESH_TOKEN_EXP',
    CONFIRMATION_TOKEN_EMAIL_EXP = 'CONFIRMATION_TOKEN_EMAIL_EXP',
    CONFIRMATION_TOKEN_PASSWORD_EXP = 'CONFIRMATION_TOKEN_PASSWORD_EXP',
    RATE_REQ_LIMIT = 'RATE_REQ_LIMIT',
    // email
    EMAIL_HOST = 'EMAIL_HOST',
    EMAIL_LOGIN = 'EMAIL_LOGIN',
    EMAIL_PASSWORD = 'EMAIL_PASSWORD',
    // mongo db
    MONGO_DB_HOST = 'MONGO_DB_HOST',
    MONGO_DB_PORT = 'MONGO_DB_PORT',
    MONGO_DB_NAME = 'MONGO_DB_NAME',
}
