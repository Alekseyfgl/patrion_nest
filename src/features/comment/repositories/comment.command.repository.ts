import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Comment, CommentDocument, CommentModelType } from '../comment.schema';
import { UpdateWriteOpResult } from 'mongoose';
import { Nullable, PromiseNull } from '../../../common/interfaces/optional.types';
import { ICommentModel } from '../interfaces/output';
import { clearCommentMapper } from '../comment.mapper';
import { UpdateCommentDto } from '../interfaces/input';

@Injectable()
export class CommentCommandRepository {
    constructor(
        @InjectModel(Comment.name)
        protected CommentModel: CommentModelType,
    ) {}

    async create(newComment: { postId: string; userId: string; content: string }): PromiseNull<ICommentModel> {
        try {
            const createdComment: Nullable<CommentDocument> = await this.CommentModel.create(newComment);
            return clearCommentMapper(createdComment);
        } catch (e) {
            console.error('[create]', e);
            return null;
        }
    }

    async updateById(commentId: string, dto: UpdateCommentDto): Promise<boolean> {
        try {
            const result: UpdateWriteOpResult = await this.CommentModel.updateOne({ _id: commentId }, dto);
            return !!result.matchedCount;
        } catch (e) {
            console.error('[updateById]', e);
            return false;
        }
    }

    async deleteById(commentId: string): Promise<boolean> {
        try {
            const result = await this.CommentModel.deleteOne({ _id: commentId });
            return !!result.deletedCount;
        } catch (e) {
            console.error('[deleteById]', e);
            return false;
        }
    }
}
