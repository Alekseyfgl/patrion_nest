import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument, UserModelType } from '../user.schema';
import { IUser, IUserPaginationOut } from '../interfeces/output';
import { offsetPagination } from '../../../common/utils/offset-for-pagination/offset-for-pagination';
import { countTotalPages } from '../../../common/utils/count-total-pages/count-total-pages';
import { pageUsersMapper, userMapper } from '../user.mapper';
import { UserPaginationQuery } from '../interfeces/input';
import { Nullable, PromiseNull } from '../../../common/interfaces/optional.types';

@Injectable()
export class UserQueryRepository {
    constructor(
        @InjectModel(User.name)
        private readonly UserModel: UserModelType,
    ) {}

    async findAll(query: UserPaginationQuery): Promise<IUserPaginationOut> {
        const { pageSize, pageNumber, sortDirection, sortBy, searchEmailTerm, searchLoginTerm } = query;

        const filter: { $or?: { email?: { $regex: RegExp }; login?: { $regex: RegExp } }[] } = {};

        if (searchEmailTerm || searchLoginTerm) {
            filter.$or = [];
            if (searchEmailTerm) {
                const filterByEmail: { email: { $regex: RegExp } } = { email: { $regex: new RegExp(searchEmailTerm, 'i') } };
                filter.$or.push(filterByEmail);
            }
            if (searchLoginTerm) {
                const filterByLogin: { login: { $regex: RegExp } } = { login: { $regex: new RegExp(searchLoginTerm, 'i') } };
                filter.$or.push(filterByLogin);
            }
        }
        const direction: 1 | -1 = sortDirection === 'desc' ? -1 : 1;

        try {
            const users: UserDocument[] = await this.UserModel.find(filter)
                .sort({ [sortBy]: direction })
                .skip(offsetPagination(pageNumber, pageSize))
                .limit(pageSize);

            const totalCount: number = await this.UserModel.countDocuments(filter);
            const pagesCount: number = countTotalPages(totalCount, pageSize);
            return pageUsersMapper({ users, pagesCount, totalCount, pageSize, pageNumber });
        } catch (e) {
            console.error('[findAll]', e);
            return pageUsersMapper({ users: [], pagesCount: 0, totalCount: 0, pageSize, pageNumber });
        }
    }

    async findById(id: string): PromiseNull<IUser> {
        try {
            const user: Nullable<UserDocument> = await this.UserModel.findById(id);
            if (!user) return null;
            return userMapper(user);
        } catch (e) {
            console.error('[user,findById]', e);
            return null;
        }
    }

    // async findByLoginOrEmail(loginOrEmail: string): PromiseNull<ReturnType<typeof userWithPasswordMapper>> {
    async findByLoginOrEmail(loginOrEmail: string): PromiseNull<UserDocument> {
        try {
            const condition: RegExp = new RegExp('^' + loginOrEmail + '$', 'i');

            const user: Nullable<UserDocument> = await this.UserModel.findOne({ $or: [{ login: condition }, { email: condition }] });
            if (!user) return null;
            return user;
            // const confirmationStatus = await QueryConfirmationUserRepository.findConfStatusByUserId(user._id.toString());
            // if (!confirmationStatus) return null;

            // return userWithPasswordMapper(user, confirmationStatus);
        } catch (e) {
            console.error('[user,findByLoginOrEmail]', e);
            return null;
        }
    }

    // async findMe(userId: string): PromiseNull<IMe> {
    //     try {
    //         const user: Nullable<UserSchema> = await UserModel.findById(userId);
    //         if (!user) return null;
    //         return meMapper(user);
    //     } catch (e) {
    //         console.error('[user,findMe]', e);
    //         return null;
    //     }
    // }
}
