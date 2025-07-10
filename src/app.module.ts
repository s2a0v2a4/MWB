// import { Module } from '@nestjs/common';
// import { EventsModule } from './events/events.module';

// @Module({
//   imports: [EventsModule],
// })
// export class AppModule {}

import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { EventsModule } from './events/events.module';
import { InterestsModule } from './interests/interests.module';
import { RequestLoggerMiddleware } from './middleware/request-logger.middleware';

@Module({
  imports: [EventsModule, InterestsModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(RequestLoggerMiddleware)
      .forRoutes('*'); // Für alle Routes
  }
}

