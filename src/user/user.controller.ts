import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { RegistrationUserDto, UserPaginationQuery } from './interfeces/input';
import { UserQueryRepository } from './repository/user.query.repository';
import { createFilterGetAllUsersMapper } from './user.mapper';
import { IUserPaginationOut } from './interfeces/output';

@Controller('users')
export class UserController {
    constructor(
        private readonly userService: UserService,
        private readonly userQueryRepository: UserQueryRepository,
    ) {}

    @Post()
    async createUser(@Body() dto: RegistrationUserDto) {
        return this.userService.create(dto);
    }

    @Get()
    async getAll(@Query() inputQuery: UserPaginationQuery): Promise<IUserPaginationOut> {
        const query: UserPaginationQuery = createFilterGetAllUsersMapper(inputQuery);
        return this.userQueryRepository.findAll(query);
    }
}
