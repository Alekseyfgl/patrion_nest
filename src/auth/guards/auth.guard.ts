import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { UserService } from '../../user/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly userService: UserService) {}
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request: Request = context.switchToHttp().getRequest();

        console.log(request.headers.authorization);

        // throw new UnauthorizedException();

        return true;
    }
}
