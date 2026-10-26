# VET-Lab — Caso de Estudo & Documentação Técnica

Plataforma de gestão de exames veterinários com análise bioinformática.
Material de treinamento para entrevista ao vivo: site estático com o caso de
negócio e documentação técnica de 17 seções, com códigos-gabarito .NET 10 + React.

[![Site](https://img.shields.io/website?url=https%3A%2F%2Frubenslyra.github.io%2Fvetlab-estudo%2F&label=site)](https://rubenslyra.github.io/vetlab-estudo/)
[![Último commit](https://img.shields.io/github/last-commit/rubenslyra/vetlab-estudo?label=last%20commit)](https://github.com/rubenslyra/vetlab-estudo/commits/main)
[![.NET 10](https://img.shields.io/badge/.NET-10-512BD4?logo=dotnet&logoColor=white)](#stack)
[![PostgreSQL 17](https://img.shields.io/badge/PostgreSQL-17-4169E1?logo=postgresql&logoColor=white)](#stack)
[![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=black)](#stack)
[![TanStack Router](https://img.shields.io/badge/TanStack%20Router-FF4154?logo=reactrouter&logoColor=white)](#stack)
[![Bootstrap 5](https://img.shields.io/badge/Bootstrap-5-7952B3?logo=bootstrap&logoColor=white)](#stack)

**[Página inicial](https://rubenslyra.github.io/vetlab-estudo/)** ·
**[Documentação técnica](https://rubenslyra.github.io/vetlab-estudo/docs-request/)** ·
**[Roteiro do vídeo](https://rubenslyra.github.io/vetlab-estudo/docs-request/#falar)**

> [!NOTE]
> Este repositório é a **vitrine do estudo**, não um app executável. O site é
> estático e os gabaritos completos vivem na documentação. `backend/` e
> `frontend/` trazem apenas os arquivos de apoio (compose, SQL e estrutura de
> referência).

## Sumário

- [O que tem aqui](#o-que-tem-aqui)
- [Rodar o site localmente](#rodar-o-site-localmente)
- [Banco de dados local (opcional)](#banco-de-dados-local-opcional)
- [Validar antes de publicar](#validar-antes-de-publicar)
- [Publicação no GitHub Pages](#publicação-no-github-pages)
- [Estrutura do repositório](#estrutura-do-repositório)
- [Stack](#stack)
- [Decisões arquiteturais](#decisões-arquiteturais-para-explicar-na-entrevista)
- [Segredos](#segredos)
- [Roteiro do vídeo](#roteiro-do-vídeo)

## O que tem aqui

| Conteúdo | Onde |
|---|---|
| Hipótese de negócio, fluxo em 3 etapas, caso clínico e justificativa arquitetural | [Página inicial](https://rubenslyra.github.io/vetlab-estudo/) |
| Arquitetura, requisitos, domínio, endpoints, Identity, React, Zod e gabaritos | [docs-request](https://rubenslyra.github.io/vetlab-estudo/docs-request/) |
| Banco: schemas, duas conexões, migrations e índices | [Seção 4 — Setup](https://rubenslyra.github.io/vetlab-estudo/docs-request/#setup) · [Seção 5 — Banco](https://rubenslyra.github.io/vetlab-estudo/docs-request/#banco) |
| Apresentação de ~20 min, minuto a minuto | [Seção 16 — Roteiro](https://rubenslyra.github.io/vetlab-estudo/docs-request/#falar) |

### Por onde começar

1. **Entender o problema** — leia a página inicial (5 min).
2. **Ver a arquitetura** — doc, [seção 1 — visão geral](https://rubenslyra.github.io/vetlab-estudo/docs-request/#visao-geral).
3. **Vai apresentar?** — siga o roteiro da seção 16.
4. **Vai codar?** — comece pela [seção 4 — Setup](https://rubenslyra.github.io/vetlab-estudo/docs-request/#setup) e valide antes de publicar.

## Rodar o site localmente

O site é 100% estático: **não há build nem `npm install`**.

| Requisito | Necessário para |
|---|---|
| Navegador moderno | visualizar o site |
| Node.js 20.6+ | preview local e validação via `npx` |
| Docker + Docker Compose | banco local (opcional) |
| .NET 10 SDK | seguir os gabaritos da documentação (opcional) |

```bash
# na raiz do repositório
npx --yes serve . -l 3000
```

Abra <http://localhost:3000/> e <http://localhost:3000/docs-request/>.

> [!TIP]
> Prefira um servidor local a abrir o `index.html` via `file://`: a API de
> clipboard e parte da navegação exigem contexto HTTP. Alternativa sem Node:
> `python -m http.server 8000`.

## Banco de dados local (opcional)

O `backend/docker-compose.yml` sobe um **PostgreSQL 17** e cria os schemas
`auth` e `produto` no primeiro start:

```bash
cd backend
docker compose up -d
docker compose ps            # aguarde o status "healthy"
```

Confira os schemas:

```bash
docker compose exec postgres psql -U vetlab -d vetlab_db -c "\dn"
# auth | produto | public
```

Ordem correta de preparação:

1. **Schemas** — automático no primeiro start (volume vazio).
2. **Tabelas** — migrations do EF Core, conforme a
   [seção 4](https://rubenslyra.github.io/vetlab-estudo/docs-request/#setup)
   (pressupõem a solução .NET criada na
   [seção 2](https://rubenslyra.github.io/vetlab-estudo/docs-request/#estrutura)).
3. **Índices** — só depois das migrations.

A partir de `backend/`, aplique os índices:

```bash
docker compose cp indices.sql postgres:/tmp/indices.sql
docker compose exec -T postgres psql -U vetlab -d vetlab_db -f /tmp/indices.sql
```

> [!WARNING]
> `docker compose down -v` apaga o volume. Na próxima subida o `schemas.sql`
> roda de novo — útil para recomeçar, destrutivo para dados locais.

As connection strings de exemplo (uma por schema) estão em
[`backend/appsettings.json`](backend/appsettings.json).

## Validar antes de publicar

```bash
# HTML: estrutura, acessibilidade básica e âncoras
npx --yes html-validate@9 index.html docs-request/index.html

# JavaScript
node --check assets/js/main.js

# JSON
node -e "JSON.parse(require('fs').readFileSync('backend/appsettings.json','utf8'))"
```

Critério de sucesso: os três comandos terminam com código 0 e sem erros.
As regras desativadas em [`.htmlvalidate.json`](.htmlvalidate.json) são
intencionais (estilos inline do Bootstrap e textos gerados pelo tema).

## Publicação no GitHub Pages

Configuração atual:

| Item | Valor |
|---|---|
| Origem | Deploy from a branch |
| Branch / pasta | `main` / `/ (root)` |
| Build | legacy (Jekyll desligado pelo `.nojekyll`) |
| URL | <https://rubenslyra.github.io/vetlab-estudo/> |

Para reproduzir em outro repositório:

1. Faça push do conteúdo na branch `main`.
2. Abra **Settings → Pages → Source** e escolha `Deploy from a branch`.
3. Selecione a branch `main` e a pasta `/ (root)`; salve.
4. Aguarde ~1 minuto e acesse `https://SEU-USUARIO.github.io/SEU-REPO/`.
5. A documentação técnica fica em `.../docs-request/`.

Com o GitHub CLI autenticado, dá para acompanhar o build:

```bash
gh api repos/rubenslyra/vetlab-estudo/pages/builds/latest --jq '.status'
# built
```

> [!TIP]
> Se a página parecer desatualizada, confirme o commit do build e force o
> recarregamento com `Ctrl+F5`.

## Estrutura do repositório

| Caminho | Descrição |
|---|---|
| `index.html` | Página inicial: hipótese, fluxo de negócio, caso clínico e justificativa arquitetural |
| `docs-request/index.html` | Documentação técnica em 17 seções, com gabaritos e botão COPIAR |
| `assets/css/style.css` | Tema tech dark sobre Bootstrap 5 |
| `assets/js/main.js` | Copiar código, scrollspy e smooth scroll (jQuery) |
| `backend/docker-compose.yml` | PostgreSQL 17 + init dos schemas |
| `backend/schemas.sql` | Criação dos schemas `auth` e `produto` (init do container) |
| `backend/indices.sql` | Índices de consulta — rodar após as migrations |
| `backend/appsettings.json` | Connection strings e JWT de exemplo (placeholders) |
| `frontend/README.md` | Estrutura de referência do app React (código completo na doc) |
| `.nojekyll` | Desabilita o Jekyll no GitHub Pages |
| `.htmlvalidate.json` | Configuração do validador HTML |

## Stack

| Camada | Tecnologia |
|---|---|
| API | .NET 10, Minimal APIs via Extensions (`MapGroup`) |
| ORM | Entity Framework Core (code-first, migrations) |
| Banco | PostgreSQL 17 em Docker — schemas `auth` e `produto` |
| Auth | ASP.NET Core Identity + JWT |
| Validação | FluentValidation (API) + `DomainException` (domínio) |
| Frontend | React + Vite, estrutura por features |
| Router | TanStack Router (rotas tipadas) |
| Validação front | Zod (schema → tipo inferido) |
| Docs | HTML + Bootstrap 5 + jQuery (este repositório) |

## Decisões arquiteturais (para explicar na entrevista)

- **Dois DbContexts, duas conexões, dois schemas, um Postgres** — isolamento sem overhead.
- **Sem AutoMapper** — mapeamento DTO ↔ entidade manual e explícito em `SolicitacaoMapper`.
- **Aggregate Root** `SolicitacaoExame` — sem setters públicos; status só muda por métodos de domínio.
- **Endpoints via Extensions** — `MapSolicitacaoEndpoints(this IEndpointRouteBuilder)`; `Program.cs` com uma linha por domínio.
- **"Casos de uso" = serviços** na camada Application (jargão explicado na doc).
- **IA como copiloto** — OpenCode em branch `feature/validacao-erros` enquanto você codifica em outra.
- **Preparado para evoluir** — CQRS, Event Sourcing e filas entram sem reescrever o domínio.

## Segredos

> [!WARNING]
> O `backend/appsettings.json` versionado contém **placeholders** de chave JWT e
> senha local do Postgres — serve apenas para o ambiente de treino com Docker.

Em um projeto real:

```bash
dotnet user-secrets set "Jwt:Key" "<chave-de-32+-bytes>"
```

Nunca commite a chave de produção. O `.gitignore` já cobre `.env` e
`*.local.json`, então mantenha configurações sensíveis fora do versionamento.

## Roteiro do vídeo

A documentação tem a **seção 16 — Roteiro do Vídeo**, com cronograma minuto a
minuto (~20 min). Abra no tablet ao lado do VS Code:
[ir para o roteiro](https://rubenslyra.github.io/vetlab-estudo/docs-request/#falar).

---

Feito para estudar, apresentar e evoluir. Boa gravação e boa entrevista. 🚀
