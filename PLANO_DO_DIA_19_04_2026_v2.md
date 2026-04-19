# Plano do Dia v2 — 19 de abril de 2026

## Objetivo

Ter até 23h de hoje o Nexti Analytics rodando localmente de ponta a ponta (frontend + backend novo + Aurora), com refactor estrutural do frontend já aplicado.

## Estratégia: reduzir risco com progressão incremental

Em vez de mexer em tudo ao mesmo tempo, cada etapa só começa depois da anterior confirmada. Se algo quebrar, eu sei exatamente em qual etapa.

```
Etapa 1: Baseline atual rodando (sem mexer em nada)
   ↓ se ok
Etapa 2: JSONs migrados pro novo shape (front ainda lê JSON)
   ↓ se ok
Etapa 3: Refactor estrutural (adapter pattern, env vars, tipagens)
   ↓ se ok
Etapa 4: Backend novo (mesmo shape dos JSONs, drop-in replacement)
   ↓ se ok
Etapa 5: Integração end-to-end (troca JSON por API via env var)
```

**Ganho da ordem:** os JSONs migrados na Etapa 2 já estão no shape final. Quando o backend entra, retorna exatamente o mesmo formato, então o front não muda de novo. Zero retrabalho.

## Arquitetura-alvo (localhost, fim do dia)

```
[Frontend refatorado — remix-of-nexti-analytics-v2 em localhost:5173]
    ↓ HTTP (via VITE_API_URL)
[Backend Express novo em localhost:3001]
    ↓ pg driver (TLS)
[Aurora PostgreSQL — schemas analytics_shared + analytics_gold_vigeyes_642 — já populados]
```

## Repos envolvidos

- **`remix-of-nexti-analytics-v2`** — fork/remix do Lovable, já clonado em `/Users/lucas/projetos`. É aqui que tudo vai acontecer hoje.
- **Backend novo** — criado do zero hoje, em pasta separada (ex: `/Users/lucas/projetos/nexti-analytics-api`).

## Estado atual

**Aurora (fonte de verdade, já pronto):**
- Schema `analytics_shared` com `customer_analytics_config`
- Schema `analytics_gold_vigeyes_642` com 6 gold tables + `analytics_insights`
- Vig Eyes (customer_id 642) registrado com `primary_dim_type = BUSINESS_UNIT`
- Dados populados via CTAS Trino, SELECT já funciona

**Frontend:**
- `remix-of-nexti-analytics-v2` clonado mas ainda não rodado localmente
- JSONs hoje em formato antigo do Lovable (precisa migrar pro shape Aurora)
- Auditoria do Lovable já concluída em outro chat (nota 9.5 visual, mas dívida técnica relevante: auth base64, TS desligado, sem multi-tenant real)

**Backend:**
- Não existe. Será criado na Etapa 4.

## Padrões técnicos obrigatórios

**Tudo em inglês:** tabelas, colunas, enums, aliases SQL, variáveis TypeScript.

**Dim types:** `COMPANY`, `BUSINESS_UNIT`, `AREA`, `CLIENT`, `OPERATION_DESK_FILTER`. Para Vig Eyes: primary = `BUSINESS_UNIT`, disponíveis = `COMPANY`, `BUSINESS_UNIT`, `AREA`.

**Maturity category:** `planned`, `reactive` (minúsculo, em inglês).

**Sintaxe PostgreSQL no backend:** `CURRENT_TIMESTAMP`, `JSONB`, `ON CONFLICT`, `TEXT[]`.

**Frontend:** nunca hardcode de pesos ou cores (sempre via config). Evitar travessão (—) em textos em português.

## Shape dos JSONs no novo padrão

Todos os arquivos em `src/data/analytics-gold/` seguem o wrapper:

```json
{
  "table": "clocking_quality_monthly",
  "customer_id": 642,
  "generated_at": "2026-04-19T14:00:00Z",
  "period": { "start": "2025-04-01", "end": "2026-04-01" },
  "count": 156,
  "rows": [
    {
      "customer_id": 642,
      "dim_type": "BUSINESS_UNIT",
      "dim_id": 17517,
      "dim_name": "TERCEIRIZACAO",
      "reference_month": "2025-04-01",
      "clocking_count": 12345,
      "registered_count": 10200,
      "justified_count": 2145,
      "quality_percentage": 82.63,
      "headcount": 450,
      "active_headcount": 438
    }
  ]
}
```

Granularidade por tabela:

| Tabela | PK |
|---|---|
| `clocking_quality_monthly` | customer_id + dim_type + dim_id + reference_month |
| `clocking_treatment_time_monthly` | idem |
| `clocking_backoffice_monthly` | idem |
| `absence_volume_monthly` | idem |
| `absence_composition_monthly` | + absence_situation_id |
| `absence_maturity_monthly` | + category (planned/reactive) |

Mais o `analytics_insights` com wrapper diferente (insight_id como chave, evidence_cards e action_plan como arrays JSONB).

---

## Etapa 1 — Baseline local (meta: 30 min)

Objetivo: confirmar que o `remix-of-nexti-analytics-v2` roda localmente sem mexer em nada. É o ponto de referência pra qualquer coisa que quebrar depois.

### Passos

1. `cd /Users/lucas/projetos/remix-of-nexti-analytics-v2`
2. `git status` — confirmar branch limpa
3. `node --version` — garantir Node 18+
4. `npm install` — instalar deps
5. `npm run dev` — subir Vite
6. Abrir no navegador, validar que 2-3 telas carregam (Qualidade do Ponto, Absenteísmo, Dashboard)
7. Fechar servidor (Ctrl+C)

### Critério de sucesso

- [ ] Build passa
- [ ] Servidor sobe sem erro
- [ ] Pelo menos 2 telas renderizam com os dados mockados atuais
- [ ] Zero erro no console do navegador

### Se quebrar

Não vai pra Etapa 2. Primeiro arruma o baseline. Opções:
- Falta dependência: `npm install`
- Versão de Node errada: `nvm use 18` ou superior
- Erro específico: trazer o log aqui no chat ou no Claude Code Desktop

---

## Etapa 2 — Migrar JSONs pro novo shape (meta: 1h30-2h)

Objetivo: substituir os JSONs antigos do Lovable pelos arquivos no shape Aurora, sem mexer no código do front ainda.

### Passos

1. Listar todos os JSONs atuais em `src/data/` (mapear o que é pra qual tela)
2. Decidir: criar nova pasta `src/data/analytics-gold/` ou substituir no lugar?
3. Gerar os 7 arquivos no shape novo a partir dos dados do Aurora:
   - `clocking_quality_monthly.json`
   - `clocking_treatment_time_monthly.json`
   - `clocking_backoffice_monthly.json`
   - `absence_volume_monthly.json`
   - `absence_composition_monthly.json`
   - `absence_maturity_monthly.json`
   - `analytics_insights.json`
4. Extrair dados via `psql` ou DBeaver do Aurora em formato JSON
5. Encaixar no wrapper (table, customer_id, generated_at, period, count, rows)
6. Atualizar os imports/leitura no front mínimo pra carregar do novo lugar (sem refactor estrutural ainda, só troca de caminho)

### Como extrair do Aurora em JSON

Query tipo:
```sql
SELECT json_agg(t) AS rows
FROM (
  SELECT customer_id, dim_type, dim_id, dim_name, reference_month,
         clocking_count, registered_count, justified_count,
         quality_percentage, headcount, active_headcount
  FROM analytics_gold_vigeyes_642.clocking_quality_monthly
  WHERE customer_id = 642
  ORDER BY dim_type, dim_id, reference_month
) t;
```

Pega o resultado, coloca no wrapper.

### Critério de sucesso

- [ ] 7 arquivos JSON criados, todos no shape novo
- [ ] Todos com wrapper completo (table, customer_id, generated_at, period, count, rows)
- [ ] `rows` tem dados reais do Vig Eyes
- [ ] Front carrega e renderiza com dados novos (mesmo que com bugs visuais, o importante é não quebrar)

### Se quebrar

Normal: telas vão desalinhar porque os nomes de campo mudaram (`total_marcacoes` → `clocking_count`, `qualidade_percentual` → `quality_percentage`, etc.). Não corrigir na Etapa 2. Anotar e corrigir junto com o refactor da Etapa 3.

---

## Etapa 3 — Refactor estrutural do frontend (meta: 2h-2h30)

Objetivo: aplicar adapter pattern, preparar o front pra aceitar API no lugar de JSON sem mudança nos componentes.

### O que Claude Code Desktop faz

1. Criar `src/lib/analyticsDataSource.ts` — interface única pra buscar dados, agnóstica de fonte
2. Criar `src/hooks/useAnalyticsData.ts` — hook que consome a interface
3. Criar duas implementações:
   - `MockDataSource` (lê dos JSONs atuais)
   - `ApiDataSource` (faz fetch, placeholder pronto pra Etapa 5)
4. Adicionar env var `VITE_USE_MOCK_DATA` (true/false) que escolhe a implementação
5. Atualizar tipagens TypeScript com interfaces das 6 gold tables + insights
6. Refatorar os componentes de chart/tela pra consumir o hook, não importar JSON diretamente
7. Corrigir todos os mapeamentos de nome antigo → novo (`total_marcacoes` → `clocking_count`, etc.)

### Regras operacionais pro Claude Code

- Antes de começar, mostra plano em alto nível e espera aprovação
- Commits só com aprovação explícita
- Antes de mudar arquivo grande, mostra o diff proposto
- Roda `tsc --noEmit` e `npm run build` antes de dizer "pronto"
- Nunca cria arquivos MD ou docs sem eu pedir
- Pede confirmação antes de instalar dependência nova
- Se travar em decisão técnica, para e pergunta

### Critério de sucesso

- [ ] `VITE_USE_MOCK_DATA=true` → front roda igual, lendo dos JSONs novos
- [ ] `tsc --noEmit` passa sem erro
- [ ] `npm run build` passa
- [ ] Nenhum componente importa JSON diretamente (tudo via hook)
- [ ] Código preparado pra Etapa 5 (API) sem novo refactor

---

## Etapa 4 — Backend novo (meta: 2h-2h30)

Objetivo: backend Express mínimo que consulta Aurora e retorna JSON no mesmo shape dos JSONs da Etapa 2.

### Stack

Node.js + Express + TypeScript + `pg` + Zod.

Não é Connexti. Não é Next.js 15 + tRPC + Drizzle + Keycloak. Hoje é pragmatismo. Backend temporário pra destravar o Analytics rodando. Connexti vem depois (projeto de semanas).

### Estrutura

```
nexti-analytics-api/
├── src/
│   ├── index.ts                    # bootstrap Express + CORS
│   ├── db/
│   │   └── aurora.ts               # pool pg
│   ├── lib/
│   │   └── resolveSchema.ts        # customer_id → schema_slug
│   ├── routes/
│   │   ├── gold.ts                 # GET /api/analytics/gold/:table
│   │   ├── insights.ts             # GET /api/analytics/insights
│   │   └── health.ts
│   └── middleware/
│       └── validateCustomer.ts
├── .env.example
├── package.json
└── tsconfig.json
```

### Endpoints mínimos

- `GET /api/health` — diagnóstico, retorna status da conexão com Aurora
- `GET /api/analytics/gold/:table?customer_id=642&dim_type=BUSINESS_UNIT&start=2025-04-01&end=2026-04-01`
- `GET /api/analytics/insights?customer_id=642&chart=clocking_quality_trend`

Todos retornam o mesmo shape dos JSONs da Etapa 2 (wrapper completo).

### Segurança mínima

- CORS liberado só pra localhost do front
- Whitelist de `:table` (só aceita as 6 gold + `analytics_insights`)
- SQL sempre parametrizado via pg (nunca concatenação)
- `customer_id` obrigatório em toda query
- `resolveSchema` valida que customer_id existe antes de consultar
- Credenciais do Aurora só em `.env` (nunca no código)

### Variáveis de ambiente

**Backend (.env):**
```
AURORA_HOST=
AURORA_PORT=5432
AURORA_DB=
AURORA_USER=
AURORA_PASSWORD=
AURORA_SSL=true
PORT=3001
CORS_ORIGIN=http://localhost:5173
```

### Critério de sucesso

- [ ] `npm run dev` sobe o servidor
- [ ] `curl localhost:3001/api/health` retorna 200
- [ ] `curl localhost:3001/api/analytics/gold/clocking_quality_monthly?customer_id=642` retorna dados reais do Vig Eyes no shape correto
- [ ] Shape idêntico aos JSONs da Etapa 2

---

## Etapa 5 — Integração end-to-end (meta: 30 min)

Objetivo: trocar JSON por API via env var e validar que tudo continua funcionando.

### Passos

1. No front: `VITE_USE_MOCK_DATA=false` e `VITE_API_URL=http://localhost:3001`
2. Reiniciar `npm run dev`
3. Abrir navegador, validar que as 2-3 telas carregam dados reais do Aurora via API
4. Testar filtro de dim_type (Empresa, Unidade de Negócio, Área)
5. Validar insights renderizando

### Critério de sucesso

- [ ] Front carrega dados do backend (visível no Network tab)
- [ ] Nenhuma chamada a JSON local quando `VITE_USE_MOCK_DATA=false`
- [ ] Toggle funciona (mudar env var volta pra mock)
- [ ] Filtros funcionam end-to-end

---

## Checklist final antes de 23h

- [ ] Etapa 1 — Baseline rodando
- [ ] Etapa 2 — JSONs migrados
- [ ] Etapa 3 — Refactor estrutural aplicado, build passa
- [ ] Etapa 4 — Backend rodando, endpoints retornam dados reais
- [ ] Etapa 5 — Front integrado ao backend
- [ ] Commits organizados em ambos os repos
- [ ] README mínimo do backend

## Timeline com buffer

| Horário | Etapa |
|---|---|
| 14h-14h30 | Etapa 1 — Baseline |
| 14h30-16h30 | Etapa 2 — JSONs |
| 16h30-19h | Etapa 3 — Refactor |
| 19h-21h30 | Etapa 4 — Backend |
| 21h30-22h | Etapa 5 — Integração |
| 22h-23h | Buffer, commits, README, polimento |

## O que NÃO é pra fazer hoje

- Migrar pra Connexti (Next.js 15 + tRPC + Drizzle + Keycloak) — projeto de semanas
- Autenticação/autorização robusta — hoje é dev local sem login
- Resolver dívida técnica do Lovable (auth base64, TS desligado, multi-tenant real) — backlog
- Testes automatizados — backlog
- Deploy pra ambiente — backlog
- Multi-cliente de verdade — hoje só Vig Eyes (642)
- Criar qualquer doc MD sem eu pedir explicitamente
