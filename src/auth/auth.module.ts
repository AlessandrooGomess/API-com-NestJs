import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller.js';
import { AuthService } from './auth.service.js';
import { PrismaService } from '../prisma/prisma.service.js';

@Module({
  imports: [AuthModule],
  controllers: [],
  providers: [PrismaService],
})
export class AuthModule {}