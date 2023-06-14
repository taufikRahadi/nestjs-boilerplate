import { IsIn, IsNumber, IsOptional, IsString } from 'class-validator'
import { Transform } from 'class-transformer'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

export enum OrderDirectionEnum {
  DESC = 'DESC',
  ASC = 'ASC',
  desc = 'desc',
  asc = 'asc',
}

export class MainPaginationDTO {
  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @ApiPropertyOptional({
    type: Number,
    default: 10,
  })
  size = 10

  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @ApiPropertyOptional({
    type: Number,
    default: 1,
  })
  page = 1

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  search: string

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    type: String,
  })
  sort = 'created_at'

  @IsIn(Object.values(OrderDirectionEnum))
  @IsOptional()
  @ApiPropertyOptional({
    enum: OrderDirectionEnum,
  })
  order: OrderDirectionEnum = OrderDirectionEnum.DESC
}
