import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { DetailUserDto } from './dto/detail-user.dto'
import { UserService } from '../user.service'
import { PaginationService } from '../../../utils/pagination.service'
import { MainPaginationDTO } from '../../../common/dto/main-pagination.dto'
import { ResponseMessage } from '../../../common/decorators/response-message'
import { AuthJwtGuard } from '../../../common/guards/auth-jwt.guard'

@Controller('v1/user')
@UseGuards(AuthJwtGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class UserControllerV1 {
  constructor(
    private readonly userService: UserService,
    private readonly paginationService: PaginationService,
  ) {}

  @Post()
  @ResponseMessage('general.success-save-data')
  store(@Body() payload: CreateUserDto) {
    return this.userService.store({
      ...payload,
      roleId: payload.role_id,
    })
  }

  @Get()
  @ResponseMessage('general.success-read-data')
  async index(@Query() pagination: MainPaginationDTO) {
    const paginationQuery =
      this.paginationService.buildPaginationQuery(pagination)

    const { data, total } = await this.userService.index(paginationQuery)

    const paginationResponse = this.paginationService.buildPaginationResponse(
      pagination,
      total,
    )

    return { pagination: paginationResponse, content: data }
  }

  @Get(':id')
  @ResponseMessage('general.success-read-data')
  show(@Param() pathParam: DetailUserDto) {
    return this.userService.findOne(pathParam.id)
  }

  @Put(':id')
  @ResponseMessage('general.success-update-data')
  update(@Param() pathParam: DetailUserDto, @Body() payload: UpdateUserDto) {
    return this.userService.update(pathParam.id, payload)
  }

  @Delete(':id')
  @ResponseMessage('general.success-delete-data')
  delete(@Param() pathParam: DetailUserDto) {
    return this.userService.delete(pathParam.id)
  }
}
