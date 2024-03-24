import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Injectable()
export class TestRepository {
    constructor(@InjectConnection() private readonly connection: Connection) {}

    async clearMongoCollections() {
        const collections = Object.keys(this.connection.collections);
        for (const collectionName of collections) {
            const collection = this.connection.collections[collectionName];
            try {
                await collection.deleteMany({});
                console.log(`Коллекция ${collectionName} очищена.`);
            } catch (error) {
                console.error(`Ошибка при очистке коллекции ${collectionName}:`, error.message);
            }
        }
    }
}
