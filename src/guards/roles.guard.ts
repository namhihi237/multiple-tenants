import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RoleEnum } from '../enums/role.enum';
import { ROLES_KEY } from '../common/decorator/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<RoleEnum[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles.length) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();

    const userRoles = user.userRoles.map(userRole => userRole?.role?.name);

    const isAllow = requiredRoles.some(role => userRoles?.includes(role));
    if (!isAllow) {
      throw new ForbiddenException("You don't have permission!");
    }
    return true;
  }
}
