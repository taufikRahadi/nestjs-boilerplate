import { IsUUID } from 'class-validator'
import { IsExists } from 'nestjs-rest-api-validation-kit'
import { Role } from '../../entities/role.entity'
import { ApiProperty } from '@nestjs/swagger'

export class DetailRoleDto {
  @IsUUID()
  @IsExists('id', Role, {
    message: `Role with given id is not found`,
  })
  @ApiProperty({})
  id: string
}
