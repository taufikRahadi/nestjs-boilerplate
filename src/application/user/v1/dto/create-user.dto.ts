import { IsEmail, IsNotEmpty, IsString, IsUUID } from 'class-validator'
import { IsExists, IsUnique } from 'nestjs-rest-api-validation-kit'
import { User } from '../../entities/user.entity'
import { Role } from 'src/application/role/entities/role.entity'

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  fullname: string

  @IsEmail()
  @IsNotEmpty()
  @IsUnique('email', User, {
    message: `Email already registered`,
  })
  email: string

  @IsString()
  password: string

  @IsUUID()
  @IsNotEmpty()
  @IsExists('id', Role, {
    message: `Role is not exists`,
  })
  role_id: string
}
