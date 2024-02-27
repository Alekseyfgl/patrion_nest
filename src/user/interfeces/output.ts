import { Types } from 'mongoose';

export interface UserSchema extends Document {
    _id: Types.ObjectId;
    login: string;
    email: string;
    password: string;
    createdAt: string;
}
