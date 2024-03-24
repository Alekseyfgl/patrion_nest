export interface ILogger {
    debug(context: string, message: string, payload?: unknown): void;
    log(context: string, message: string): void;
    error(context: string, message: string, trace?: string): void;
    warn(context: string, message: string): void;
    verbose(context: string, message: string): void;
}
