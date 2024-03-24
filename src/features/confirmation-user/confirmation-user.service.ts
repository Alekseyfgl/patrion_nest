import { Injectable } from '@nestjs/common';
import { ConfUserCommandRepository } from './repositories/conf-user.command.repository';
import { PromiseNull } from '../../common/interfaces/optional.types';
import { ConfirmationUserDocument } from './confirmation-user.schema';

@Injectable()
export class ConfirmationUserService {
    constructor(private readonly confUserCommandRepository: ConfUserCommandRepository) {}
    async updateConfStatusByCode(userId: string, code: string, isConfirmed: boolean): PromiseNull<ConfirmationUserDocument> {
        return this.confUserCommandRepository.updateConfStatusByCode(userId, code, isConfirmed);
    }
}
