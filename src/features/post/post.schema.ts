import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Model, Types } from 'mongoose';

export type PostDocument = HydratedDocument<Post>;

@Schema()
export class Post {
    @Prop({ type: Types.ObjectId, ref: 'Blog', required: true })
    blogId: Types.ObjectId;

    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    shortDescription: string;

    @Prop({ required: true })
    content: string;

    @Prop({ required: false, default: 'string' })
    blogName: string;

    @Prop({ required: true, default: () => Date.now() }) // Use a function to get the default value
    createdAt: Date;
}

export const PostSchema = SchemaFactory.createForClass(Post);

//common type
export type PostModelType = Model<PostDocument>;
