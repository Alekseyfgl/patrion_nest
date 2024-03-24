import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Model } from 'mongoose';

export type BlogDocument = HydratedDocument<Blog>;

@Schema()
export class Blog {
    @Prop({ required: false, default: false })
    isMembership: boolean;

    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    description: string;

    @Prop({ required: true })
    websiteUrl: string;

    @Prop({ required: true, default: () => Date.now() }) // Use a function to get the default value
    createdAt: Date;
}

export const BlogSchema = SchemaFactory.createForClass(Blog);

// UserSchema.methods = {
//     hashPassword: User.prototype.hashPassword,
// };
//
// //statics methods
// UserSchema.statics = {
//     createSuperUser: User.createSuperUser,
// };
//
// //type for static methods
// export type UserModelStaticType = {
//     createSuperUser: (userDto: RegistrationUserDto, UserModel: UserModelType) => UserDocument;
// };

//common type
export type BlogModelType = Model<BlogDocument>;
