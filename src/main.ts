import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'development';
  process.env.PORT = '5000';
  process.env.FRONTEND_URL = 'http://localhost:3000';
  process.env.CORS_ORIGINS = 'http://localhost:3000,http://127.0.0.1:3000';
  process.env.LOG_LEVEL = 'debug';
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap');

  const isDevelopment = process.env.NODE_ENV !== 'production';
  const port = process.env.PORT || 5000;
  const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
  const corsOrigins = process.env.CORS_ORIGINS?.split(',') || ['http://localhost:3000'];

  app.enableCors({
    origin: corsOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    credentials: true,
  });

  app.setGlobalPrefix('api');

  if (!isDevelopment) {
    app.use((req, res, next) => {
      res.header('X-Content-Type-Options', 'nosniff');
      res.header('X-Frame-Options', 'DENY');
      res.header('X-XSS-Protection', '1; mode=block');
      next();
    });
  }

  // ✅ Swagger Doku
  const config = new DocumentBuilder()
    .setTitle('Event & Interest API')
    .setDescription('API-Dokumentation für Events und Interessen')
    .setVersion('1.0')
    .addTag('Events')
    .addTag('Interest')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(port);

  logger.log(`🚀 Server läuft auf http://localhost:${port}`);
  logger.log(`📄 Swagger-Doku: http://localhost:${port}/api/docs`);
  logger.log(`📡 API-Endpunkte: http://localhost:${port}/api/events`);
}
bootstrap();
