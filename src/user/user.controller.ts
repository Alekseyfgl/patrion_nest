import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Query, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { RegistrationUserDto, UserPaginationQueryDto } from './interfeces/input';
import { UserQueryRepository } from './repositories/user.query.repository';
import { userMapper } from './user.mapper';
import { IUser, IUserPaginationOut } from './interfeces/output';
import { Nullable } from '../common/interfaces/optional.types';
import { UserDocument } from './user.schema';
import { HttpExceptionMessagesConst } from '../common/constans/http-exception-messages.const';
import { CustomBadReqException } from '../common/http-exceptions/custom-http-exeption';
import { AuthGuard } from '../auth/auth.guard';

@UseGuards(AuthGuard)
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
        if (!newUser) throw new CustomBadReqException(HttpStatus.BAD_REQUEST, HttpExceptionMessagesConst.BAD_REQUEST);
        return userMapper(newUser);
    }

    @Get()
    async getAll(@Query() inputQuery: UserPaginationQueryDto): Promise<IUserPaginationOut> {
        console.log(inputQuery);
        return this.userQueryRepository.findAll(inputQuery);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async delete(@Param('id') userId: string): Promise<void> {
        await this.userService.removeById(userId);
    }
}
