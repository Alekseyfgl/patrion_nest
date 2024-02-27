import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { RegistrationUserDto } from './interfeces/input';

@Controller('users')
export class UserController {
    constructor(protected userService: UserService) {}
    // @Get()
    // getUsers() {
    //   return this.userService.findUser('1');
    // }

    @Post()
    async createUser(@Body() dto: RegistrationUserDto) {
        const result = await this.userService.create(dto);
        return true;
    }
}
