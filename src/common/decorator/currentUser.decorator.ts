import { createParamDecorator } from '@nestjs/common';
import { User } from '../../modules/public/user/user.entity';

export const CurrentUser = createParamDecorator((_, context): User => {
  const req = context.switchToHttp().getRequest();
  return req.user;
});
