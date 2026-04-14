import type { ChartDataSource } from "@/components/analytics/ChartDataModal";

import tratEmpresa from "@/data/qualidade-ponto/tratativa-tempo-por-empresa.json";
import tratUnidade from "@/data/qualidade-ponto/tratativa-tempo-por-un-negocio.json";
import tratArea from "@/data/qualidade-ponto/tratativa-tempo-por-area.json";

const SQL_EMPRESA = `WITH ajustes AS (
    SELECT
        ajuste.customer_id,
        co.id AS company_id,
        co.company_name,
        DATE_FORMAT(ajuste.reference_date, '%Y-%m-01') AS reference_month,
        TIMESTAMPDIFF(HOUR, original.register_date, ajuste.adjustment_date) AS tempo_horas
    FROM clocking ajuste
    JOIN clocking original
        ON ajuste.clocking_origin_id = original.id
    JOIN person p ON ajuste.person_id = p.id
    JOIN company co ON p.company_id = co.id
    WHERE ajuste.removed = 0
      AND ajuste.customer_id = 642
      AND ajuste.clocking_origin_id IS NOT NULL
      AND ajuste.adjustment_date IS NOT NULL
      AND ajuste.reference_date >= '2025-04-01'
      AND ajuste.reference_date < '2026-04-01'
)
SELECT
    a.customer_id,
    a.company_id,
    a.company_name,
    a.reference_month,
    COUNT(*) AS total_ajustes,
    SUM(CASE WHEN a.tempo_horas < 24 THEN 1 ELSE 0 END) AS faixa_ate_1_dia,
    SUM(CASE WHEN a.tempo_horas >= 24 AND a.tempo_horas < 72 THEN 1 ELSE 0 END) AS faixa_1_3_dias,
    SUM(CASE WHEN a.tempo_horas >= 72 AND a.tempo_horas < 168 THEN 1 ELSE 0 END) AS faixa_3_7_dias,
    SUM(CASE WHEN a.tempo_horas >= 168 AND a.tempo_horas < 360 THEN 1 ELSE 0 END) AS faixa_7_15_dias,
    SUM(CASE WHEN a.tempo_horas >= 360 THEN 1 ELSE 0 END) AS faixa_mais_15_dias,
    MIN(a.tempo_horas) AS tempo_min_horas,
    MAX(a.tempo_horas) AS tempo_max_horas,
    ROUND(AVG(a.tempo_horas), 2) AS tempo_medio_horas
FROM ajustes a
GROUP BY a.customer_id, a.company_id, a.company_name, a.reference_month
ORDER BY a.reference_month, total_ajustes DESC;`;

const SQL_UNIDADE = `WITH ajustes AS (
    SELECT
        ajuste.customer_id,
        bu.id AS business_unit_id,
        bu.name AS business_unit_name,
        DATE_FORMAT(ajuste.reference_date, '%Y-%m-01') AS reference_month,
        TIMESTAMPDIFF(HOUR, original.register_date, ajuste.adjustment_date) AS tempo_horas
    FROM clocking ajuste
    JOIN clocking original
        ON ajuste.clocking_origin_id = original.id
    JOIN workplace w ON ajuste.workplace_id = w.id
    JOIN business_unit bu ON w.business_unit_id = bu.id
    WHERE ajuste.removed = 0
      AND ajuste.customer_id = 642
      AND ajuste.clocking_origin_id IS NOT NULL
      AND ajuste.adjustment_date IS NOT NULL
      AND ajuste.reference_date >= '2025-04-01'
      AND ajuste.reference_date < '2026-04-01'
)
SELECT
    a.customer_id,
    a.business_unit_id,
    a.business_unit_name,
    a.reference_month,
    COUNT(*) AS total_ajustes,
    SUM(CASE WHEN a.tempo_horas < 24 THEN 1 ELSE 0 END) AS faixa_ate_1_dia,
    SUM(CASE WHEN a.tempo_horas >= 24 AND a.tempo_horas < 72 THEN 1 ELSE 0 END) AS faixa_1_3_dias,
    SUM(CASE WHEN a.tempo_horas >= 72 AND a.tempo_horas < 168 THEN 1 ELSE 0 END) AS faixa_3_7_dias,
    SUM(CASE WHEN a.tempo_horas >= 168 AND a.tempo_horas < 360 THEN 1 ELSE 0 END) AS faixa_7_15_dias,
    SUM(CASE WHEN a.tempo_horas >= 360 THEN 1 ELSE 0 END) AS faixa_mais_15_dias,
    MIN(a.tempo_horas) AS tempo_min_horas,
    MAX(a.tempo_horas) AS tempo_max_horas,
    ROUND(AVG(a.tempo_horas), 2) AS tempo_medio_horas
FROM ajustes a
GROUP BY a.customer_id, a.business_unit_id, a.business_unit_name, a.reference_month
ORDER BY a.reference_month, total_ajustes DESC;`;

const SQL_AREA = `WITH ajustes AS (
    SELECT
        ajuste.customer_id,
        ar.id AS area_id,
        ar.name AS area_name,
        DATE_FORMAT(ajuste.reference_date, '%Y-%m-01') AS reference_month,
        TIMESTAMPDIFF(HOUR, original.register_date, ajuste.adjustment_date) AS tempo_horas
    FROM clocking ajuste
    JOIN clocking original
        ON ajuste.clocking_origin_id = original.id
    JOIN workplace w ON ajuste.workplace_id = w.id
    JOIN area_workplace aw ON w.id = aw.workplace_id
    JOIN area ar ON aw.area_id = ar.id
    WHERE ajuste.removed = 0
      AND ajuste.customer_id = 642
      AND ajuste.clocking_origin_id IS NOT NULL
      AND ajuste.adjustment_date IS NOT NULL
      AND ajuste.reference_date >= '2025-04-01'
      AND ajuste.reference_date < '2026-04-01'
)
SELECT
    a.customer_id,
    a.area_id,
    a.area_name,
    a.reference_month,
    COUNT(*) AS total_ajustes,
    SUM(CASE WHEN a.tempo_horas < 24 THEN 1 ELSE 0 END) AS faixa_ate_1_dia,
    SUM(CASE WHEN a.tempo_horas >= 24 AND a.tempo_horas < 72 THEN 1 ELSE 0 END) AS faixa_1_3_dias,
    SUM(CASE WHEN a.tempo_horas >= 72 AND a.tempo_horas < 168 THEN 1 ELSE 0 END) AS faixa_3_7_dias,
    SUM(CASE WHEN a.tempo_horas >= 168 AND a.tempo_horas < 360 THEN 1 ELSE 0 END) AS faixa_7_15_dias,
    SUM(CASE WHEN a.tempo_horas >= 360 THEN 1 ELSE 0 END) AS faixa_mais_15_dias,
    MIN(a.tempo_horas) AS tempo_min_horas,
    MAX(a.tempo_horas) AS tempo_max_horas,
    ROUND(AVG(a.tempo_horas), 2) AS tempo_medio_horas
FROM ajustes a
GROUP BY a.customer_id, a.area_id, a.area_name, a.reference_month
ORDER BY a.reference_month, total_ajustes DESC;`;

export const evolucaoTempoTratativaSource: ChartDataSource = {
  empresa: { data: tratEmpresa as Record<string, any>[], sql: SQL_EMPRESA },
  unidade: { data: tratUnidade as Record<string, any>[], sql: SQL_UNIDADE },
  area: { data: tratArea as Record<string, any>[], sql: SQL_AREA },
};

export const evolucaoTempoTratativaColumns = [
  { key: "reference_month", label: "Mês Referência" },
  { key: "total_ajustes", label: "Total Ajustes" },
  { key: "faixa_ate_1_dia", label: "Até 1 dia" },
  { key: "faixa_1_3_dias", label: "1–3 dias" },
  { key: "faixa_3_7_dias", label: "3–7 dias" },
  { key: "faixa_7_15_dias", label: "7–15 dias" },
  { key: "faixa_mais_15_dias", label: "+15 dias" },
  { key: "tempo_medio_horas", label: "Tempo Médio (h)", format: (v: number) => `${v}h` },
];
