import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { RegistrationUserDto, UserPaginationQuery } from './interfeces/input';
import { UserQueryRepository } from './repositories/user.query.repository';
import { createFilterGetAllUsersMapper, userMapper } from './user.mapper';
import { IUser, IUserPaginationOut } from './interfeces/output';
import { Nullable } from '../common/interfaces/optional.types';
import { UserDocument } from './user.schema';
import { CustomBadReqException } from '../common/exceptions/not-found.excep';
import { HttpExceptionMessages } from '../common/constans/http-exception-messages';

@Controller('users')
export class UserController {
    constructor(
        private readonly userService: UserService,
        private readonly userQueryRepository: UserQueryRepository,
    ) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async createUser(@Body() dto: RegistrationUserDto): Promise<IUser> {
        const newUser: Nullable<UserDocument> = await this.userService.create(dto);
        if (!newUser) throw new CustomBadReqException(HttpStatus.BAD_REQUEST, HttpExceptionMessages.BAD_REQUEST);
        return userMapper(newUser);
    }

    @Get()
    async getAll(@Query() inputQuery: UserPaginationQuery): Promise<IUserPaginationOut> {
        const query: UserPaginationQuery = createFilterGetAllUsersMapper(inputQuery);
        return this.userQueryRepository.findAll(query);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async delete(@Param('id') userId: string): Promise<void> {
        await this.userService.removeById(userId);
    }
}
