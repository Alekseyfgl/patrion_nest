import { Module } from '@nestjs/common';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user/user.schema';
import { UserQueryRepository } from './user/repositories/user.query.repository';
import { UserCommandRepository } from './user/repositories/user.command.repository';
import { ConfigModule } from '@nestjs/config';
import { TestController } from './test/test.controller';
import { TestRepository } from './test/test.repository';
import { Blog, BlogSchema } from './blog/blog.schema';
import { BlogService } from './blog/blog.service';
import { BlogController } from './blog/blog.controller';
import { BlogCommandRepository } from './blog/repositories/blog.command.repository';
import { BlogQueryRepository } from './blog/repositories/blog.query.repository';
import { Post, PostSchema } from './post/post.schema';
import { PostCommandRepository } from './post/repositories/post.command.repository';
import { PostQueryRepository } from './post/repositories/post.query.repository';
import { PostService } from './post/post.service';
import { PostController } from './post/post.controller';
import { Comment, CommentSchema } from './comment/comment.schema';
import { CommentQueryRepository } from './comment/repositories/comment.query.repository';
import { CommentCommandRepository } from './comment/repositories/comment.command.repository';
import { CommentService } from './comment/comment.service';
import { CommentController } from './comment/comment.controller';
import { AuthService } from './auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './auth/const/auth.const';
import { LocalStrategy } from './auth/strategies/local.strategy';
import { JwtStrategy } from './auth/strategies/jwt.strategy';
import { AuthController } from './auth/auth.controller';
import { HttpBasicStrategy } from './auth/strategies/basic.strategy';
import { LoggerService } from './common/logger/logger.service';
import { ExceptionsService } from './common/http-exceptions-service/exeption.service';

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
    exports: [ExceptionsService],
})
export class AppModule {}
