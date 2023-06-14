import { Injectable, UnprocessableEntityException } from '@nestjs/common'
import { UserService } from '../user/user.service'
import { JwtService } from '@nestjs/jwt'
import { SignInDto } from './v1/dto/sign-in.dto'
import { compareSync } from 'bcrypt'
import { MessageFactory } from 'src/messages/message.service'
import { IJwtPayload } from './interfaces/jwt-payload.interface'
import { SignInResponse } from './v1/responses/sign-in.response'

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  public async signIn(payload: SignInDto): Promise<SignInResponse> {
    try {
      const user = await this.userService.findByEmail(payload.email)
      this.comparePassword(payload.password, user.password)

      const jwtPayload: IJwtPayload = {
        id: user.id,
        email: user.email,
        fullname: user.fullname,
        role_id: user.roleId,
      }

      const token = this.signJwt(jwtPayload)

      return {
        ...jwtPayload,
        ...token,
      }
    } catch (error) {
      throw error
    }
  }

  public async refreshToken(refreshToken: string) {
    try {
      const verified = await this.jwtService.verifyAsync(refreshToken)

      const jwtPayload: IJwtPayload = {
        id: verified.id,
        email: verified.email,
        fullname: verified.fullname,
        role_id: verified.role_id,
      }

      const token = this.signJwt(jwtPayload)

      return {
        ...jwtPayload,
        ...token,
      }
    } catch (error) {
      throw error
    }
  }

  private comparePassword(password: string, encrypted: string) {
    const compare = compareSync(password, encrypted)

    if (!compare)
      throw new UnprocessableEntityException(
        MessageFactory.getErrorMessage('auth.invalid-credentials'),
      )

    return compare
  }

  private signJwt(payload: IJwtPayload) {
    try {
      const authToken = this.jwtService.sign(payload)
      const refreshToken = this.jwtService.sign(payload, {
        expiresIn: '7d',
      })

      return { authToken, refreshToken }
    } catch (error) {
      throw error
    }
  }
}
