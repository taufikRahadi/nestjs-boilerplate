import { IsUUID } from 'class-validator'
import { IsExists } from 'nestjs-rest-api-validation-kit'
import { User } from '../../entities/user.entity'

export class DetailUserDto {
  @IsUUID()
  @IsExists('id', User, {
    message: () => `User with given id not found`,
  })
  id: string
}
