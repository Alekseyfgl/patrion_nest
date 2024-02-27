import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument, UserModelType } from './user.schema';
import { RegistrationUserDto } from './interfeces/input';

@Injectable()
export class UserRepository {
    constructor(
        @InjectModel(User.name)
        private UserModel: UserModelType,
    ) {}

    async create(userDto: RegistrationUserDto): Promise<UserDocument> {
        const superUser: UserDocument = this.UserModel.createSuperUser(userDto, this.UserModel);

        return this.save(superUser);
    }

    async save(user: UserDocument): Promise<UserDocument> {
        return user.save();
    }

    async findAll(): Promise<UserDocument[]> {
        return this.UserModel.find();
    }
}
