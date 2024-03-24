import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument, UserModelType } from '../user.schema';
import { RegistrationUserDto } from '../interfeces/input';
import { PromiseNull } from '../../../common/interfaces/optional.types';

@Injectable()
export class UserCommandRepository {
    constructor(
        @InjectModel(User.name)
        protected UserModel: UserModelType,
    ) {}

    async create(userDto: RegistrationUserDto): PromiseNull<UserDocument> {
        // Call the static method directly on the model
        const superUser: UserDocument = await this.UserModel.createSuperUser(userDto, this.UserModel);
        // Save the super user to the database
        return this.save(superUser);
    }

    async save(user: UserDocument): PromiseNull<UserDocument> {
        try {
            return user.save();
        } catch (e) {
            return null;
        }
    }

    async removeById(userId: string): Promise<boolean> {
        try {
            const result = await this.UserModel.findOneAndDelete({ _id: userId });
            return !!result;
        } catch (e) {
            console.error('UserCommandRepository [removeById]', e);
            return false;
        }
    }
}
