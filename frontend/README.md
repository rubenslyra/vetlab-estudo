# VET-Lab Frontend — Referência de Estrutura

> O código completo (componentes, schemas Zod, rotas TanStack Router) está na
> documentação técnica: `/docs-request/` → seções 13, 14 e 15. Copie de lá.

## Setup inicial

```bash
npm create vite@latest vetlab-web -- --template react-ts
cd vetlab-web
npm install @tanstack/react-router @tanstack/react-query zod react-hook-form @hookform/resolvers axios
```

## Dependências principais (package.json)

```json
{
  "dependencies": {
    "@tanstack/react-query": "^5.x",
    "@tanstack/react-router": "^1.x",
    "zod": "^3.x",
    "react-hook-form": "^7.x",
    "@hookform/resolvers": "^3.x",
    "axios": "^1.x"
  }
}
```

## Estrutura por features (detalhe na doc)

```
src/
├── app/           router.tsx, providers.tsx
├── features/
│   ├── auth/      components, hooks, context, schemas (Zod), api.ts
│   └── solicitacoes/  components, hooks, schemas, api.ts
├── shared/        components/ui, lib/apiClient.ts, hooks, utils
└── routes/        páginas .lazy.tsx
```

## Variável de ambiente

Crie `.env` com:
```
VITE_API_URL=http://localhost:5000
```
