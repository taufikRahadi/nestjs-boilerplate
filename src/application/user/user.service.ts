import { Injectable } from '@nestjs/common'
import { BaseService } from '../base/base.service'
import { User } from './entities/user.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateUserDto } from './v1/dto/create-user.dto'
import { UpdateUserDto } from './v1/dto/update-user.dto'

@Injectable()
export class UserService extends BaseService<
  string,
  User,
  CreateUserDto,
  UpdateUserDto
> {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {
    super(userRepo, 'users')
  }

  async findByEmail(email: string) {
    try {
      const user = await this.userRepo.findOneByOrFail({
        email,
      })

      return user
    } catch (error) {
      throw error
    }
  }
}
