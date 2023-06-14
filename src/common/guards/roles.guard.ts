import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Observable } from 'rxjs'
import { IJwtPayload } from 'src/application/auth/interfaces/jwt-payload.interface'
import { UserService } from 'src/application/user/user.service'
import { MessageFactory } from 'src/messages/message.service'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly userService: UserService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const req = context.switchToHttp().getRequest()
      const user: IJwtPayload = req.user

      const userData = await this.userService.findOne(user.id, true)
      const userRole = userData.role

      const allowedRoles = this.reflector.get<string[]>(
        'ALLOWED_ROLES',
        context.getHandler(),
      )

      const isAllowed = allowedRoles.some((role) => userRole.code === role)

      return isAllowed
    } catch (error) {
      throw new ForbiddenException(
        MessageFactory.getErrorMessage('auth.no-access'),
      )
    }
  }
}
