import { AddCommentDto, UpdateCommentDto } from './interfaces/input';
import { Nullable, PromiseNull } from '../common/interfaces/optional.types';
import { IComment, ICommentModel } from './interfaces/output';
import { IUser } from '../user/interfeces/output';
import { commentMapper } from './comment.mapper';
import { CommentQueryRepository } from './repositories/comment.query.repository';
import { CommentCommandRepository } from './repositories/comment.command.repository';
import { UserQueryRepository } from '../user/repositories/user.query.repository';
import { HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class CommentService {
    constructor(
        protected commentCommandRepository: CommentCommandRepository,
        protected commentQueryRepository: CommentQueryRepository,
        protected userQueryRepository: UserQueryRepository,
    ) {}
    async create(dto: AddCommentDto, postId: string, userId: string): PromiseNull<IComment> {
        const newComment = { postId, userId, content: dto.content };

        const createdComment: Nullable<ICommentModel> = await this.commentCommandRepository.create(newComment);
        if (!createdComment) return null;

        const author: Nullable<IUser> = await this.userQueryRepository.findById(userId);
        if (!author) return null;

        return commentMapper(createdComment, author);
    }

    async update(dto: UpdateCommentDto, commentId: string, userId: string): Promise<HttpStatus> {
        const commentById: Nullable<ICommentModel> = await this.commentQueryRepository.findById(commentId);
        if (!commentById) return HttpStatus.NOT_FOUND;

        if (commentById.userId !== userId) return HttpStatus.FORBIDDEN;

        const iscCommentUpdated: boolean = await this.commentCommandRepository.updateById(commentId, dto);
        return iscCommentUpdated ? HttpStatus.NO_CONTENT : HttpStatus.NOT_FOUND;
    }

    async delete(commentId: string, userId: string): Promise<HttpStatus> {
        const commentById: Nullable<ICommentModel> = await this.commentQueryRepository.findById(commentId);
        if (!commentById) return HttpStatus.NOT_FOUND;

        if (commentById.userId !== userId) return HttpStatus.FORBIDDEN;

        const iscCommentUpdated: boolean = await this.commentCommandRepository.deleteById(commentId);
        return iscCommentUpdated ? HttpStatus.NO_CONTENT : HttpStatus.NOT_FOUND;
    }
}
