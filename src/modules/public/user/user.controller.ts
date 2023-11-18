import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '../auth/auth.guard';
import { CurrentUser } from '../../../common/decorator/currentUser.decorator';
import { User } from './user.entity';

@UseGuards(AuthGuard)
@Controller('/api/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUser(@CurrentUser() user: User) {
    return this.userService.getUser(user.id);
  }
}
