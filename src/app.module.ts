import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoController } from './todo/todo.controller';
import { TodoModule } from './todo/todo.module';
import { LoggerModule } from './shared/logger/logger.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [DatabaseModule, LoggerModule, TodoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
