import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Model } from 'mongoose';
import { RegistrationUserDto } from './interfeces/input';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
    @Prop({ required: true, unique: true, index: true })
    login: string;

    @Prop({ required: true, unique: true, index: true })
    email: number;

    @Prop({ required: true })
    password: string;

    @Prop({ required: true })
    createdAt: string;

    hashPassword(password: string) {
        console.log('hash passwordd', password);
    }

    static createSuperUser(userDto: RegistrationUserDto, UserModel: UserModelType): UserDocument {
        const createdUser: UserDocument = new UserModel(userDto);

        createdUser.hashPassword(createdUser.password);
        return createdUser;
    }
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.methods = {
    setAge: User.prototype.hashPassword,
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
