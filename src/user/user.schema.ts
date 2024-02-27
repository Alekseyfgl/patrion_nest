import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Model } from 'mongoose';
import { RegistrationUserDto } from './interfeces/input';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
    @Prop({ required: true, unique: true, index: true })
    login: string;

    @Prop({ required: true, unique: true, index: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop({ required: true, default: () => Date.now() }) // Use a function to get the default value
    createdAt: Date;

    hashPassword(password: string) {
        return password + '-hash';
    }

    static createSuperUser(userDto: RegistrationUserDto, UserModel: UserModelType): UserDocument {
        const createdUser: UserDocument = new UserModel(userDto);
        createdUser.password = createdUser.hashPassword(createdUser.password);
        return createdUser;
    }
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.methods = {
    hashPassword: User.prototype.hashPassword,
};

//statics methods
UserSchema.statics = {
    createSuperUser: User.createSuperUser,
};

//type for static methods
export type UserModelStaticType = {
    createSuperUser: (userDto: RegistrationUserDto, UserModel: UserModelType) => UserDocument;
};

//common type
export type UserModelType = Model<UserDocument> & UserModelStaticType;
