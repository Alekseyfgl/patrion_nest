import mongoose from 'mongoose';

export async function clearMongoCollections() {
    // Проверяем, что соединение с базой данных установлено
    if (mongoose.connection.readyState !== 1) {
        console.log('Нет подключения к базе данных, ожидание подключения...');
        await new Promise((resolve) => mongoose.connection.once('connected', resolve));
    }

    const collections = Object.keys(mongoose.connection.collections);
    console.log('Коллекции:', collections);

    for (const collectionName of collections) {
        const collection = mongoose.connection.collections[collectionName];
        try {
            // Удаление всех документов из коллекции
            await collection.deleteMany({});
            console.log(`Коллекция ${collectionName} очищена.`);
        } catch (err) {
            // Если возникла ошибка, выводим её в консоль
            console.error(`Ошибка при очистке коллекции ${collectionName}:`, err.message);
        }
    }
}
