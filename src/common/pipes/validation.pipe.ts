import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common'
import { plainToClass, plainToInstance } from 'class-transformer'
import { ValidationError, validate } from 'class-validator'

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  constructor(
    private readonly exceptionFactory: (errors: ValidationError[]) => any,
  ) {}

  async transform(value: any, arg: ArgumentMetadata): Promise<any> {
    console.log(arg.metatype)
    if (!arg.metatype || !this.toValidate(arg.metatype)) {
      return value
    }

    const object = plainToInstance(arg.metatype, value)

    const errors = await validate(object)

    if (errors.length > 0) {
      const errorMessages = this.exceptionFactory(errors)
      throw new BadRequestException(errorMessages)
    }

    return value
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object]
    return !types.includes(metatype)
  }
}
