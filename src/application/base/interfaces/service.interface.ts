import { IPaginationQuery } from 'src/common/interfaces/pagination-query.interface'

export interface IService<IDType, Entity, CreateDTO, UpdateDTO> {
  findOne(id: IDType): Promise<Entity>
  index(
    pagination: IPaginationQuery<Entity>,
  ): Promise<{ data: Entity[]; total: number }>
  store(payload: Partial<Entity>): Promise<Entity>
  update(id: IDType, payload: UpdateDTO): Promise<Entity>
  delete(id: IDType): Promise<Record<any, any>>
}
