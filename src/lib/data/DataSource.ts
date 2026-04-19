/**
 * DataSource interface.
 *
 * The canonical abstraction for reading gold tables + insights. Two
 * implementations today:
 *   - MockDataSource: serves the bundled JSONs under src/data/customers/642
 *   - ApiDataSource:  fetches the nexti-analytics-api HTTP endpoints
 *
 * Consumers depend on this interface, not on concrete imports, so flipping
 * the source is a config change (VITE_USE_MOCK_DATA).
 */

import type {
  AnalyticsResponse,
  GoldQuery,
  GoldTable,
  HealthResponse,
  InsightsQuery,
} from "./types";

export interface DataSource {
  /** Human-readable label for logging/debugging. */
  readonly name: "mock" | "api";

  /** Probe the data source. Mock always ok; Api pings /api/health. */
  health(): Promise<HealthResponse>;

  /** Fetch a gold table for the active tenant. */
  getGold(table: GoldTable, query: GoldQuery): Promise<AnalyticsResponse>;

  /** Fetch tenant insights, optionally filtered by chart id. */
  getInsights(query: InsightsQuery): Promise<AnalyticsResponse>;
}
