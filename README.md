# CP2 — Pokémon TCG

Projeto Next.js com App Router, sem estilização, conforme critérios do checkpoint.

## Configuração

1. Instale Node.js 20 ou superior.
2. Execute `npm install`.
3. Copie `.env.example` para `.env.local` e defina `LOGIN_PASSWORD` e `SESSION_SECRET` (um valor longo e aleatório).
4. Execute `npm run dev` e abra http://localhost:3000.

A autenticação usa uma senha fixa configurada no servidor, sem expor a senha no cliente. A sessão fica em cookie HttpOnly assinado. A área de cartas e o endpoint de busca exigem sessão válida. O logout remove a sessão e limpa os favoritos no navegador.

A busca usa a API pública Pokémon TCG, retorna no máximo 15 cartas, e os favoritos ficam no localStorage. Opcionalmente configure `POKEMON_TCG_API_KEY` para aumentar o limite de requisições.

## Vercel

Importe o repositório no Vercel e configure as variáveis `LOGIN_PASSWORD` e `SESSION_SECRET` no projeto. Publique com o framework Next.js. Após o deploy, adicione o link público aqui.

**URL pública:** pendente de deploy.
