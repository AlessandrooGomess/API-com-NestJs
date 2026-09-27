import { Body, Controller, Post } from '@nestjs/common';
import type { SignUpDTO, SignInDTO } from './dtos/auth.js';
import { AuthService } from './auth.service.js';

@Controller('auth')
export class AuthController {
  //Controller => Responsável por mapear os EndPOINTS para as regras de negócios.
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signup(@Body() body: SignUpDTO) {
    return this.authService.signup(body);
  }

  @Post('signin')
  async signin(@Body() body: SignInDTO) {
    await this.authService.signin(body);

    return body;
  }
}
