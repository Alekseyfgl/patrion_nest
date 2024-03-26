import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';

import ip from 'ip';
import configDotenv from 'dotenv';
import * as process from 'process';
import { LoggerService } from './common/services/logger/logger.service';
import { AllExceptionFilter } from './common/exception-filter/custom-exception-filter';
import cookieParser from 'cookie-parser';
import { NestExpressApplication } from '@nestjs/platform-express';

configDotenv.config();
async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    app.setGlobalPrefix('api');
    // app.use('/static', express.static('public'));
    // app.set('trust proxy', true);
    app.enableCors();
    app.use(cookieParser());

    // Настройка глобального ValidationPipe
    app.useGlobalPipes(
        new ValidationPipe({
            stopAtFirstError: false,
            whitelist: true,
            transform: true,
            forbidNonWhitelisted: true,
            exceptionFactory: (errors) => {
                const errorMessages = errors.map((e) => ({
                    field: e.property,
                    message: Object.values(e.constraints!)[0], // Берем первое сообщение об ошибке
                }));
                throw new BadRequestException(errorMessages);
            },
        }),
    );

    const logger = new LoggerService();
    app.useLogger(logger);

    //exception filters
    // app.useGlobalFilters(new HttpExceptionFilter(logger));
    app.useGlobalFilters(new AllExceptionFilter(logger));

    await app.listen(process.env.SERVER_PORT!);
    logger.log('Main', `Server run on ${ip.address()}:${process.env.SERVER_PORT}, MODE:${process.env.NODE_ENV}`);
}
bootstrap();
