
Ajuste: trocar `insight_id` (string como `"E1"`) por um id numérico.

## Modelo final

```json
{
  "pin": {
    "insight_id": 1,
    "type": "trend"
  }
}
```

- `insight_id`: **number** — id numérico estável e único do insight dentro do cliente.
- `type`: `"risk" | "achievement" | "opportunity" | "trend"` (mapeia 1-pra-1 com `category` do insight).

## Implicação importante

Hoje os insights em `customers/{id}/insights.json` (e `qualidade-ponto/insights.json`) usam `id` string (`"E1"`, `"risk_001"`, `"ach_002"`...). Para o `insight_id` numérico funcionar, precisamos adicionar um campo numérico aos insights também:

```json
{
  "id": "E1",
  "numeric_id": 1,
  "category": "event",
  ...
}
```

E o pin referencia via `numeric_id`. Mantemos `id` string para não quebrar o resto do código que já usa.

## Exemplo Orsegups (customer 642) — mapeamento proposto

| numeric_id | id (legacy) | category | type (pin) | Mês-âncora | Gráfico |
|---|---|---|---|---|---|
| 1 | E1 | event | `trend` | set/25 | Evolução Qualidade e Headcount |
| 2 | C1 | achievement | `achievement` | mar/26 | Evolução Qualidade e Headcount |
| 3 | R1 | risk | `risk` | mar/26 | Sobrecarga do Back-office |
| 4 | E2 | event | `trend` | fev/26 | Evolução do Tempo de Tratativa |

## Exemplo aplicado em `headcount-por-empresa.json`

```json
{
  "company_name": "PORTARIA E LIMPEZA",
  "reference_month": "2025-09-01",
  "active_headcount": 1240,
  "quality_percentage": 82.4,
  "registered_count": 18420,
  "justified_count": 3940,
  "pin": {
    "insight_id": 1,
    "type": "trend"
  }
}
```

E no `insights.json`:

```json
{
  "id": "E1",
  "numeric_id": 1,
  "category": "event",
  "title": "Crescimento do contrato em set/25",
  ...
}
```

## Próximos passos (após sua aprovação)

1. Adicionar `numeric_id` em todos os insights de 642 (e depois 1, 2, 391).
2. Adicionar `pin: { insight_id, type }` nas linhas-âncora dos JSONs de série temporal de 642.
3. Refatorar `InsightOverlayPins` + `AnalyticsDisciplinaOperacional` para varrer o array do gráfico procurando `row.pin` (em vez do mapa hardcoded `CHART_PINS_BY_CUSTOMER`), resolvendo o insight via `numeric_id`.
4. Mapear `type` → variante visual do `InsightSunPin` (cor/ícone por categoria).

**Validação:**
- Modelo `pin: { insight_id: number, type: string }` + adição de `numeric_id` nos insights — OK?
- Posso seguir começando pelo Orsegups (642)?
