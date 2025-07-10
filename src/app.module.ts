// import { Module } from '@nestjs/common';
// import { EventsModule } from './events/events.module';

// @Module({
//   imports: [EventsModule],
// })
// export class AppModule {}

import { Module } from '@nestjs/common';
import { EventsModule } from './events/events.module';
import { InterestsController } from './interests/interests.controller';

@Module({
  imports: [EventsModule],
  controllers: [InterestsController],
})
export class AppModule {}

