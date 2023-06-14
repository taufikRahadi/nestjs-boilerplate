import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './entities/user.entity'
import { UserService } from './user.service'
import { BaseModule } from '../base/base.module'
import { UserControllerV1 } from './v1/user.controller'

@Module({
  imports: [TypeOrmModule.forFeature([User]), BaseModule],
  providers: [UserService],
  controllers: [UserControllerV1],
  exports: [TypeOrmModule, UserService],
})
export class UserModule {}
