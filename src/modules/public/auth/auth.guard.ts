import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}
  canActivate(context: ExecutionContext): Promise<boolean> {
    return this.authService.validate(context);
  }
}
