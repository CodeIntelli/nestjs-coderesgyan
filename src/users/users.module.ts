import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { UserController } from './controllers/user/user.controller';
import { AnotherMiddleware } from './middlewares/another.middleware';
import { ExampleMiddleware } from './middlewares/example.middleware';
import { UserService } from './services/user/user.service';

@Module({
  controllers: [UserController],
  providers: [UserService]
})

export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ExampleMiddleware).forRoutes(
      {
        path: 'user',
        method: RequestMethod.GET,
      },
      {
        path: 'user/:id',
        method: RequestMethod.GET,
      },
    ).apply(AnotherMiddleware).forRoutes(
      {
        path: 'user',
        method: RequestMethod.GET,
      },
      {
        path: 'user/:id',
        method: RequestMethod.GET,
      },
    );
  }
}
