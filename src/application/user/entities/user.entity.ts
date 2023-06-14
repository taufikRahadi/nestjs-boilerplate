import { Role } from '../../role/entities/role.entity'
import { BaseEntityObj } from '../../../database/classes/base.entity'
import { BeforeInsert, Column, Entity, JoinColumn, ManyToOne } from 'typeorm'
import { Exclude, Expose } from 'class-transformer'
import { genSaltSync, hashSync } from 'bcrypt'

@Entity('users')
export class User extends BaseEntityObj {
  @Column()
  @Expose()
  fullname: string

  @Column()
  @Expose()
  email: string

  @Column()
  @Exclude()
  password: string

  @Column({
    name: 'role_id',
  })
  @Expose({ name: 'role_id' })
  roleId: string

  @ManyToOne(() => Role)
  @JoinColumn({
    name: 'role_id',
  })
  @Expose()
  role?: Role

  @BeforeInsert()
  setPassword?() {
    this.password = hashSync(this.password, genSaltSync(12))
  }
}
