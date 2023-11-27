import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RoleEnum } from '../enums/role.enum';
import { ROLES_KEY } from '../common/decorator/roles.decorator';
import { PermissionEnum } from '../enums/permission.enum';
import { PERMISSION_KEY } from '../common/decorator/permission.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<RoleEnum[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    const requiredPermission = this.reflector.getAllAndOverride<PermissionEnum>(PERMISSION_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();

    const userRoles = user.userRoles.map(userRole => userRole?.role?.name);
    const isHost = userRoles?.includes(RoleEnum.Host);

    if (isHost) {
      return true;
    }

    const userPermissions = user.userRoles.map(userRole => userRole?.permission?.name);
    const isPermissionAllow = userPermissions?.includes(requiredPermission);

    const isAllowRole = requiredRoles.some(role => userRoles?.includes(role));
    if (!isAllowRole || !isPermissionAllow) {
      throw new ForbiddenException("You don't have a permission!");
    }

    return true;
  }
}
