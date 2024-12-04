import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationError } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
      stopAtFirstError: true,
      disableErrorMessages: true,
      exceptionFactory: (errors: ValidationError[]) => {
        console.log(errors);
        throw new BadRequestException({ errors: errors });
      },
    }),
  );
  app.enableCors({
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,POST',
    credentials: true,
  });
  await app.listen(3000);
  console.log('Backend is running on http://localhost:3000/');
}

bootstrap();
