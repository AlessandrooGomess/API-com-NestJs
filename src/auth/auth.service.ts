import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { SignInDTO, SignUpDTO } from './dtos/auth.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
  constructor(private prismaService: PrismaService, private jwtService: JwtService) {}

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
    const user = await this.prismaService.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if(!user) {
        throw new UnauthorizedException('Invalid credentials');
    }

    const passwordMatch = await bcrypt.compare(data.password, user.password);

    if(!passwordMatch) {
        throw new UnauthorizedException('Invalid credentials');
    }

    const accessToken = await this.jwtService.signAsync({
        id: user.id,
        name: user.name,
        email: user.email
    })

    return {
        accessToken,
    };
  }
}
