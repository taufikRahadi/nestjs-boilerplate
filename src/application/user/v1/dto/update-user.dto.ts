import { IsExists } from 'nestjs-rest-api-validation-kit'
import { IsEmail, IsNotEmpty, IsString, IsUUID } from 'class-validator'
import { User } from '../../entities/user.entity'

export class UpdateUserDto {
  @IsExists('id', User, {
    message: ({ value }) => `User with given id not found'`,
  })
  id: string

  @IsEmail()
  @IsNotEmpty()
  email: string

  @IsString()
  @IsNotEmpty()
  fullname: string

  @IsUUID()
  @IsNotEmpty()
  role_id: string
}
