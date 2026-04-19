/**
 * Type contracts for the analytics data layer.
 *
 * Row shapes live in ./goldTables.types.ts — they mirror the real
 * Aurora columns. The wrapper types here are the HTTP envelope shared
 * by MockDataSource and ApiDataSource.
 */

import type { DimType, GoldTableRowMap, AnalyticsInsightRow } from "./goldTables.types";

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

/** Row type associated with a given gold table. */
export type GoldRowFor<T extends GoldTable> = GoldTableRowMap[T];

export interface Period {
  readonly start: string; // YYYY-MM-DD
  readonly end: string; // YYYY-MM-DD
}

export interface AnalyticsResponse<T> {
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

export type GoldResponse<T extends GoldTable> = AnalyticsResponse<GoldRowFor<T>>;
export type InsightsResponse = AnalyticsResponse<AnalyticsInsightRow>;
