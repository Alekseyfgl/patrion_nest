import { Injectable } from '@nestjs/common';
import { RegistrationUserDto } from './interfeces/input';
import { UserCommandRepository } from './repositories/user.command.repository';
import { PromiseNull } from '../../common/interfaces/optional.types';
import { UserDocument } from './user.schema';

@Injectable()
export class UserService {
    constructor(protected userCommandRepository: UserCommandRepository) {}

    async create(dto: RegistrationUserDto): PromiseNull<UserDocument> {
        return this.userCommandRepository.create(dto);
    }

    async removeById(userId: string): Promise<boolean> {
        return this.userCommandRepository.removeById(userId);
    }
}
