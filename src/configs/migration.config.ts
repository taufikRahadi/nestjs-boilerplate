import { ConfigService } from '@nestjs/config'
import { DataSource } from 'typeorm'
import { join } from 'path'
import { User } from '../application/user/entities/user.entity'
import { config } from 'dotenv'
import { Role } from '../application/role/entities/role.entity'

config()
const configService = new ConfigService()

export default new DataSource({
  type: 'postgres',
  host: configService.get<string>('DB_HOST'),
  port: configService.get<number>('DB_PORT'),
  username: configService.get<string>('DB_USERNAME'),
  password: configService.get<string>('DB_PASSWORD'),
  database: configService.get<string>('DB_DATABASE'),
  entities: [User, Role],
  migrations: [join(process.cwd(), 'src/database/migrations/*.ts')],
})
