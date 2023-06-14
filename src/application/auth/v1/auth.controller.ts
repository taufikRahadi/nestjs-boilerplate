import { Body, Controller, Post } from '@nestjs/common'
import { AuthService } from '../auth.service'
import { SignInDto } from './dto/sign-in.dto'
import { ResponseMessage } from 'src/common/decorators/response-message'
import { RefreshTokenDto } from './dto/refresh-token.dto'

@Controller('/v1/auth')
export class AuthControllerV1 {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @ResponseMessage('auth.signin-success')
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto)
  }

  @Post('refresh')
  @ResponseMessage('auth.token-renewal-success')
  refreshToken(@Body() payload: RefreshTokenDto) {
    return this.authService.refreshToken(payload.refresh_token)
  }
}
