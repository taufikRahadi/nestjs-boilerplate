import { SetMetadata } from '@nestjs/common'

export const AllowedRoles = (...roles: string[]) =>
  SetMetadata('ALLOWED_ROLES', roles)
