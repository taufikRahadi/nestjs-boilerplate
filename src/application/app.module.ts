import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AuthModule } from './auth/auth.module'
import { DatabaseConfig } from 'src/configs/database.config'
import { UserModule } from './user/user.module'
import { RoleModule } from './role/role.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    DatabaseConfig,

    // APPLICATION MODULES
    AuthModule,
    UserModule,
    RoleModule,
  ],
})
export class AppModule {}
