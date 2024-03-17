import { Injectable } from '@nestjs/common';
import { UserQueryRepository } from '../user/repositories/user.query.repository';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';
import { PromiseNull } from '../common/interfaces/optional.types';
import { userMapper } from '../user/user.mapper';
import { IUser } from '../user/interfeces/output';
import { setMilliseconds } from 'date-fns';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    constructor(
        private readonly userQueryRepository: UserQueryRepository,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
    ) {}

    async validateUser(username: string, pass: string): PromiseNull<IUser> {
        const user = await this.userQueryRepository.findByLoginOrEmail(username);
        if (!user) return null;

        const isPasswordCorrect: boolean = await this.checkPassword(pass, user.password);
        if (!isPasswordCorrect) return null;

        return userMapper(user);
    }

    async login(user: IUser) {
        const deviceId = (+new Date()).toString();

        const iat: number = Math.floor(+setMilliseconds(new Date(), 0) / 1000);
        const payload = { userId: user.id, deviceId, iat };

        const accessExpInSec = this.configService.get<string>('ACCESS_TOKEN_EXP');
        const refreshExpInSec = this.configService.get<string>('REFRESH_TOKEN_EXP');

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
