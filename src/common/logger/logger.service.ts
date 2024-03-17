import { ConsoleLogger, Injectable } from '@nestjs/common';
import { ILogger } from './loger.interface';

@Injectable()
export class LoggerService extends ConsoleLogger implements ILogger {
    debug(context: string, message: string): void {
        if (process.env.NODE_ENV !== 'production') {
            super.debug(`[DEBUG] ${message}`, { context });
        }
    }
    verbose(context: string, message: string): void {
        if (process.env.NODE_ENV !== 'production') {
            super.verbose(`[VERBOSE] ${message}`, { context });
        }
    }

    log(context: string, message: string): void {
        super.log(`[INFO] ${message}`, { context });
    }
    error(context: string, message: string, trace?: string): void {
        super.error(`[ERROR] ${message}`, { context, trace });
    }
    warn(context: string, message: string): void {
        super.warn(`[WARN] ${message}`, { context });
    }
}
