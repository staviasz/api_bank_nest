import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaNotFoundExceptionFilter } from './exception-filters/prisma-not-found-exception-filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new PrismaNotFoundExceptionFilter());

  await app.listen(3000);
}
bootstrap();
