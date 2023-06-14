## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
# install dependencies
$ pnpm install
# create .env file
$ cp .env.example .env
```

## Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Test

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## Database

```bash
# generate migration
$ pnpm typeorm:generate-migration ./src/database/migrations/MigrationName

# run migration
$ pnpm typeorm:run-migrations

# revert migration
$ pnpm typeorm:revert-migrations
```

## TODO

- Add seeder module and command line.
- Create e2e test utilities module.
- Add enum response error code for some cases.

## Authentication

- SignIn: `POST /api/v1/auth`
- Refresh Token: `POST /api/v1/auth`

## Authorization

```typescript
//  set allowed roles, it automatically check user role in RolesGuard
@AllowedRoles('superadmin', 'finance')
@UseGuards(AuthJwtGuard, RolesGuard)
```

## Base

We can use Base Module to extend CRUD functionalities. For now, you can only use BaseService, it will automatically inject CRUD functions to your service.
example:

```typescript
/*
  Extends BaseService, BaseService accept 4 generic types and 2 arguments.
  Generic type for BaseService including Id type (On this case, we use custom type), Entity class, CreateDTO, and UpdateDTO.

  BaseService also accepts 2 arguments. First one is your entity repository, and tableAlias. Because, BaseService is using queryBuilder for fetch data list using paginations in case you have a complex query.
*/
@Injectable()
export class RoleService extends BaseService<
  StringId,
  Role,
  CreateRoleDto,
  UpdateRoleDto
> {
  constructor(
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
  ) {
    super(roleRepository, 'roles')
  }
}
```

Don't forget to imports BaseModule to use PaginationService etc.

```typescript
@Module({
  imports: [
    BaseModule,
    ...
  ]
})
export class RoleModule {}
```

## Validations

### IsUnique

We can use @IsUnique decorator to check if data sent from the client is already registered. @IsUnique accepts 3 arguments. column name, entity class that already extends BaseEntityObj class and validationOptions so you can override class-validator options.

```typescript

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  fullname: string

  @IsEmail()
  @IsNotEmpty()
  @IsUnique('email', User, {
    message: `Email already registered`,
  })
  email: string
```

### IsExists

@IsExists decorator can check to your database if the data is exists or not. This decorator arguments is same with IsUnique.

```typescript
export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  fullname: string

  @IsUUID()
  @IsExists('id', Role, {
    message: `Role not found`
  })
  role_id
```
