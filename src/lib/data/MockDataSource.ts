/**
 * MockDataSource — serves the bundled Aurora snapshot.
 *
 * Shape is identical to what the ApiDataSource returns when the backend
 * is in MOCK_MODE. Both read ultimately from the same master JSON
 * (exported by docs/export_gold_to_json.sql). Keeping the data in-repo
 * on the front side lets the dashboard work offline and keeps PR
 * previews fully functional.
 */

import rawSnapshot from "@/data/aurora-real/vig-eyes-642.json";
import type { DataSource } from "./DataSource";
import type {
  GoldQuery,
  GoldResponse,
  GoldTable,
  HealthResponse,
  InsightsQuery,
  InsightsResponse,
  Period,
} from "./types";
import type {
  AnalyticsInsightRow,
  GoldRowFor,
} from "./goldTables.types";

/** The bundled snapshot is keyed by table name → rows. */
type Snapshot = Readonly<Record<string, readonly unknown[]>>;
const snapshot = rawSnapshot as unknown as Snapshot;

function buildEnvelope<T>(args: {
  table: string;
  customer_id: number;
  period: Period | null;
  rows: readonly T[];
}) {
  return {
    table: args.table,
    customer_id: args.customer_id,
    generated_at: new Date().toISOString(),
    period: args.period,
    count: args.rows.length,
    rows: args.rows,
  };
}

function filterGold(
  rows: readonly unknown[],
  params: GoldQuery,
): readonly unknown[] {
  return rows.filter((row): row is Record<string, unknown> => {
    if (typeof row !== "object" || row === null) return false;
    const r = row as Record<string, unknown>;
    if (params.dim_type && r.dim_type !== params.dim_type) return false;
    if (params.dim_id !== undefined && r.dim_id !== params.dim_id) return false;
    const ref = typeof r.reference_month === "string" ? r.reference_month : "";
    if (params.start && ref < params.start) return false;
    if (params.end && ref >= params.end) return false;
    return true;
  });
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

  async getGold<T extends GoldTable>(
    table: T,
    query: GoldQuery,
  ): Promise<GoldResponse<T>> {
    const rows = snapshot[table] ?? [];
    const filtered = filterGold(rows, query) as readonly GoldRowFor<T>[];
    const period: Period | null =
      query.start && query.end
        ? { start: query.start, end: query.end }
        : null;
    return buildEnvelope({
      table,
      customer_id: query.customer_id,
      period,
      rows: filtered,
    });
  },

  async getInsights(query: InsightsQuery): Promise<InsightsResponse> {
    const raw = (snapshot.analytics_insights ?? []) as readonly AnalyticsInsightRow[];
    const rows = query.chart
      ? raw.filter((r) => r.chart === query.chart)
      : raw;
    return buildEnvelope({
      table: "analytics_insights",
      customer_id: query.customer_id,
      period: null,
      rows,
    });
  },
};
