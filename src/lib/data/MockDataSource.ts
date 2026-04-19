/**
 * MockDataSource — reads bundled JSONs under src/data/customers/642.
 *
 * Used when VITE_USE_MOCK_DATA=true (default). The shape mirrors the
 * backend response wrapper so consumers cannot tell the difference.
 *
 * When the Aurora-era row shape lands, the per-table mappers here are
 * the single place that needs to be updated.
 */

import type { DimType } from "@/config/customer";
import type { DataSource } from "./DataSource";
import type {
  AnalyticsResponse,
  GoldQuery,
  GoldTable,
  HealthResponse,
  InsightsQuery,
} from "./types";

// ── Qualidade do ponto ──────────────────────────────────
import hcEmpresa from "@/data/customers/642/qualidade-ponto/headcount-por-empresa.json";
import hcUnidade from "@/data/customers/642/qualidade-ponto/headcount-por-un-negocio.json";
import hcArea from "@/data/customers/642/qualidade-ponto/headcount-por-area.json";
import tratTempoEmpresa from "@/data/customers/642/qualidade-ponto/tratativa-tempo-por-empresa.json";
import tratTempoUnidade from "@/data/customers/642/qualidade-ponto/tratativa-tempo-por-un-negocio.json";
import tratTempoArea from "@/data/customers/642/qualidade-ponto/tratativa-tempo-por-area.json";
import sobrecargaEmpresa from "@/data/customers/642/qualidade-ponto/sobrecarga-por-empresa.json";
import sobrecargaUnidade from "@/data/customers/642/qualidade-ponto/sobrecarga-por-un-negocio.json";
import sobrecargaArea from "@/data/customers/642/qualidade-ponto/sobrecarga-por-area.json";

// ── Absenteísmo ─────────────────────────────────────────
import volumeEmpresa from "@/data/customers/642/absenteismo/volume-mensal-por-empresa.json";
import volumeUnidade from "@/data/customers/642/absenteismo/volume-mensal-por-un-negocio.json";
import volumeArea from "@/data/customers/642/absenteismo/volume-mensal-por-area.json";
import composicaoEmpresa from "@/data/customers/642/absenteismo/composicao-por-empresa.json";
import composicaoUnidade from "@/data/customers/642/absenteismo/composicao-por-un-negocio.json";
import composicaoArea from "@/data/customers/642/absenteismo/composicao-por-area.json";
import maturidadeEmpresa from "@/data/customers/642/absenteismo/maturidade-por-empresa.json";
import maturidadeUnidade from "@/data/customers/642/absenteismo/maturidade-por-un-negocio.json";
import maturidadeArea from "@/data/customers/642/absenteismo/maturidade-por-area.json";

// ── Insights ────────────────────────────────────────────
import insights642 from "@/data/customers/642/qualidade-ponto/insights.json";

type RowSet = Record<DimType, readonly unknown[] | undefined>;

const FIXTURES: Record<GoldTable, Partial<RowSet>> = {
  clocking_quality_monthly: {
    COMPANY: hcEmpresa as unknown[],
    BUSINESS_UNIT: hcUnidade as unknown[],
    AREA: hcArea as unknown[],
  },
  clocking_treatment_time_monthly: {
    COMPANY: tratTempoEmpresa as unknown[],
    BUSINESS_UNIT: tratTempoUnidade as unknown[],
    AREA: tratTempoArea as unknown[],
  },
  clocking_backoffice_monthly: {
    COMPANY: sobrecargaEmpresa as unknown[],
    BUSINESS_UNIT: sobrecargaUnidade as unknown[],
    AREA: sobrecargaArea as unknown[],
  },
  absence_volume_monthly: {
    COMPANY: volumeEmpresa as unknown[],
    BUSINESS_UNIT: volumeUnidade as unknown[],
    AREA: volumeArea as unknown[],
  },
  absence_composition_monthly: {
    COMPANY: composicaoEmpresa as unknown[],
    BUSINESS_UNIT: composicaoUnidade as unknown[],
    AREA: composicaoArea as unknown[],
  },
  absence_maturity_monthly: {
    COMPANY: maturidadeEmpresa as unknown[],
    BUSINESS_UNIT: maturidadeUnidade as unknown[],
    AREA: maturidadeArea as unknown[],
  },
};

function wrap(
  table: string,
  customer_id: number,
  rows: readonly unknown[],
  period: { start: string; end: string } | null = null,
): AnalyticsResponse {
  return {
    table,
    customer_id,
    generated_at: new Date().toISOString(),
    period,
    count: rows.length,
    rows,
  };
}

export const mockDataSource: DataSource = {
  name: "mock",

  async health(): Promise<HealthResponse> {
    return {
      status: "ok",
      mode: "mock",
      db: "skipped",
      uptime_s: 0,
      service: "frontend-mock",
      version: "0.1.0",
      checked_at: new Date().toISOString(),
    };
  },

  async getGold(table, query): Promise<AnalyticsResponse> {
    const dimType = query.dim_type ?? "COMPANY";
    const rows = FIXTURES[table]?.[dimType] ?? [];
    const period =
      query.start && query.end ? { start: query.start, end: query.end } : null;
    return wrap(table, query.customer_id, rows, period);
  },

  async getInsights(query): Promise<AnalyticsResponse> {
    const rows = query.chart
      ? (insights642 as unknown[]).filter((r) => {
          if (typeof r !== "object" || r === null) return false;
          return (r as Record<string, unknown>).chart === query.chart;
        })
      : (insights642 as unknown[]);
    return wrap("analytics_insights", query.customer_id, rows);
  },
};
