import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type RateLimitDocument = HydratedDocument<RateLimit>;

@Schema()
export class RateLimit {
    @Prop({ type: String, required: true, index: true })
    ip: boolean;

    @Prop({ type: String, required: true })
    url: string;

    @Prop({ required: true, default: () => Date.now(), expires: '15s' }) // Use a function to get the default value
    date: Date;
}

export const RateLimitSchema = SchemaFactory.createForClass(RateLimit);
