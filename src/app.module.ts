import { Module } from '@nestjs/common';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Cat, CatSchema } from './cats/cat.schema';
import { CatsRepository } from './cats/cat.repository';
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

@Module({
    imports: [
        MongooseModule.forRoot('mongodb://localhost:27017/train_project_be_local_nest'),
        ConfigModule.forRoot({
            isGlobal: true, // делает переменные окружения доступными глобально
            envFilePath: '../.env', // путь к вашему файлу .env
        }),
        MongooseModule.forFeature([
            { name: Cat.name, schema: CatSchema },
            { name: User.name, schema: UserSchema },
            { name: Blog.name, schema: BlogSchema },
        ]),
    ],
    controllers: [UserController, BlogController, TestController],
    providers: [UserService, BlogService, BlogCommandRepository, BlogQueryRepository, UserQueryRepository, UserCommandRepository, CatsRepository, TestRepository],
})
export class AppModule {}
