import { Logger, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { TodoModule } from './todo/todo.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal:true,
    envFilePath:".local.env"
  }), 
  MongooseModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => ({
      uri: configService.get<string>('MONGODB_URI'),
    }),
    inject: [ConfigService],
  }),
  TodoModule],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor(){
    let logger = new Logger('App Module')
    logger.log(`App is running ${process.env.PORT}`)
  }
}
