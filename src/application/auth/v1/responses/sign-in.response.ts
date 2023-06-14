import { Expose } from 'class-transformer'

export class SignInResponse {
  @Expose()
  id: string

  @Expose()
  fullname: string

  @Expose()
  email: string

  @Expose({ name: 'auth_token' })
  authToken: string

  @Expose({ name: 'refresh_token' })
  refreshToken: string
}
