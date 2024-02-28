import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument, UserModelType } from '../user.schema';
import { RegistrationUserDto } from '../interfeces/input';

@Injectable()
export class UserCommandRepository {
    constructor(
        @InjectModel(User.name)
        private readonly UserModel: UserModelType,
    ) {}

    async create(userDto: RegistrationUserDto): Promise<UserDocument> {
        // Call the static method directly on the model
        const superUser: UserDocument = await this.UserModel.createSuperUser(userDto, this.UserModel);
        // Save the super user to the database
        return this.save(superUser);
    }

    async save(user: UserDocument): Promise<UserDocument> {
        // Use the create method provided by Mongoose to save the document
        return this.UserModel.create(user);
    }
}
