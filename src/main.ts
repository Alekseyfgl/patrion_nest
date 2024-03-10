import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/exception-filter/custom-exception-filter';
import ip from 'ip';
import configDotenv from 'dotenv';
import * as process from 'process';

configDotenv.config();
async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    // Регистрация глобального фильтра исключений
    app.useGlobalFilters(new HttpExceptionFilter());

    // Настройка глобального ValidationPipe
    app.useGlobalPipes(
        new ValidationPipe({
            stopAtFirstError: false,
            exceptionFactory: (errors) => {
                const errorMessages = errors.map((e) => ({
                    field: e.property,
                    message: Object.values(e.constraints as any)[0], // Берем первое сообщение об ошибке
                }));
                throw new BadRequestException(errorMessages);
            },
        }),
    );

    await app.listen(process.env.SERVER_PORT!);
    console.log(`Server run on ${ip.address()}:${process.env.SERVER_PORT}`);
}
bootstrap();
