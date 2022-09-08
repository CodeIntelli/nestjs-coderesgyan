import { ArgumentMetadata, HttpException, Injectable, PipeTransform, HttpStatus } from '@nestjs/common';
import { CreateUserDto } from '../dtos/CreateUser.dto';

@Injectable()
export class ValidateCreateUserPipePipe implements PipeTransform {
  transform(value: CreateUserDto, metadata: ArgumentMetadata) {
    const lang = parseInt(value.language.toString())
    if (isNaN(lang))
      throw new HttpException('invalid data type for lkanguage', HttpStatus.BAD_REQUEST)

    return { ...value, lang: lang }
  }
}
