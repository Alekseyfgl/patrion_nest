import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from '../const/auth.const';
import { IJwtPayload, IUserSession } from '../interfeces/output';
import { UserQueryRepository } from '../../user/repositories/user.query.repository';
import { Nullable } from '../../common/interfaces/optional.types';
import { IUser } from '../../user/interfeces/output';
import { ExceptionsService } from '../../common/http-exceptions-service/exeption.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly userQueryRepository: UserQueryRepository,
        private readonly exceptionsService: ExceptionsService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtConstants.secret,
        });
    }

    async validate(tokenPayload: IJwtPayload): Promise<IUserSession> {
        const { userId, deviceId } = tokenPayload;
        const user: Nullable<IUser> = await this.userQueryRepository.findById(userId);

        if (!user) {
            // throw new CustomReqException(HttpStatus.UNAUTHORIZED, HttpExceptionMessagesConst.UNAUTHORIZED);
            throw this.exceptionsService.unauthorizedException();
        }

        /**
         *  @TODO  should add checking deviceId session
         */

        return { userId, deviceId };
    }
}
