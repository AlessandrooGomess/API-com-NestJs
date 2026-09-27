import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
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

    const hashedPassword = await bcrypt.hash(data.password, 10);  //número "10" é um número de saltos que o bcrypt vai fazer quando estiver fazendo hash da senha, isso impede de gerar hashs iguais. 

    const user = await this.prismaService.user.create({ data: {
        ...data,
        password: hashedPassword,
    } });

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
