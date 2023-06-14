import { InjectRepository } from '@nestjs/typeorm'
import { BaseService } from '../base/base.service'
import { Role } from './entities/role.entity'
import { CreateRoleDto } from './v1/dto/create-role.dto'
import { UpdateRoleDto } from './v1/dto/update-role.dto'
import { Repository } from 'typeorm'

export type StringId = string

export class RoleService<
  StringId,
  Role,
  CreateRoleDto,
  UpdateRoleDto,
> extends BaseService<StringId, Role, CreateRoleDto, UpdateRoleDto> {
  constructor(
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
  ) {
    super(roleRepository, 'roles')
  }
}
