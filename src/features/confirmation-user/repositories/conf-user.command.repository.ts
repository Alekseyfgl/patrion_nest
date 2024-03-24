import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Nullable, PromiseNull } from '../../../common/interfaces/optional.types';
import { ConfirmationUser, ConfirmationUserDocument, ConfirmationUserModelType } from '../confirmation-user.schema';

@Injectable()
export class ConfUserCommandRepository {
    constructor(
        @InjectModel(ConfirmationUser.name)
        private readonly ConfirmationUserModel: ConfirmationUserModelType,
    ) {}

    async updateConfStatusByCode(userId: string, code: string, isConfirmed: boolean): PromiseNull<ConfirmationUserDocument> {
        try {
            const newCode: Nullable<string> = isConfirmed ? null : code;
            // Второй параметр метода findOneAndUpdate - это объект с обновлениями.
            // $set оператор используется для указания полей, которые нужно обновить.
            return this.ConfirmationUserModel.findOneAndUpdate(
                { userId }, // условие поиска
                { $set: { isConfirmed, code: newCode } }, // обновляемые поля
                { new: true }, // опция, указывающая, что нужно вернуть обновлённый документ
            );
        } catch (err) {
            return null;
        }
    }
}
