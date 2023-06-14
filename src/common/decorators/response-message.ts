import { SetMetadata } from '@nestjs/common'

export const ResponseMessage = (query: string) =>
  SetMetadata('RESPONSE_MESSAGE', query)
