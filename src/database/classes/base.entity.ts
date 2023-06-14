import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'
import {
  BaseEntity,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

export class BaseEntityObj extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id?: string

  @CreateDateColumn({ name: 'created_at' })
  @Expose({ name: 'created_at' })
  @ApiProperty({ name: 'created_at' })
  createdAt?: string

  @UpdateDateColumn({ name: 'updated_at' })
  @Expose({ name: 'updated_at' })
  @ApiProperty({ name: 'updated_at' })
  updatedAt?: string
}
