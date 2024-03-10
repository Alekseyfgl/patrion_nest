import { IComment, ICommentModel, ICommentPaginationOut, ICommentWithAuthorDB } from './interfaces/output';
import { IUser } from '../user/interfeces/output';
import { CommentDocument } from './comment.schema';

export const clearCommentMapper = (comment: CommentDocument): ICommentModel => {
    return {
        id: comment._id.toString(),
        userId: comment.userId.toString(),
        postId: comment.postId.toString(),
        content: comment.content,
        createdAt: comment.createdAt.toISOString(),
    };
};

export const commentMapper = (comment: ICommentModel, user: IUser): IComment => {
    return {
        id: comment.id,
        content: comment.content,
        commentatorInfo: {
            userId: user.id,
            userLogin: user.login,
        },
        createdAt: comment.createdAt,
    };
};

export const getAllCommentByIdPagination = (data: {
    totalCount: number;
    pagesCount: number;
    pageSize: number;
    pageNumber: number;
    items: ICommentWithAuthorDB[];
}): ICommentPaginationOut => {
    const { pageSize, pageNumber, pagesCount, totalCount, items } = data;
    return {
        pagesCount,
        page: pageNumber,
        pageSize,
        totalCount,
        items: items.map((comment: ICommentWithAuthorDB) => {
            return {
                id: comment._id.toString(),
                content: comment.content,
                createdAt: comment.createdAt,
                commentatorInfo: {
                    userId: comment.user.id.toString(),
                    userLogin: comment.user.login,
                },
            };
        }),
    };
};
