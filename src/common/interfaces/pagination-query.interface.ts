import { OrderDirectionEnum } from '../dto/main-pagination.dto'
import { WhereUsingQueryBuilder } from '../types/where-query-builder.type'
import { WhereUsingRepository } from '../types/where-repository.type'

export interface IPaginationQuery<T> {
  skip: number
  take: number
  where: WhereUsingQueryBuilder | WhereUsingRepository<T>
  sort: any
}
