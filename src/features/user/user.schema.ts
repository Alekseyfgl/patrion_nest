import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Model } from 'mongoose';
import { RegistrationUserDto } from './interfeces/input';
import bcrypt from 'bcrypt';
import configDotenv from 'dotenv';

configDotenv.config();

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

    async hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, +(process.env.SALT_ROUNDS as string));
    }

    static async createSuperUser(userDto: RegistrationUserDto, UserModel: UserModelType): Promise<UserDocument> {
        const createdUser: UserDocument = new UserModel(userDto);

        const hashedPassword = await createdUser.hashPassword(createdUser.password);
        createdUser.password = hashedPassword;
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
