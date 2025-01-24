import { Module } from "@nestjs/common";
import { TodoController } from "./todo.controller";
import { TodoService } from "./todo.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Todo } from "src/entity/todo.entity";
import { LoggerService } from "src/shared/logger/logger.service";

@Module({
    imports: [TypeOrmModule.forFeature([Todo])],
    controllers: [TodoController],
    providers: [TodoService, LoggerService],
})
export class TodoModule {}