import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { UserController } from './features/user/user.controller';
import { UserService } from './features/user/user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './features/user/user.schema';
import { UserQueryRepository } from './features/user/repositories/user.query.repository';
import { UserCommandRepository } from './features/user/repositories/user.command.repository';
import { ConfigModule } from '@nestjs/config';
import { TestController } from './features/test-service/test.controller';
import { TestRepository } from './features/test-service/test.repository';
import { Blog, BlogSchema } from './features/blog/blog.schema';
import { BlogService } from './features/blog/blog.service';
import { BlogController } from './features/blog/blog.controller';
import { BlogCommandRepository } from './features/blog/repositories/blog.command.repository';
import { BlogQueryRepository } from './features/blog/repositories/blog.query.repository';
import { Post, PostSchema } from './features/post/post.schema';
import { PostCommandRepository } from './features/post/repositories/post.command.repository';
import { PostQueryRepository } from './features/post/repositories/post.query.repository';
import { PostService } from './features/post/post.service';
import { PostController } from './features/post/post.controller';
import { Comment, CommentSchema } from './features/comment/comment.schema';
import { CommentQueryRepository } from './features/comment/repositories/comment.query.repository';
import { CommentCommandRepository } from './features/comment/repositories/comment.command.repository';
import { CommentService } from './features/comment/comment.service';
import { CommentController } from './features/comment/comment.controller';

import { JwtModule } from '@nestjs/jwt';

import { LoggerService } from './common/services/logger/logger.service';
import { ExceptionsService } from './common/http-exceptions-service/exeption.service';
import { ConfirmationUser, ConfirmationUserSchema } from './features/confirmation-user/confirmation-user.schema';
import { jwtConstants } from './features/auth/const/auth.const';
import { AuthController } from './features/auth/auth.controller';
import { AuthService } from './features/auth/auth.service';
import { LocalStrategy } from './features/auth/strategies/local.strategy';
import { JwtStrategy } from './features/auth/strategies/jwt.strategy';
import { HttpBasicStrategy } from './features/auth/strategies/basic.strategy';
import { ConfUserCommandRepository } from './features/confirmation-user/repositories/conf-user.command.repository';
import { ConfUserQueryRepository } from './features/confirmation-user/repositories/conf-user.query.repository';
import { UserAgentMiddleware } from './common/middlewares/set-agent/set-agent.middleware';
import { CookieService } from './common/services/cookie/cookie.service';
import { SetIpMiddleware } from './common/middlewares/set-ip/set-ip.middleware';
import { RateLimit, RateLimitSchema } from './features/rate-limit/rate-limit.schema';
import * as process from 'process';

@Module({
    imports: [
        MongooseModule.forRoot(process.env.MONGO_LOCAL!),
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '../.env',
        }),
        MongooseModule.forFeature([
            { name: User.name, schema: UserSchema },
            { name: Blog.name, schema: BlogSchema },
            { name: Post.name, schema: PostSchema },
            { name: Comment.name, schema: CommentSchema },
            { name: ConfirmationUser.name, schema: ConfirmationUserSchema },
            { name: RateLimit.name, schema: RateLimitSchema },
        ]),
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '60s' },
        }),
    ],
    controllers: [UserController, BlogController, PostController, CommentController, AuthController, TestController],
    providers: [
        //exeption
        ExceptionsService,
        //common services
        LoggerService,
        CookieService,
        // services
        AuthService,
        UserService,
        BlogService,
        PostService,
        CommentService,
        // Repositories
        BlogCommandRepository,
        BlogQueryRepository,
        UserQueryRepository,
        UserCommandRepository,
        PostCommandRepository,
        PostQueryRepository,
        CommentQueryRepository,
        CommentCommandRepository,
        ConfUserCommandRepository,
        ConfUserQueryRepository,
        TestRepository,
        //   strategies
        LocalStrategy,
        JwtStrategy,
        HttpBasicStrategy,
    ],
    // exports: [ExceptionsService],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(UserAgentMiddleware, SetIpMiddleware)
            .exclude(
                { path: 'static/*', method: RequestMethod.GET }, // Исключить статические файлы
                // ... (возможно другие пути для исключения)
            )
            .forRoutes(
                { path: 'api/*', method: RequestMethod.ALL }, // Применить ко всем маршрутам
            );
    }
}
