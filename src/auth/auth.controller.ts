import { Controller, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {  //Controller => Responsável por mapear os EndPOINTS para as regras de negócios.
  @Post('signup')
  async signup() {}

  @Post('signin')
  async signin() {}
}
