import {  Injectable, NotFoundException ,Inject} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo, TodoDocument } from './schema/todo.schema';

@Injectable()
export class TodoService {
  constructor(
    @InjectModel(Todo.name) private todoModel: Model<TodoDocument>,

    
    ) {}

  async create(createTodoDto: CreateTodoDto): Promise<Todo> {
    try {
      let todo = new this.todoModel(createTodoDto);
      await todo.save();
      return todo;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAll(): Promise<Todo[]> {
    return this.todoModel.find().lean();
  }

  async findOne(_id: string): Promise<Todo> {
    let todo = await this.todoModel.findOne({ _id });
    if (todo === null) {
      throw new NotFoundException('no data found');
    }
    return todo;
  }

  async update(_id: string, updateTodoDto: UpdateTodoDto): Promise<Todo> {
    let todo = await this.todoModel.findOneAndUpdate({ _id }, updateTodoDto, {
      new: true,
    });

    return todo;
  }

  async remove(id: string): Promise<any> {
     await this.findOne(id);

    try {
      await this.todoModel.deleteOne({ _id: id });
    } catch (error) {
      throw new Error(error);
    }

    return { message: 'ok' };
  }
}
function CACHE_MANAGERNAGER(CACHE_MANAGERNAGER: any) {
  throw new Error('Function not implemented.');
}

