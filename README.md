# VET-Lab — Caso de Estudo & Documentação Técnica

> Repositório de treinamento para entrevista ao vivo. Plataforma de gestão de exames veterinários com análise bioinformática.

## O que tem neste repositório

```
vetlab-repo/
├── index.html              ← Página principal: caso de estudo, hipótese de negócio, fluxo
├── docs-request/
│   └── index.html          ← Documentação técnica completa (rota: /docs-request/)
│                             com todos os códigos-gabarito e botão COPIAR
├── assets/
│   ├── css/style.css       ← Estilo customizado (Bootstrap 5 + paleta tech dark)
│   └── js/main.js          ← jQuery: copy-to-clipboard, scrollspy, smooth scroll
├── backend/
│   ├── docker-compose.yml  ← PostgreSQL 17 (porta 5432) + init dos schemas
│   ├── appsettings.json    ← Duas connection strings (auth + produto)
│   ├── schemas.sql         ← Criação dos schemas auth e produto (init do container)
│   └── indices.sql         ← Índices — rodar depois das migrations
├── frontend/               ← (estrutura de referência — código completo na doc)
└── .nojekyll               ← GitHub Pages: desabilita Jekyll
```

## Site publicado

- Página principal: https://rubenslyra.github.io/vetlab-estudo/
- Documentação técnica: https://rubenslyra.github.io/vetlab-estudo/docs-request/

## Validar antes de publicar

```bash
# HTML (estrutura, links e âncoras)
npx html-validate index.html docs-request/index.html

# Sintaxe do JavaScript
node --check assets/js/main.js

# JSON
node -e "JSON.parse(require('fs').readFileSync('backend/appsettings.json','utf8'))"
```

## Como o GitHub Pages está configurado

Este repositório já está publicado com **Deploy from a branch**:

- Branch: `main` · pasta: `/ (root)`
- Build: *legacy* (Jekyll desabilitado pelo `.nojekyll`)

Para reproduzir em outro repositório:

1. Faça push da pasta.
2. Vá em **Settings → Pages** → **Source**: `Deploy from a branch`.
3. Branch `main` / pasta `/ (root)`. Salve.
4. Aguarde ~1 minuto e acesse `https://SEU-USUARIO.github.io/SEU-REPO/`.
5. A documentação técnica fica em `.../docs-request/`.

> O arquivo `.nojekyll` na raiz garante que o GitHub Pages sirva os arquivos
> estáticos sem processamento Jekyll (importante para a pasta `assets/`).

## Segredos

O `backend/appsettings.json` versionado traz **placeholder** de chave JWT e senha
local do Postgres — serve só para o ambiente de treino com Docker. Em um projeto
real: `dotnet user-secrets set "Jwt:Key" "<chave-de-32+-bytes>"` e nunca commitar
a chave de produção.

## Stack do projeto

| Camada | Tecnologia |
|---|---|
| API | .NET 10, Minimal APIs via Extensions (`MapGroup`) |
| ORM | Entity Framework Core (code-first, migrations) |
| Banco | PostgreSQL 17 em Docker — schemas `auth` e `produto` |
| Auth | ASP.NET Core Identity + JWT |
| Validação | FluentValidation (API) + DomainException (domínio) |
| Frontend | React + Vite, estrutura por features |
| Router | TanStack Router (rotas tipadas) |
| Validação front | Zod (schema → tipo inferido) |
| Docs | HTML + Bootstrap 5 + jQuery (este repositório) |

## Decisões arquiteturais (para explicar na entrevista)

- **Dois DbContexts, duas conexões, dois schemas, um Postgres** — isolamento sem overhead.
- **Sem AutoMapper** — mapeamento DTO↔Entidade manual e explícito em `SolicitacaoMapper`.
- **Aggregate Root** `SolicitacaoExame` — sem setters públicos; status só muda por métodos de domínio.
- **Endpoints via Extensions** — `MapSolicitacaoEndpoints(this IEndpointRouteBuilder)`; Program.cs com uma linha por domínio.
- **"Casos de uso" = serviços** na camada Application (jargão explicado na doc).
- **IA como copiloto** — OpenCode em branch `feature/validacao-erros` enquanto você codifica em outra.
- **Preparado para evoluir** — CQRS, Event Sourcing e filas entram sem reescrever o domínio.

## Roteiro do vídeo

A página `/docs-request/` tem uma seção **"Roteiro do Vídeo — O que falar, na ordem"**
com cronograma minuto a minuto (~20 min). Use no tablet ao lado do VS Code.

---

Boa gravação e boa entrevista. 🚀
