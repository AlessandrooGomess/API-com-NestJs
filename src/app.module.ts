import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module.js';
import { AuthController } from './auth/auth.controller.js';
import { AuthService } from './auth/auth.service.js';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
})
export class AppModule {}
