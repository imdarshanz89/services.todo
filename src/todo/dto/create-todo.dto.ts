import { IsNotEmpty, IsOptional, IsString } from "class-validator"

export class CreateTodoDto {

  @IsString()
  @IsNotEmpty()
  todo:string

  @IsString()
  @IsNotEmpty()
  userId:string

}
