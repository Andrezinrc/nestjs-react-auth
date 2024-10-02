import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() body: { username: string; password: string }): Promise<User> {
    console.log('Dados recebidos para registro:', body);
    return this.authService.register(body.username, body.password);
  }
}
