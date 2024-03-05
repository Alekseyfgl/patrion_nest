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
        ]),
    ],
    controllers: [UserController, BlogController, PostController, TestController],
    providers: [
        UserService,
        BlogService,
        PostService,
        BlogCommandRepository,
        BlogQueryRepository,
        UserQueryRepository,
        UserCommandRepository,
        PostCommandRepository,
        PostQueryRepository,
        TestRepository,
    ],
})
export class AppModule {}
