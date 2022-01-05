import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

dotenv.config();

const DEFAULT_HTTP_PORT = '80';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  
  app.enableCors({
    origin: '*',
    allowedHeaders: '*',
  });

  app.useGlobalPipes(new ValidationPipe({
    transform: true
  }));
  const config = app.get(ConfigService);
  await app.listen(config.get('PORT') || DEFAULT_HTTP_PORT);
}
bootstrap();
