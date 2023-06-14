import { ApiProperty } from '@nestjs/swagger'

export class PaginationObject {
  @ApiProperty()
  size: number

  @ApiProperty()
  page: number

  @ApiProperty()
  total: number
}

export class PaginationResponse<T> {
  @ApiProperty({
    type: () => PaginationObject,
  })
  pagination: PaginationObject

  @ApiProperty({
    type: [],
  })
  content: T
}
