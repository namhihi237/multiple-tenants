import { Controller, Post, HttpCode, Body } from '@nestjs/common';
import { InputSignInDto } from './auth.dto';
import { AuthService } from './auth.service';

@Controller('/api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @HttpCode(200)
  async login(@Body() input: InputSignInDto): Promise<any> {
    return this.authService.login(input);
  }
}
