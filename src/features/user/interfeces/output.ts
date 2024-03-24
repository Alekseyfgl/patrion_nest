import { Nullable } from '../../../common/interfaces/optional.types';

export interface IUser {
    id: string;
    login: string;
    email: string;
    createdAt: string;
}
export interface UserWithConfirm extends IUser {
    confirmInfo: {
        id: string;
        isConfirmed: boolean;
        userId: string;
        code: Nullable<string>;
    };
}

export interface IUserPaginationOut {
    pagesCount: number;
    page: number;
    pageSize: number;
    totalCount: number;
    items: IUser[];
}
