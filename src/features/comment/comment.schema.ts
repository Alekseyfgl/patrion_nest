import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Model, Types } from 'mongoose';

export type CommentDocument = HydratedDocument<Comment>;

@Schema()
export class Comment {
    @Prop({ type: Types.ObjectId, ref: 'Post', required: true })
    postId: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    userId: string;

    @Prop({ required: true })
    content: string;

    @Prop({ required: true, default: () => Date.now() }) // Use a function to get the default value
    createdAt: Date;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);

//common type
export type CommentModelType = Model<CommentDocument>;
