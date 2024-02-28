import { Injectable } from '@nestjs/common';
import { RegistrationUserDto } from './interfeces/input';
import { UserCommandRepository } from './repository/user.command.repository';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
    constructor(
        protected userCommandRepository: UserCommandRepository,
        private configService: ConfigService,
    ) {}

    async create(dto: RegistrationUserDto) {
        this.logEnv();
        return this.userCommandRepository.create(dto);
    }

    logEnv() {
        const saltRounds = this.configService.get<number>('SALT_ROUNDS', 10);
        console.log(saltRounds);
    }
}
