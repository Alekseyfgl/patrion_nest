import { Module } from '@nestjs/common';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Cat, CatSchema } from './cats/cat.schema';
import { CatsRepository } from './cats/cat.repository';
import { User, UserSchema } from './user/user.schema';
import { UserQueryRepository } from './user/repository/user.query.repository';
import { UserCommandRepository } from './user/repository/user.command.repository';

@Module({
    imports: [
        MongooseModule.forRoot('mongodb://localhost:27017/train_project_be_local_nest'),
        MongooseModule.forFeature([
            { name: Cat.name, schema: CatSchema },
            { name: User.name, schema: UserSchema },
        ]),
    ],
    controllers: [UserController],
    providers: [UserService, UserQueryRepository, UserCommandRepository, CatsRepository],
})
export class AppModule {}
