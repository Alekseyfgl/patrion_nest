import { Injectable } from '@nestjs/common';
import { UserQueryRepository } from '../user/repositories/user.query.repository';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';
import { PromiseNull } from '../common/interfaces/optional.types';
import { userMapper } from '../user/user.mapper';
import { IUser } from '../user/interfeces/output';

@Injectable()
export class AuthService {
    constructor(
        private userQueryRepository: UserQueryRepository,
        private readonly jwtService: JwtService,
    ) {}

    async validateUser(username: string, pass: string): PromiseNull<IUser> {
        const user = await this.userQueryRepository.findByLoginOrEmail(username);
        if (!user) return null;

        const isPasswordCorrect: boolean = await this.checkPassword(pass, user.password);
        if (!isPasswordCorrect) return null;

        return userMapper(user);
    }

    async login(user: any) {
        const payload = { username: user.username, sub: user.userId };
        return {
            accessToken: this.jwtService.sign(payload),
        };
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
