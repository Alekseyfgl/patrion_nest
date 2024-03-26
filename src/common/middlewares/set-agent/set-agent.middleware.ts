import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import * as geoip from 'geoip-lite';
import { Lookup } from 'geoip-lite';
import { IResult, UAParser, UAParserInstance } from 'ua-parser-js';
import { IAgentInfo, UserBrowserType, UserLocationType, UserOsType } from './agent.interface';
import { Nullable, Optional } from '../../interfaces/optional.types';
import { ExceptionsService } from '../../http-exceptions-service/exeption.service';

@Injectable()
export class UserAgentMiddleware implements NestMiddleware {
    constructor(private readonly exceptionsService: ExceptionsService) {}
    use(req: Request, res: Response, next: NextFunction) {
        const clientIp: string = req.agent.ip;

        const parser: UAParserInstance = new UAParser();
        const ua: Optional<string> = req.headers['user-agent']; // Get user-agent from headers

        if (!ua) throw this.exceptionsService.internalServerErrorException('User-agent not found', 'User-agent');

        const agentResult: IResult = parser.setUA(ua).getResult(); // Parse user-agent
        const geo: Nullable<Lookup> = geoip.lookup(clientIp);

        const loc: UserLocationType = geo ? `Country:${geo.country}, city:${geo.city}` : 'Unknown';
        const browser: UserBrowserType = agentResult.browser.name ? `Browser:${agentResult.browser.name}, version:${agentResult.browser.version}` : 'Unknown';
        const os: UserOsType = agentResult.os.name || 'Unknown';

        const agentInfo: IAgentInfo = { browser, os, loc, ip: clientIp };
        req.agent = agentInfo;
        next();
    }
}
