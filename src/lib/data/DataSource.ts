/**
 * DataSource interface.
 *
 * The canonical abstraction for reading gold tables + insights. Two
 * implementations today:
 *   - MockDataSource: serves the bundled Aurora snapshot at
 *     src/data/aurora-real/vig-eyes-642.json
 *   - ApiDataSource:  fetches the nexti-analytics-api HTTP endpoints
 *
 * Consumers depend on this interface, not on concrete imports, so flipping
 * the source is a config change (VITE_USE_MOCK_DATA).
 */

import type {
  GoldQuery,
  GoldResponse,
  GoldTable,
  HealthResponse,
  InsightsQuery,
  InsightsResponse,
} from "./types";

export interface DataSource {
  /** Human-readable label for logging/debugging. */
  readonly name: "mock" | "api";

  /** Probe the data source. Mock always ok; Api pings /api/health. */
  health(): Promise<HealthResponse>;

  /** Fetch a gold table for the active tenant. */
  getGold<T extends GoldTable>(
    table: T,
    query: GoldQuery,
  ): Promise<GoldResponse<T>>;

  /** Fetch tenant insights, optionally filtered by chart id. */
  getInsights(query: InsightsQuery): Promise<InsightsResponse>;
}
