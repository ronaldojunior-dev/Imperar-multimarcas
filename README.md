# Imperar Multimarcas

Sistema full-stack em Next.js 15 para loja automotiva com site público, painel administrativo, API REST, autenticação, PostgreSQL e Prisma.

## Recursos

- Site público com estoque, detalhe do veículo, leads, venda de veículo e simulador de financiamento.
- Painel administrativo protegido por NextAuth com roles `ADMIN` e `VENDEDOR`.
- CRUD de veículos com slug automático, destaque, reserva, venda, arquivamento e duplicação.
- Upload local comprimido para WebP em `/public/uploads`.
- Leads com filtros, exportação CSV, observações internas e histórico de status.
- Configurações da empresa, SEO dinâmico, `robots.txt`, `sitemap.xml`, OpenGraph e Twitter Cards.
- API REST com validação Zod, rate limit, sanitização, logs de auditoria e tratamento de erros.
- Docker, Docker Compose, backup, restore, Vercel e guia de VPS/Nginx/SSL.

## Execução local

```bash
npm install
cp .env.example .env
docker compose up -d postgres
npm run prisma:dev
npm run seed
npm run dev
```

Acesse:

- Site: `http://localhost:3000`
- Admin: `http://localhost:3000/admin`
- Login admin inicial: `admin@imperar.com.br`
- Senha inicial: `Admin@12345`

## Produção

```bash
npm install
npm run prisma:migrate
npm run seed
npm run build
npm run start
```

## Endpoints

- `/api/auth`
- `/api/vehicles`
- `/api/leads`
- `/api/banners`
- `/api/testimonials`
- `/api/users`
- `/api/settings`
- `/api/upload`
- `/api/finance/simulations`

## Banco

O schema está em `prisma/schema.prisma`, a migration inicial em `prisma/migrations/0001_init` e o seed em `prisma/seed.ts`.

## Backup e restore

```bash
npm run backup
npm run restore -- -InputFile backups/arquivo.sql
```
