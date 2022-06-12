import { Controller, Get, Post, Body, Patch, Param, Delete, CACHE_MANAGER, Inject } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './schema/todo.schema';
import { Cache } from 'cache-manager';

@Controller('todo')
export class TodoController {
  constructor(
    private readonly todoService: TodoService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
    ) {}

  @Post()
  async create(@Body() createTodoDto: CreateTodoDto):Promise<Todo> {
    return await this.todoService.create(createTodoDto);
  }

  @Get()
  async findAll():Promise<Todo[]> {

    let value:Todo[] = await this.cacheManager.get('findAll');

    if(!value){
      value=await this.todoService.findAll()
      await this.cacheManager.set('findAll',value,100);
    }

    return value;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.todoService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todoService.update(id, updateTodoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.todoService.remove(id);
  }
}
