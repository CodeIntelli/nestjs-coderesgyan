import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Profile } from './typeorm/entities/Profile';
import { User } from './typeorm/entities/User';
import { UsersModule } from './users/users.module';


@Module({
  // imports: [MongooseModule.forRoot('mongodb://localhost:27017/demo_nest')],
  imports: [TypeOrmModule.forRoot({
    "type": "mongodb",
    "host": "localhost",
    "port": 27017,
    "database": "demo_nest",
    "synchronize": false,
    "useUnifiedTopology": true,
    "logging": false,
    "entities": [User, Profile]
  }),
    UsersModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule { }
