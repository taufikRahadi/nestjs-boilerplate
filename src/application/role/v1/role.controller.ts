import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { CreateRoleDto } from './dto/create-role.dto'
import { UpdateRoleDto } from './dto/update-role.dto'
import { DetailRoleDto } from './dto/detail-role.dto'
import { Role } from '../entities/role.entity'
import { RoleService, StringId } from '../role.service'
import { PaginationService } from '../../../utils/pagination.service'
import { MainPaginationDTO } from '../../../common/dto/main-pagination.dto'
import { ApiCreatedResponse, ApiOkResponse, ApiResponse } from '@nestjs/swagger'
import { PaginationResponse } from '../../../common/interfaces/pagination-response.interface'
import { ResponseMessage } from '../../../common/decorators/response-message'
import { AllowedRoles } from '../../../common/decorators/allowed-roles'
import { AuthJwtGuard } from '../../../common/guards/auth-jwt.guard'
import { RolesGuard } from '../../../common/guards/roles.guard'

@Controller('v1/role')
@UseGuards(AuthJwtGuard, RolesGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class RoleControllerV1 {
  constructor(
    private readonly roleService: RoleService,
    public paginationService: PaginationService,
  ) {}

  @Post()
  @AllowedRoles('superadmin')
  @ApiCreatedResponse({
    type: () => Role,
  })
  @ResponseMessage('general.success-save-data')
  store(@Body() payload: CreateRoleDto) {
    return this.roleService.store(payload)
  }

  @Get()
  @AllowedRoles('superadmin', 'admin')
  @ApiOkResponse({
    type: () => PaginationResponse,
  })
  @ResponseMessage('general.success-read-data')
  async index(@Query() pagination: MainPaginationDTO): Promise<{
    pagination: { page: number; size: number; total: number }
    content: Role[]
  }> {
    const paginationQuery =
      this.paginationService.buildPaginationQuery(pagination)

    const { data, total } = await this.roleService.index(paginationQuery)
    const paginationResponse = this.paginationService.buildPaginationResponse(
      pagination,
      total,
    )

    return { pagination: paginationResponse, content: data }
  }

  @Get(':id')
  @AllowedRoles('superadmin')
  @ResponseMessage('general.success-read-data')
  show(@Param() pathParam: DetailRoleDto) {
    return this.roleService.findOne(pathParam.id)
  }

  @Put(':id')
  @AllowedRoles('superadmin')
  @ResponseMessage('general.success-update-data')
  update(@Param() pathParam: DetailRoleDto, @Body() payload: UpdateRoleDto) {
    return this.roleService.update(pathParam.id, payload)
  }

  @Delete(':id')
  @AllowedRoles('superadmin')
  @ResponseMessage('general.success-delete-data')
  delete(@Param() pathParam: DetailRoleDto) {
    return this.roleService.delete(pathParam.id)
  }
}
