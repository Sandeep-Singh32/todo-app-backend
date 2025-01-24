import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { LoggerService } from 'src/shared/logger/logger.service';
import { Todo } from 'src/entity/todo.entity';

@Controller('todo')
export class TodoController {
  constructor(
    private readonly todoService: TodoService,
    private readonly loggerService: LoggerService,
  ) {
    this.loggerService.setContext(TodoController.name);
  }

  @Get()
  async getAllTodos(): Promise<Todo[]> {
    this.loggerService.info('Fetching all todos');
    try {
      const todos = await this.todoService.getAllTodos();
      this.loggerService.info('Successfully fetched all todos');
      return todos;
    } catch (error) {
      this.loggerService.error('Failed to fetch todos', error);
      throw new HttpException(
        'Failed to fetch todos',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  async getTodoById(@Param('id') id: string): Promise<Todo> {
    this.loggerService.info(`Fetching todo with id: ${id}`);
    try {
      const todo = await this.todoService.getTodoById(id);
      this.loggerService.info(`Successfully fetched todo with id: ${id}`);
      return todo;
    } catch (error) {
      this.loggerService.error(`Failed to fetch todo with id: ${id}`, error);
      throw new HttpException('Todo not found', HttpStatus.NOT_FOUND);
    }
  }

  @Post()
  async createTodo(@Body() todoData: Partial<Todo>): Promise<Todo> {
    this.loggerService.info('Creating a new todo');
    try {
      const todo = await this.todoService.createTodo(todoData);
      this.loggerService.info('Successfully created a new todo');
      return todo;
    } catch (error) {
      this.loggerService.error('Failed to create todo', error);
      throw new HttpException('Failed to create todo', HttpStatus.BAD_REQUEST);
    }
  }

  @Patch(':id')
  async updateTodo(
    @Param('id') id: string,
    @Body() todoData: Partial<Todo>,
  ): Promise<Todo> {
    this.loggerService.info(`Updating todo with id: ${id}`);
    try {
      const updatedTodo = await this.todoService.updateTodo(id, todoData);
      this.loggerService.info(`Successfully updated todo with id: ${id}`);
      return updatedTodo;
    } catch (error) {
      this.loggerService.error(`Failed to update todo with id: ${id}`, error);
      throw new HttpException('Failed to update todo', HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  async deleteTodo(@Param('id') id: string): Promise<string> {
    this.loggerService.info(`Deleting todo with id: ${id}`);
    try {
      await this.todoService.deleteTodo(id);
      this.loggerService.info(`Successfully deleted todo with id: ${id}`);
      return 'Successfully deleted todo';
    } catch (error) {
      this.loggerService.error(`Failed to delete todo with id: ${id}`, error);
      throw new HttpException(
        'Failed to delete todo',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
