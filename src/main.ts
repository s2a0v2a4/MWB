// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   app.enableCors(); // Damit Frontend auf anderem Port zugreifen kann
//   await app.listen(3000);
// }
// bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

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

  // CORS konfigurieren
  app.enableCors({
    origin: corsOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    credentials: true,
  });

  app.setGlobalPrefix('api');

  // Security Headers für Produktion
  if (!isDevelopment) {
    app.use((req, res, next) => {
      res.header('X-Content-Type-Options', 'nosniff');
      res.header('X-Frame-Options', 'DENY');
      res.header('X-XSS-Protection', '1; mode=block');
      next();
    });
  }

  await app.listen(port);
  
  logger.log(`🚀 Server running on http://localhost:${port}`);
  logger.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  logger.log(`🔗 CORS enabled for: ${corsOrigins.join(', ')}`);
  logger.log(`📡 API endpoints: http://localhost:${port}/api/interests`);
  logger.log(`📡 Health check: http://localhost:${port}/api`);
}
bootstrap();
