import { ILike } from 'typeorm'
import { MainPaginationDTO } from 'src/common/dto/main-pagination.dto'
import { IPaginationQuery } from 'src/common/interfaces/pagination-query.interface'
import { WhereUsingQueryBuilder } from 'src/common/types/where-query-builder.type'
import { WhereUsingRepository } from 'src/common/types/where-repository.type'

export class PaginationService<T = any> {
  public buildPaginationQuery(
    queryParams: MainPaginationDTO,
    allowedSearch?: (keyof T)[],
    whereType?: 'repository' | 'queryBuilder',
  ): IPaginationQuery<T> {
    const { page, size, search } = queryParams

    const skip = page > 0 ? page * size - size : 0
    const take = size && size > 0 ? size : 10
    const sort = this.parseSortAndOrder(queryParams)
    const where: WhereUsingQueryBuilder | WhereUsingRepository<T> =
      whereType === 'repository'
        ? this.whereUsingRepository(search, allowedSearch)
        : this.whereUsingQueryBuilder(search, allowedSearch)

    return {
      skip,
      sort,
      take,
      where,
    }
  }

  public buildPaginationResponse(dto: MainPaginationDTO, total: number) {
    return {
      page: Number(dto.page),
      size: Number(dto.size),
      total,
    }
  }

  private whereUsingRepository(
    search: string,
    allowedSearch?: (keyof T)[],
  ): WhereUsingRepository<T> {
    const where = []

    if (search.length > 0)
      where.push(
        ...allowedSearch.map((column) => {
          const obj = {
            [column]: ILike(`%${search}%`),
          }

          return obj
        }),
      )

    return where
  }

  private whereUsingQueryBuilder(
    search: string,
    columns: (keyof T)[],
  ): WhereUsingQueryBuilder {
    if (!search || search.length < 1) return []
    const whereQuery = columns.map((column) => {
      const searchString = `${column as string} ilike :q`
      const searchCriteria = { q: `%${search}%` }

      return { searchString, searchCriteria }
    })

    return whereQuery
  }

  private parseSortAndOrder({ sort, order }: MainPaginationDTO) {
    return {
      [sort]: order,
    }
  }
}
