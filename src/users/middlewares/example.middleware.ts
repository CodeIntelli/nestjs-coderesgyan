import { HttpException, HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';

@Injectable()
export class ExampleMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // @ts-ignore
    const { authorization } = req.headers;
    if (!authorization) {
      throw new HttpException('no authrozation', HttpStatus.FORBIDDEN)
    }

    if (authorization === "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTEsIm5hbWUiOiJDcm93aW4iLCJidXNpbmVzc19pZCI6MzcsImV4cCI6MTY2NzcyMjA5MC4zNzUsImlhdCI6MTY2MjUzODA5MH0.U8MQrzm5hMZwLEF7CQANrwQd6qSoQ9CjyA4byWoA6UE") {
      next();
    }

  }
}
