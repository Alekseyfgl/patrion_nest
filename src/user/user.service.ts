import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { RegistrationUserDto } from './interfeces/input';

@Injectable()
export class UserService {
    constructor(protected userRepository: UserRepository) {}

    async create(dto: RegistrationUserDto) {
        return this.userRepository.create(dto);
    }

    async getAll() {
        return this.userRepository;
    }
}
