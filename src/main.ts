import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/exception-filter/custom-exception-filter';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // Регистрация глобального фильтра исключений
    app.useGlobalFilters(new HttpExceptionFilter());

    // Настройка глобального ValidationPipe
    app.useGlobalPipes(
        new ValidationPipe({
            stopAtFirstError: true,
            exceptionFactory: (errors) => {
                const errorMessages = errors.map((error) => {
                    return {
                        field: error.property,
                        message: Object.values(error.constraints as any)[0], // Берем первое сообщение об ошибке
                    };
                });
                throw new BadRequestException(errorMessages);
            },
        }),
    );

    app.enableCors();
    await app.listen(3001);
}
bootstrap();
