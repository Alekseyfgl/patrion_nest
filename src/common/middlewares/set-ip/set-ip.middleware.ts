import { Injectable, NestMiddleware } from '@nestjs/common';
import { ExceptionsService } from '../../http-exceptions-service/exeption.service';
import { NextFunction, Request, Response } from 'express';
import { Optional } from '../../interfaces/optional.types';

@Injectable()
export class SetIpMiddleware implements NestMiddleware {
    constructor(private readonly exceptionsService: ExceptionsService) {}
    use(req: Request, res: Response, next: NextFunction) {
        const xForwardedFor = req.headers['x-forwarded-for'];
        let clientIp: Optional<string>;

        if (typeof xForwardedFor === 'string') {
            clientIp = xForwardedFor.split(',')[0];
        } else if (Array.isArray(xForwardedFor)) {
            clientIp = xForwardedFor[0];
        } else {
            clientIp = req.ip;
        }

        if (!clientIp) throw this.exceptionsService.internalServerErrorException('There is a unknown ip', 'IP');

        req.agent = {} as any;
        req.agent.ip = clientIp;
        next();
    }
}
