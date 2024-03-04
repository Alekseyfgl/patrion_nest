import { Injectable } from '@nestjs/common';
import { RegistrationUserDto } from './interfeces/input';
import { UserCommandRepository } from './repositories/user.command.repository';
import { ConfigService } from '@nestjs/config';
import { PromiseNull } from '../common/interfaces/optional.types';
import { UserDocument } from './user.schema';

@Injectable()
export class UserService {
    constructor(
        protected userCommandRepository: UserCommandRepository,
        private configService: ConfigService,
    ) {}

    async create(dto: RegistrationUserDto): PromiseNull<UserDocument> {
        return this.userCommandRepository.create(dto);
    }

    async removeById(userId: string): Promise<boolean> {
        return this.userCommandRepository.removeById(userId);
    }

    // logEnv() {
    //     const saltRounds = this.configService.get<number>('SALT_ROUNDS', 10);
    //     console.log(saltRounds);
    // }
}
