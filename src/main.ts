import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { MocksInterceptor } from './core/interceptors/mock.interceptor';
import { KongService } from './core/kong/kong.service';
import { Mocks } from 'mocksubsi';
import * as dotenv from 'dotenv';

dotenv.config();

const DEFAULT_HTTP_PORT = '8400';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  // Custom SWAGGER
  const config = new DocumentBuilder()
    .setTitle('UBSI Swagger')
    .setDescription('UBSI API description')
    .setVersion('0.1')
    .addTag('UBSI')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.enableCors({
    origin: '*',
    allowedHeaders: '*',
  });

  //Mock Interceptors
  if (process.env.NODE_ENV === 'dev') {
    // 9954 is Mocks server port
    const mocks: Mocks = new Mocks('9954');
    await mocks.LaunchMocks(null);
    app.useGlobalInterceptors(new MocksInterceptor(mocks.getPort));
  }

  await app.listen(DEFAULT_HTTP_PORT);

  if (!(process.env.NODE_ENV === 'dev')) {
    const kongService: KongService = app.get(KongService);
    const server = app.getHttpServer();
    const routes = kongService.getRoutes(server);
    kongService.registerKongService(routes);
  }
}
bootstrap();
