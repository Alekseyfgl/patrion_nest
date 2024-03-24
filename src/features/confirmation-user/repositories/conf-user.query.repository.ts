import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Nullable, PromiseNull } from '../../../common/interfaces/optional.types';
import { ConfirmationUser, ConfirmationUserDocument, ConfirmationUserModelType } from '../confirmation-user.schema';

@Injectable()
export class ConfUserQueryRepository {
    constructor(
        @InjectModel(ConfirmationUser.name)
        private readonly ConfirmationUserModel: ConfirmationUserModelType,
    ) {}

    async findConfStatusByUserId(userId: string): PromiseNull<ConfirmationUserDocument> {
        try {
            const confirmationStatus: Nullable<ConfirmationUserDocument> = await this.ConfirmationUserModel.findOne({ userId });
            return confirmationStatus;
        } catch (err) {
            console.error('QueryConfirmationUserRepository [create]', err);
            return null;
        }
    }
}
