import { BadRequestException, Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { RegistrationUserDto, UserPaginationQuery } from './interfeces/input';
import { UserQueryRepository } from './repositories/user.query.repository';
import { createFilterGetAllUsersMapper, userMapper } from './user.mapper';
import { IUser, IUserPaginationOut } from './interfeces/output';
import { Nullable } from '../common/interfaces/optional.types';
import { UserDocument } from './user.schema';

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
        if (!newUser) throw new BadRequestException('User could not be created');
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
