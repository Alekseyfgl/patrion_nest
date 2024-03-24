import { Module } from '@nestjs/common';
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
import { CookieModule } from './common/services/cookie/cookie.module';

@Module({
    imports: [
        MongooseModule.forRoot('mongodb://localhost:27017/train_project_be_local_nest'),
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
        ]),
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '60s' },
        }),
        CookieModule,
    ],
    controllers: [UserController, BlogController, PostController, CommentController, AuthController, TestController],
    providers: [
        //exeption
        ExceptionsService,
        // services
        AuthService,
        UserService,
        BlogService,
        PostService,
        CommentService,
        LoggerService,
        // Repositories
        BlogCommandRepository,
        BlogQueryRepository,
        UserQueryRepository,
        UserCommandRepository,
        PostCommandRepository,
        PostQueryRepository,
        CommentQueryRepository,
        CommentCommandRepository,
        TestRepository,
        //   strategies
        LocalStrategy,
        JwtStrategy,
        HttpBasicStrategy,
    ],
    // exports: [ExceptionsService],
})
export class AppModule {}
