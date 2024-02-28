import { Injectable } from '@nestjs/common';
import { RegistrationUserDto } from './interfeces/input';
import { UserCommandRepository } from './repository/user.command.repository';

@Injectable()
export class UserService {
    constructor(protected userCommandRepository: UserCommandRepository) {}

    async create(dto: RegistrationUserDto) {
        return this.userCommandRepository.create(dto);
    }
}
