import {  CacheModule, Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Todo, TodoSchema } from './schema/todo.schema';

@Module({
  imports:[
    MongooseModule.forFeature([{name:Todo.name,schema:TodoSchema}]),
    CacheModule.register()

  ],
  controllers: [TodoController],
  providers: [TodoService]
})
export class TodoModule {}
