import { Controller, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { TestRepository } from './test.repository';

@Controller('testing')
export class TestController {
    constructor(private readonly testRepository: TestRepository) {}
    @Delete('/all-data')
    @HttpCode(HttpStatus.NO_CONTENT)
    async clearDB(): Promise<void> {
        // console.log('clearDB');
        // await clearMongoCollections();
        await this.testRepository.clearMongoCollections();
    }
}
