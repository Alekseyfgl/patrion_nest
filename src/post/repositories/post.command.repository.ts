import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Post, PostDocument, PostModelType } from '../post.schema';
import { IAddPostDto, UpdatePostDto } from '../interfaces/input';
import { Nullable, PromiseNull } from '../../common/interfaces/optional.types';
import { UpdateWriteOpResult } from 'mongoose';

@Injectable()
export class PostCommandRepository {
    constructor(
        @InjectModel(Post.name)
        protected PostModel: PostModelType,
    ) {}

    async create(dto: IAddPostDto): PromiseNull<PostDocument> {
        try {
            const createdPost: Nullable<PostDocument> = await this.PostModel.create(dto);
            if (!createdPost) return null;

            // return postMapper(createdPost);
            return createdPost;
        } catch (e) {
            console.error('CommandPostRepository [create]', e);
            return null;
        }
    }

    async updateById(id: string, dto: UpdatePostDto): Promise<boolean> {
        try {
            const result: UpdateWriteOpResult = await this.PostModel.updateOne({ _id: id }, dto);
            return !!result.matchedCount;
        } catch (e) {
            console.error('[updateById]', e);
            return false;
        }
    }

    async removeById(id: string): Promise<boolean> {
        try {
            const result = await this.PostModel.findOneAndDelete({ _id: id });
            return !!result;
        } catch (e) {
            console.error('[removeById]', e);
            return false;
        }
    }
}
