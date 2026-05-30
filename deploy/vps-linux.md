# Deploy VPS Linux

1. Instale Node.js 22, PostgreSQL 16, Nginx e Certbot.
2. Configure `.env` com `DATABASE_URL`, `NEXTAUTH_SECRET`, `NEXTAUTH_URL` e `APP_URL`.
3. Execute `npm install`, `npm run prisma:migrate`, `npm run seed` e `npm run build`.
4. Inicie com `npm run start` ou PM2: `pm2 start npm --name imperar -- run start`.
5. Copie `deploy/nginx.conf` para `/etc/nginx/sites-available/imperar` e ative o site.
6. Emita SSL: `certbot --nginx -d imperarmultimarcas.com.br -d www.imperarmultimarcas.com.br`.
