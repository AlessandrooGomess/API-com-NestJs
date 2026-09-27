import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller.js';
import { AuthService } from './auth.service.js';
import { PrismaService } from '../prisma/prisma.service.js'; // 1. Importa o PrismaService

@Module({
  controllers: [AuthController],
  providers: [AuthService, PrismaService], // 2. Adiciona o PrismaService aqui dentro
})
export class AuthModule {}