import { Injectable } from '@nestjs/common'
import { IService } from './interfaces/service.interface'
import { Repository } from 'typeorm'
import { IPaginationQuery } from 'src/common/interfaces/pagination-query.interface'
import { query } from 'express'
import { OrderDirectionEnum } from 'src/common/dto/main-pagination.dto'

export type ID = string | number
@Injectable()
export class BaseService<ID, Entity, CreateDTO, UpdateDTO>
  implements IService<ID, Entity, CreateDTO, UpdateDTO>
{
  constructor(private readonly repo: Repository<Entity>, alias: string) {
    this.tableAlias = alias
  }

  private tableAlias: string
  public async findOne(id: ID, includeRole = false): Promise<Entity> {
    try {
      const data = await this.repo.findOne({
        where: {
          id: id as any,
        },
        relations: [includeRole ? 'role' : undefined],
      } as any)

      return data
    } catch (error) {
      throw error
    }
  }

  public async index(
    pagination: IPaginationQuery<Entity>,
  ): Promise<{ data: Entity[]; total: number }> {
    try {
      const query = await this.repo.createQueryBuilder(this.tableAlias)
      query.limit(pagination.take)
      query.offset(pagination.skip)

      const [sortByColumn] = Object.keys(pagination.sort)
      query.orderBy(`${sortByColumn}`, pagination.sort[sortByColumn])

      if (pagination.where.length > 0) {
        pagination.where.forEach((w) =>
          query.orWhere(w.searchString, { q: w.searchCriteria }),
        )
      }

      const [data, total] = await query.getManyAndCount()

      return { data, total }
    } catch (error) {
      throw error
    }
  }

  public async store(payload: Partial<Entity>): Promise<Entity> {
    try {
      const result = await this.repo.save(
        this.repo.create(payload as any) as any,
      )

      return result
    } catch (error) {
      throw error
    }
  }

  public async update(id: ID, payload: UpdateDTO): Promise<Entity> {
    try {
      const data = await this.findOne(id)

      const keys = Object.keys(payload)

      keys.forEach((key) => {
        if (payload[key]) {
          data[key] = payload[key]
        }
      })
      const result = await this.repo.save({
        ...data,
        ...payload,
      })

      return result
    } catch (error) {
      throw error
    }
  }

  public async delete(id: ID): Promise<Record<any, any>> {
    try {
      return await this.repo.softDelete(id as any)
    } catch (error) {
      throw error
    }
  }
}
