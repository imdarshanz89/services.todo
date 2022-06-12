import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TodoDocument = Todo & Document;

@Schema()
export class Todo {
  @Prop()
  id: string;

  @Prop()
  todo: string;

  @Prop({default:false})
  status: string;

  @Prop({index:true})
  userId: string;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);