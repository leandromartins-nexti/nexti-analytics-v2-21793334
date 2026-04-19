/**
 * Shared type contracts for the analytics data layer.
 *
 * Types here mirror the nexti-analytics-api response shape. When the
 * Aurora DDL is finalized, the `unknown` row types tighten into
 * per-table interfaces. For now the wrapper is strict; the rows stay
 * loose on purpose so the consumer JSX keeps working unchanged.
 */

import type { DimType } from "@/config/customer";

export const GOLD_TABLES = [
  "clocking_quality_monthly",
  "clocking_treatment_time_monthly",
  "clocking_backoffice_monthly",
  "absence_volume_monthly",
  "absence_composition_monthly",
  "absence_maturity_monthly",
] as const;

export type GoldTable = (typeof GOLD_TABLES)[number];

export const INSIGHTS_TABLE = "analytics_insights" as const;
export type InsightsTable = typeof INSIGHTS_TABLE;

export interface Period {
  readonly start: string; // ISO date (YYYY-MM-DD)
  readonly end: string; // ISO date (YYYY-MM-DD)
}

export interface AnalyticsResponse<T = unknown> {
  readonly table: string;
  readonly customer_id: number;
  readonly generated_at: string; // ISO timestamp
  readonly period: Period | null;
  readonly count: number;
  readonly rows: readonly T[];
}

export interface GoldQuery {
  readonly customer_id: number;
  readonly dim_type?: DimType;
  readonly dim_id?: number;
  readonly start?: string;
  readonly end?: string;
}

export interface InsightsQuery {
  readonly customer_id: number;
  readonly chart?: string;
}

export interface HealthResponse {
  readonly status: "ok" | "degraded";
  readonly mode: "mock" | "aurora";
  readonly db: "up" | "down" | "skipped";
  readonly uptime_s: number;
  readonly service: string;
  readonly version: string;
  readonly checked_at: string;
}
