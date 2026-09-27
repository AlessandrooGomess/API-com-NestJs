import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module.js';
import { AuthController } from './auth/auth.controller.js';
import { AuthService } from './auth/auth.service.js';
import { PrismaService } from './prisma/prisma.service.js';

@Module({
  controllers: [AuthController],
  providers: [AuthService, PrismaService],
})
export class AppModule {}
