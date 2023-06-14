import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString, IsUUID } from 'class-validator'

export class UpdateRoleDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  name: string
}
