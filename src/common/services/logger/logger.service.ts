import { ConsoleLogger, Injectable } from '@nestjs/common';
import { ILogger } from './loger.interface';

@Injectable()
export class LoggerService extends ConsoleLogger implements ILogger {
    debug(...args: unknown[]): void {
        if (process.env.NODE_ENV !== 'production') {
            super.debug('', ...args);
        }
    }
    verbose(...args: unknown[]): void {
        if (process.env.NODE_ENV !== 'production') {
            super.verbose('', ...args);
        }
    }

    log(...args: unknown[]): void {
        super.log('', ...args);
    }
    error(...args: unknown[]): void {
        super.error('', ...args);
    }
    warn(...args: unknown[]): void {
        super.warn('', ...args);
    }
}
