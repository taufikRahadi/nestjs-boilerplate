import { Module } from '@nestjs/common'
import { PaginationService } from 'src/utils/pagination.service'

@Module({
  providers: [PaginationService],
  exports: [PaginationService],
})
export class BaseModule {}
