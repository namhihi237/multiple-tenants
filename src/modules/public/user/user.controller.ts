import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '../../../guards/auth.guard';
import { CurrentUser } from '../../../common/decorator/currentUser.decorator';
import { User } from './user.entity';
import { RolesGuard } from '../../../guards/roles.guard';
import { Roles } from '../../../common/decorator/roles.decorator';
import { RoleEnum } from '../../../enums/role.enum';
import { Permission } from '../../../common/decorator/permission.decorator';
import { PermissionEnum } from '../../../enums/permission.enum';

@UseGuards(AuthGuard, RolesGuard)
@Controller('/api/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @Roles(RoleEnum.Tenant)
  @Permission(PermissionEnum.GET_USER)
  async getUser(@CurrentUser() user: User) {
    return this.userService.getUser(user.id);
  }
}
