import { Body, Controller, Post } from '@nestjs/common';
import type { SignUpDTO, SignInDTO } from './dtos/auth.js';

@Controller('auth')
export class AuthController {  //Controller => Responsável por mapear os EndPOINTS para as regras de negócios.
  @Post('signup')
  async signup(@Body() body: SignUpDTO) {
    console.log(body);
  }

  @Post('signin')
  async signin(@Body() body: SignInDTO) {
    console.log(body)
  }
}
