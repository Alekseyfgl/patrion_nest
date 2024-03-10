import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Comment, CommentDocument, CommentModelType } from '../comment.schema';
import { Types } from 'mongoose';
import { Nullable, PromiseNull } from '../../common/interfaces/optional.types';
import { IComment, ICommentModel, ICommentPaginationOut, ICommentWithAuthorDB } from '../interfaces/output';
import { clearCommentMapper, commentMapper, getAllCommentByIdPagination } from '../comment.mapper';
import { IUser } from '../../user/interfeces/output';
import { UserQueryRepository } from '../../user/repositories/user.query.repository';
import { CommentsByPostQuery } from '../interfaces/input';
import { offsetPagination } from '../../common/utils/offset-for-pagination/offset-for-pagination';
import { countTotalPages } from '../../common/utils/count-total-pages/count-total-pages';

@Injectable()
export class CommentQueryRepository {
    constructor(
        @InjectModel(Comment.name)
        protected CommentModel: CommentModelType,
        protected userQueryRepository: UserQueryRepository,
    ) {}

    async findById(commentId: string): PromiseNull<ICommentModel> {
        try {
            const comment: Nullable<CommentDocument> = await this.CommentModel.findById(commentId);
            if (!comment) return null;
            return clearCommentMapper(comment);
        } catch (e) {
            console.log('[findById]', e);
            return null;
        }
    }

    async getCommentByIdWithAuthor(commentId: string): PromiseNull<IComment> {
        const comment: Nullable<ICommentModel> = await this.findById(commentId);
        if (!comment) return null;
        const author: Nullable<IUser> = await this.userQueryRepository.findById(comment.userId);
        if (!author) return null;
        return commentMapper(comment, author);
    }

    async getAllCommentsByPostId(postId: string, query: CommentsByPostQuery): PromiseNull<ICommentPaginationOut> {
        const { pageSize, pageNumber, sortDirection, sortBy } = query;
        const direction = sortDirection === 'desc' ? -1 : 1;

        try {
            const comments: ICommentWithAuthorDB[] = await this.CommentModel.aggregate([
                { $match: { postId: new Types.ObjectId(postId) } }, // Фильтруем комментарии по postId
                {
                    $lookup: {
                        from: 'users', // Название коллекции пользователей
                        localField: 'userId', // Поле в коллекции комментариев
                        foreignField: '_id', // Поле в коллекции пользователей
                        as: 'user', // Название нового поля, содержащего найденных пользователей
                    },
                },
                { $addFields: { user: { $first: '$user' } } }, // Преобразуем массив user в объект
                {
                    $match: {
                        'user._id': { $exists: true }, // Исключаем комментарии, где пользователь не найден
                    },
                },
                { $sort: { [sortBy]: direction } }, // Сортируем результаты
                { $skip: offsetPagination(pageNumber, pageSize) }, // Пропускаем комментарии для пагинации
                { $limit: pageSize }, // Ограничиваем количество комментариев
            ]);

            if (comments.length === 0) return null;

            const totalCount: number = await this.CommentModel.countDocuments({ postId: postId });
            const pagesCount: number = countTotalPages(totalCount, pageSize);

            return getAllCommentByIdPagination({ pageNumber, pageSize, items: comments, pagesCount, totalCount });
        } catch (e) {
            console.log('[getAllCommentsByPostId]', e);
            return null;
        }
    }
}
