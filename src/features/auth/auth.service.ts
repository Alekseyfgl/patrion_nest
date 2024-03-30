import { Injectable } from '@nestjs/common';
import { UserQueryRepository } from '../user/repositories/user.query.repository';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';
import { userMapper } from '../user/user.mapper';
import { IUser } from '../user/interfeces/output';
import { setMilliseconds } from 'date-fns';
import { PromiseNull } from '../../common/interfaces/optional.types';
import { ITokens } from './interfeces/output';
import { EnvConfigService } from '../../common/services/env-config/env.config.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly userQueryRepository: UserQueryRepository,
        private readonly jwtService: JwtService,
        private readonly envConfigService: EnvConfigService,
    ) {}

    async validateUser(username: string, pass: string): PromiseNull<IUser> {
        const user = await this.userQueryRepository.findByLoginOrEmail(username);
        if (!user) return null;

        const isPasswordCorrect: boolean = await this.checkPassword(pass, user.password);
        if (!isPasswordCorrect) return null;

        return userMapper(user);
    }

    async login(user: IUser): Promise<ITokens> {
        const deviceId: string = (+new Date()).toString();

        const iat: number = Math.floor(+setMilliseconds(new Date(), 0) / 1000);
        const payload = { userId: user.id, deviceId, iat };

        const accessExpInSec = this.envConfigService.getAccessTokenExp();
        const refreshExpInSec = this.envConfigService.getRefreshTokenExp();

        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(payload, { expiresIn: accessExpInSec }),
            this.jwtService.signAsync(payload, { expiresIn: refreshExpInSec }),
        ]);
        return { accessToken, refreshToken };
    }

    private async checkPassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
        try {
            return bcrypt.compare(plainPassword, hashedPassword);
        } catch (error) {
            console.error('AuthService [checkPassword]', error);
            return false;
        }
    }
}
