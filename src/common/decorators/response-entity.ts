import {
  ExecutionContext,
  SetMetadata,
  createParamDecorator,
} from '@nestjs/common'

export const ResponseEntity = (classObject: any) =>
  SetMetadata('response-entity', classObject)
