// export const userMapper = (user: UserSchema): IUser => {
//     return {
//         id: user._id.toHexString(),
//         email: user.email,
//         login: user.login,
//         createdAt: user.createdAt,
//     };
// };
// export const userWithPasswordMapper = (user: UserSchema, confStatus: ConfirmationUserSchema) => {
//     return {
//         id: user._id.toHexString(),
//         email: user.email,
//         login: user.login,
//         password: user.password,
//         createdAt: user.createdAt,
//         confInfo: {
//             id: confStatus._id.toString(),
//             isConfirmed: confStatus.isConfirmed,
//             code: confStatus.code,
//         },
//     };
// };
//
import { UserDocument } from './user.schema';
import { IUser, IUserPaginationOut } from './interfeces/output';

export const pageUsersMapper = (data: { totalCount: number; pagesCount: number; pageSize: number; pageNumber: number; users: UserDocument[] }): IUserPaginationOut => {
    const { pageSize, pageNumber, pagesCount, totalCount, users } = data;
    return {
        pagesCount,
        page: pageNumber,
        pageSize,
        totalCount,
        items: users.map((user) => ({ id: user._id.toString(), email: user.email, login: user.login, createdAt: user.createdAt.toISOString() })),
    };
};

// export const userWithConf = (user: IUser, confInfo: ConfirmationUserSchema): UserWithConfirm => {
//     return {
//         id: user.id,
//         email: user.email,
//         login: user.login,
//         createdAt: user.createdAt,
//         confirmInfo: {
//             id: confInfo._id.toString(),
//             isConfirmed: confInfo.isConfirmed,
//             code: confInfo.code,
//             userId: confInfo.userId.toString(),
//         },
//     };
// };
//
// export const userWithoutConf = (user: UserWithConfirm): IUser => {
//     return {
//         id: user.id,
//         email: user.email,
//         login: user.login,
//         createdAt: user.createdAt,
//     };
// };

export const userMapper = (user: UserDocument): IUser => {
    return {
        id: user.id,
        email: user.email,
        login: user.login,
        createdAt: user.createdAt.toISOString(),
    };
};
