import {
  Body,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
} from '@nestjs/common'
import { IService } from './interfaces/service.interface'
import { MainPaginationDTO } from 'src/common/dto/main-pagination.dto'
import { PaginationService } from 'src/utils/pagination.service'

export abstract class BaseController<CreateDTO, UpdateDTO, DetailDTO, Entity> {
  constructor(
    private readonly service: IService<string, Entity, CreateDTO, UpdateDTO>,
    public readonly paginationService: PaginationService<Entity>,
  ) {}

  @Get()
  async index(@Query() pagination: MainPaginationDTO) {
    const paginationQuery =
      this.paginationService.buildPaginationQuery(pagination)

    const { data, total } = await this.service.index(paginationQuery)
    const paginationResponse = this.paginationService.buildPaginationResponse(
      pagination,
      total,
    )

    return { pagination: paginationResponse, content: data }
  }

  @Get(':id')
  findOne(@Param() param: DetailDTO) {
    return this.service.findOne((param as any).id)
  }

  @Put(':id')
  update(@Param() param: DetailDTO, @Body() payload: UpdateDTO) {
    return this.service.update((param as any).id, payload)
  }

  @Delete(':id')
  delete(@Param() param: DetailDTO) {
    return this.service.delete((param as any).id)
  }
}
