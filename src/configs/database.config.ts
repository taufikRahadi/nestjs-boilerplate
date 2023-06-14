import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Role } from 'src/application/role/entities/role.entity'
import { User } from 'src/application/user/entities/user.entity'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (env: ConfigService) => ({
        type: 'postgres',
        host: env.get<string>('DB_HOST'),
        port: env.get<number>('DB_PORT'),
        username: env.get<string>('DB_USERNAME'),
        password: env.get<string>('DB_PASSWORD'),
        database: env.get<string>('DB_DATABASE'),
        logging: env.get<string>('NODE_ENV') === 'dev' ? ['query'] : false,
        autoLoadEntities: true,
        namingStrategy: new SnakeNamingStrategy(),
      }),
    }),
  ],
})
export class DatabaseConfig {}
