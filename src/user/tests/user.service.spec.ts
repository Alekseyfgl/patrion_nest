import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../user.service';
import { UserCommandRepository } from '../repositories/user.command.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { User, UserDocument, UserSchema } from '../user.schema';
import { RegistrationUserDto, UserPaginationQuery } from '../interfeces/input';
import { Nullable } from '../../common/interfaces/optional.types';
import { ConfigService } from '@nestjs/config';
import { UserQueryRepository } from '../repositories/user.query.repository';
import { IUserPaginationOut } from '../interfeces/output';
import { SORT_DIRECTION } from '../../common/constans/sort-directions.const';

describe('UserService', () => {
    let service: UserService;
    let queryRepository: UserQueryRepository;
    let mongod: MongoMemoryServer;

    beforeAll(async () => {
        mongod = await MongoMemoryServer.create();
        const uri = mongod.getUri();

        const module: TestingModule = await Test.createTestingModule({
            imports: [MongooseModule.forRoot(uri), MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
            providers: [
                UserService,
                UserCommandRepository,
                UserQueryRepository,
                {
                    provide: ConfigService,
                    // Если вам нужен реальный ConfigService, используйте его реальный экземпляр
                    // Если же достаточно мока, то предоставьте мок-объект
                    useValue: {
                        get: jest.fn((key) => {
                            if (key === 'SALT_ROUNDS') {
                                return 10; // Пример значения, которое может быть необходимо для тестов
                            }
                            return null;
                        }),
                    },
                },
            ],
        }).compile();

        service = module.get<UserService>(UserService);
        queryRepository = module.get<UserQueryRepository>(UserQueryRepository); // Получить экземпляр UserQueryRepository
    });

    afterAll(async () => {
        await mongod.stop();
    });

    it('should be defined', () => {
        expect(service).toBeTruthy();
        expect(queryRepository).toBeTruthy();
    });

    it('should create a new user', async () => {
        const userDto: RegistrationUserDto = {
            email: 'alex1@gmail.com',
            login: 'alex1',
            password: '123456789',
        };

        const user: Nullable<UserDocument> = await service.create(userDto);

        expect(user).toBeTruthy();
        expect(user!.id).toBeTruthy();
        expect(user!.email).toBe(userDto.email);
        // Добавьте другие проверки в зависимости от полей, которые вы ожидаете получить
    });

    describe('findAll', () => {
        it('should return 1 item in array, if it is exist', async () => {
            const query: UserPaginationQuery = {
                pageSize: 10,
                pageNumber: 1,
                sortDirection: SORT_DIRECTION.ASC,
                sortBy: 'email',
                searchEmailTerm: '',
                searchLoginTerm: '',
            };
            const result: IUserPaginationOut = await queryRepository.findAll(query);

            expect(result.items.length).toBe(1);
            expect(result.totalCount).toEqual(1);
            expect(result.pagesCount).toBe(1);
        });
    });
});
