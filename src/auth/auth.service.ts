import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SignInDTO, SignUpDTO } from './dtos/auth.js';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class AuthService {
  constructor(private prismaService: PrismaService) {}

  async signup(data: SignUpDTO) {
    // Retornando o registro do prisma se ele encontrar um usuário com o mesmo email
    const userAlreadyExists = await this.prismaService.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (userAlreadyExists) {
      throw new UnauthorizedException('User already exists');
    }

    const user = await this.prismaService.user.create({ data });

    return {
        id: user.id,
        email: user.email,
        name: user.name,
    }
  }

  async signin(data: SignInDTO) {
    console.log({ data });
    return 'signin';
  }
}
