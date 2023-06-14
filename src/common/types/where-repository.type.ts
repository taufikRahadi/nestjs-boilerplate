import { FindOptionsWhere } from 'typeorm'

export type WhereRepository<T> = FindOptionsWhere<T>

export type WhereUsingRepository<T> = WhereRepository<T>[]
