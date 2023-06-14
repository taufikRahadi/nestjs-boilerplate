import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Role } from './entities/role.entity'
import { RoleService } from './role.service'
import { BaseModule } from '../base/base.module'
import { RoleControllerV1 } from './v1/role.controller'
import { AuthModule } from '../auth/auth.module'

@Module({
  imports: [TypeOrmModule.forFeature([Role]), BaseModule, AuthModule],
  providers: [RoleService],
  controllers: [RoleControllerV1],
})
export class RoleModule {}
