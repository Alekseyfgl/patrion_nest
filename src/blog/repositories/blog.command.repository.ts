import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PromiseNull } from '../../common/interfaces/optional.types';
import { UpdateWriteOpResult } from 'mongoose';
import { Blog, BlogDocument, BlogModelType } from '../blog.schema';
import { AddBlogDto, UpdateBlogDto } from '../interfaces/input';

@Injectable()
export class BlogCommandRepository {
    constructor(
        @InjectModel(Blog.name)
        protected BlogModel: BlogModelType,
    ) {}

    async updateById(id: string, dto: UpdateBlogDto): Promise<boolean> {
        try {
            const result: UpdateWriteOpResult = await this.BlogModel.updateOne({ _id: id }, dto);
            return !!result.matchedCount;
        } catch (e) {
            console.error('CommentCommandRepository [updateById]', e);
            return false;
        }
    }

    async removeById(id: string): Promise<boolean> {
        try {
            const result = await this.BlogModel.deleteOne({ _id: id });
            return result.deletedCount > 0;
        } catch (e) {
            console.error('CommentCommandRepository [removeById]', e);
            return false;
        }
    }

    async create(dto: AddBlogDto): PromiseNull<BlogDocument> {
        try {
            return this.BlogModel.create(dto);
        } catch (e) {
            console.error('CommentCommandRepository [create]', e);
            return null;
        }
    }
}
