# Auth API

API REST de autenticação e autorização desenvolvida com NestJS, Prisma e PostgreSQL.

## Tecnologias

- NestJS
- Prisma ORM
- PostgreSQL
- JWT (JSON Web Token)
- Bcrypt
- TypeScript

## O que foi feito

- Cadastro de novos usuários com criptografia de senha (Bcrypt)
- Autenticação de usuários e geração de token JWT
- Proteção de rotas da aplicação usando os Guards do NestJS
- Validação de dados recebidos nas rotas usando class-validator (DTOs)

## Pré-requisitos

- Node.js
- pnpm
- Banco de dados PostgreSQL (rodando localmente ou em serviços como Supabase)

## Como rodar o projeto localmente

1. Clone o repositório e instale as dependências:
```bash
pnpm install
```

2. Crie um arquivo `.env` na pasta raiz do projeto e configure as seguintes variáveis:

```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/nome_do_banco?schema=public"
DIRECT_URL="postgresql://usuario:senha@localhost:5432/nome_do_banco?schema=public"
JWT_SECRET="sua_chave_secreta_aqui"
PORT=3000
```

3. Atualize o banco de dados com a estrutura do Prisma:
```bash
pnpm dlx prisma db push
```

4. Inicie a aplicação:
```bash
pnpm run start:dev
```

A API vai estar rodando na porta 3000 (`http://localhost:3000`).

## Rotas da API

### Autenticação

#### POST /auth/signup
Cria um novo usuário no banco de dados. Não é permitido cadastrar e-mails duplicados.

**Corpo da requisição (JSON):**
```json
{
  "name": "Nome do Usuário",
  "email": "usuario@email.com",
  "password": "senha_segura"
}
```

#### POST /auth/signin
Faz o login do usuário e devolve o token JWT.

**Corpo da requisição (JSON):**
```json
{
  "email": "usuario@email.com",
  "password": "senha_segura"
}
```

**Resposta de Sucesso (200 OK):**
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Usuário

#### GET /auth/me
Devolve os dados básicos do usuário logado usando as informações do token.

**Cabeçalho obrigatório:**
```http
Authorization: Bearer <seu_token_jwt>
```

**Resposta de Sucesso (200 OK):**
```json
{
  "id": 1,
  "name": "Nome do Usuário",
  "email": "usuario@email.com",
  "iat": 1715000000,
  "exp": 1715000060
}
```
