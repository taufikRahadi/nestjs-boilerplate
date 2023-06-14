import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'
import { Timestamptz } from '../../../common/types/timestamptz.type'
import { BaseEntityObj } from '../../../database/classes/base.entity'
import { BeforeInsert, Column, DeleteDateColumn, Entity } from 'typeorm'

@Entity('roles')
export class Role extends BaseEntityObj {
  @Column()
  @ApiProperty()
  name: string

  @Column()
  code?: string

  @Column({
    type: 'boolean',
  })
  @ApiProperty({ name: 'is_active' })
  @Expose({ name: 'is_active' })
  isActive: boolean

  @DeleteDateColumn({ name: 'deleted_at' })
  @Expose({ name: 'deleted_at' })
  @ApiProperty({ name: 'deleted_at' })
  deletedAt?: Timestamptz

  @BeforeInsert()
  setCode?() {
    this.code = this.name.split(' ').join('-').toLowerCase()
  }
}
