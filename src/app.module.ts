import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { UserRepository } from './user/user.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Cat, CatSchema } from './cats/cat.schema';
import { CatsRepository } from './cats/cat.repository';
import { User, UserSchema } from './user/user.schema';

@Module({
    imports: [
        MongooseModule.forRoot('mongodb://localhost:27017/train_project_be_local_nest'),
        MongooseModule.forFeature([
            { name: Cat.name, schema: CatSchema },
            { name: User.name, schema: UserSchema },
        ]),
    ],
    controllers: [AppController, UserController],
    providers: [AppService, UserService, UserRepository, CatsRepository],
})
export class AppModule {}
