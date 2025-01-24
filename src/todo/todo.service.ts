import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoggerService } from 'src/shared/logger/logger.service';
import { Todo } from '../entity/todo.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>, // Injecting the repository
    private readonly loggerService: LoggerService,
  ) {
    this.loggerService.setContext(TodoService.name);
  }

  async getAllTodos(): Promise<Todo[]> {
    this.loggerService.info('Fetching all todos in service');
    try {
      return await this.todoRepository.find();
    } catch (error) {
      this.loggerService.error('Failed to fetch all todos in service', error);
      throw new Error('Error fetching todos');
    }
  }

  async getTodoById(id: string): Promise<Todo> {
    this.loggerService.info(`Fetching todo with id: ${id} in service`);
    try {
      const todo = await this.todoRepository.findOne({ where: { id } });
      if (!todo) throw new Error(`Todo with id ${id} not found`);
      return todo;
    } catch (error) {
      this.loggerService.error(`Failed to fetch todo with id: ${id} in service`, error);
      throw new Error(error.message);
    }
  }

  async createTodo(todoData: Partial<Todo>): Promise<Todo> {
    this.loggerService.info('Creating a new todo in service');
    try {
      const todo = this.todoRepository.create(todoData);
      return await this.todoRepository.save(todo);
    } catch (error) {
      this.loggerService.error('Failed to create todo in service', error);
      throw new Error('Error creating todo');
    }
  }

  async updateTodo(id: string, todoData: Partial<Todo>): Promise<Todo> {
    this.loggerService.info(`Updating todo with id: ${id} in service`);
    try {
      const todo = await this.todoRepository.findOne({ where: { id } });
      if (!todo) throw new Error(`Todo with id ${id} not found`);

      Object.assign(todo, todoData);
      return await this.todoRepository.save(todo);
    } catch (error) {
      this.loggerService.error(`Failed to update todo with id: ${id} in service`, error);
      throw new Error('Error updating todo');
    }
  }

  async deleteTodo(id: string): Promise<void> {
    this.loggerService.info(`Deleting todo with id: ${id} in service`);
    try {
      const result = await this.todoRepository.delete(id);
      if (result.affected === 0) throw new Error(`Todo with id ${id} not found`);
    } catch (error) {
      this.loggerService.error(`Failed to delete todo with id: ${id} in service`, error);
      throw new Error('Error deleting todo');
    }
  }
}
