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
│   ├── docker-compose.yml  ← PostgreSQL 17 (porta 5432)
│   ├── appsettings.json    ← Duas connection strings (auth + produto)
│   └── schemas.sql         ← Criação dos schemas auth e produto
├── frontend/               ← (estrutura de referência — código completo na doc)
└── .nojekyll               ← GitHub Pages: desabilita Jekyll
```

## Como publicar no GitHub Pages

1. Crie um repositório no GitHub (ex: `vetlab-estudo`) e faça push desta pasta.
2. Vá em **Settings → Pages**.
3. Em **Source**, selecione `Deploy from a branch`.
4. Branch: `main` / pasta: `/ (root)`. Salve.
5. Aguarde ~1 minuto. O site estará em:
   `https://SEU-USUARIO.github.io/vetlab-estudo/`
6. A documentação técnica estará em:
   `https://SEU-USUARIO.github.io/vetlab-estudo/docs-request/`

> O arquivo `.nojekyll` já está na raiz — garante que o GitHub Pages sirva os arquivos
> estáticos sem processamento Jekyll (importante para a pasta `assets/`).

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
