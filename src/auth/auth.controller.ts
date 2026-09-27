import {
  Body,
  Controller,
  Post,
  Get,
  Request,
  UseGuards,
} from '@nestjs/common';
import type { SignUpDTO, SignInDTO } from './dtos/auth.js';
import { AuthService } from './auth.service.js';
import { AuthGuard } from './auth.guard.js';

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
    return this.authService.signin(body);
  }

  @UseGuards(AuthGuard)
  @Get('me')
  async me(@Request() request: any) {
    return request.user;
  }
}
