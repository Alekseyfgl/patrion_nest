import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Model, Types } from 'mongoose';

export type ConfirmationUserDocument = HydratedDocument<ConfirmationUser>;

@Schema()
export class ConfirmationUser {
    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    userId: Types.ObjectId;

    @Prop({ required: true })
    isConfirmed: boolean;

    @Prop({ required: true, default: null })
    code: string;
}

export const ConfirmationUserSchema = SchemaFactory.createForClass(ConfirmationUser);

//common type
export type ConfirmationUserModelType = Model<ConfirmationUserDocument>;
