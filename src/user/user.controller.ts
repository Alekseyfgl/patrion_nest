import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Query, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { RegistrationUserDto, UserPaginationQuery } from './interfeces/input';
import { UserQueryRepository } from './repositories/user.query.repository';
import { userMapper } from './user.mapper';
import { IUser, IUserPaginationOut } from './interfeces/output';
import { Nullable } from '../common/interfaces/optional.types';
import { UserDocument } from './user.schema';
import { BasicAuthGuard } from '../auth/guards/password-js/basic-auth.guard';
import { ExceptionsService } from '../common/http-exceptions-service/exeption.service';

// @UseGuards(AuthGuard)
@Controller('users')
export class UserController {
    constructor(
        private readonly userService: UserService,
        private readonly userQueryRepository: UserQueryRepository,
        protected exceptionsService: ExceptionsService,
    ) {}

    @UseGuards(BasicAuthGuard)
    @Post()
    @HttpCode(HttpStatus.CREATED)
    async createUser(@Body() dto: RegistrationUserDto): Promise<IUser> {
        const newUser: Nullable<UserDocument> = await this.userService.create(dto);

        if (!newUser) throw this.exceptionsService.internalServerErrorException();
        return userMapper(newUser);
    }

    @Get()
    async getAll(@Query() inputQuery: UserPaginationQuery): Promise<IUserPaginationOut> {
        return this.userQueryRepository.findAll(inputQuery);
    }

    @UseGuards(BasicAuthGuard)
    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async delete(@Param('id') userId: string): Promise<boolean> {
        return this.userService.removeById(userId);
    }
}
