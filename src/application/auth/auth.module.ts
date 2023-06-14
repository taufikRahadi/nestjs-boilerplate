import { Module, forwardRef } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { JwtStrategy } from 'src/common/strategies/jwt.strategy'
import { AuthService } from './auth.service'
import { AuthControllerV1 } from './v1/auth.controller'
import { UserModule } from '../user/user.module'
import { UserService } from '../user/user.service'

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (env: ConfigService) => ({
        secret: env.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: '1h',
        },
      }),
    }),
    PassportModule,
    forwardRef(() => UserModule),
  ],
  providers: [JwtStrategy, AuthService],
  controllers: [AuthControllerV1],
  exports: [AuthService, UserModule],
})
export class AuthModule {}
