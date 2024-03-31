import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { LoggerService } from './common/services/logger/logger.service';
import { AllExceptionFilter } from './common/exception-filter/custom-exception-filter';
import cookieParser from 'cookie-parser';
import { NestExpressApplication } from '@nestjs/platform-express';
import { EnvConfigService } from './common/services/env-config/env.config.service';
import ip from 'ip';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    app.setGlobalPrefix('api');
    // app.use('/static', express.static('public'));
    app.set('trust proxy', true);
    app.enableCors();
    app.use(cookieParser());

    // setting ValidationPipe
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

    //logger
    const logger = new LoggerService();
    app.useLogger(logger);

    app.useGlobalFilters(new AllExceptionFilter(logger));

    //env
    const envConfigService: EnvConfigService = app.get(EnvConfigService);
    const port: string = envConfigService.getServerPort();
    const host: string = envConfigService.getServerHost();
    const nodeEnv: string = envConfigService.getNodeEnv();

    // listen app
    await app.listen(port);
    logger.log(`Server run on ${host}:${port}, MODE:${nodeEnv}`);
    logger.log(`IP:${ip.address()}`);
}
bootstrap();
