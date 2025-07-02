import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // Damit Frontend auf anderem Port zugreifen kann
  await app.listen(3000);
}
bootstrap();
