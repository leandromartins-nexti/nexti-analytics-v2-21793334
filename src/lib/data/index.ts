/**
 * Data source factory.
 *
 * Picks implementation from Vite env vars at module load:
 *   VITE_USE_MOCK_DATA  "true" | "false"   (default "true")
 *   VITE_API_URL        string             (default "http://localhost:3001")
 *
 * The decision is cached — changing env vars requires a dev-server
 * restart. That's the right trade-off: no consumer ever needs to inspect
 * which source is active.
 */

import { createApiDataSource } from "./ApiDataSource";
import type { DataSource } from "./DataSource";
import { mockDataSource } from "./MockDataSource";

const rawUseMock = import.meta.env.VITE_USE_MOCK_DATA;
const useMock = rawUseMock === undefined ? true : String(rawUseMock) !== "false";

const apiUrl =
  (import.meta.env.VITE_API_URL as string | undefined) ??
  "http://localhost:3001";

export const dataSource: DataSource = useMock
  ? mockDataSource
  : createApiDataSource(apiUrl);

export const dataSourceConfig = {
  mode: useMock ? ("mock" as const) : ("api" as const),
  apiUrl: useMock ? null : apiUrl,
};

export type { DataSource } from "./DataSource";
export type {
  AnalyticsResponse,
  GoldQuery,
  GoldTable,
  HealthResponse,
  InsightsQuery,
  Period,
} from "./types";
export { GOLD_TABLES, INSIGHTS_TABLE } from "./types";
export { ApiError } from "./ApiDataSource";
