import { Types } from 'mongoose';
import { IUser } from '../../user/interfeces/output';

export interface CommentSchema extends Document {
    _id: Types.ObjectId;
    postId: Types.ObjectId;
    userId: Types.ObjectId;
    content: string;
    createdAt: string;
}

export interface ICommentModel {
    id: string;
    postId: string;
    userId: string;
    content: string;
    createdAt: string;
}

export interface IComment {
    id: string;
    content: string;
    commentatorInfo: {
        userId: string;
        userLogin: string;
    };
    createdAt: string;
}

export interface ICommentWithAuthorDB extends CommentSchema {
    user: IUser;
}

export interface ICommentPaginationOut {
    pagesCount: number;
    page: number;
    pageSize: number;
    totalCount: number;
    items: IComment[];
}
