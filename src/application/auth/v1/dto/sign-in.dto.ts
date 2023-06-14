import { IsEmail, IsNotEmpty, IsString } from 'class-validator'
import { IsExists } from 'nestjs-rest-api-validation-kit'
import { User } from 'src/application/user/entities/user.entity'

export class SignInDto {
  @IsEmail()
  @IsNotEmpty()
  @IsExists('email', User, {
    message: ({ value }) => `User with email '${value}' was not found`,
  })
  email: string

  @IsString()
  @IsNotEmpty()
  password: string
}
