import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();  //Connect => Estabelece uma conexão com o banco de dados no Prisma (Pega a Url definida no schema.prisma)
  }
} 
