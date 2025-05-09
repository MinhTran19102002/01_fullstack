import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { TransformTimezoneInterceptor } from './interceptors/transform-timezone.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const configService = app.get(ConfigService);
  const port = configService.get('PORT');
  // app.useGlobalInterceptors(new TransformTimezoneInterceptor());

  app.setGlobalPrefix('api/v1', { exclude: [''] });
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true
  }),);
  await app.listen(port);
}
bootstrap();
