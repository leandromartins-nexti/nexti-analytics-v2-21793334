/**
 * ApiDataSource — fetches from the nexti-analytics-api HTTP endpoints.
 *
 * Used when VITE_USE_MOCK_DATA=false. The base URL comes from
 * VITE_API_URL (defaults to http://localhost:3001). The server must be
 * on the same origin declared in its CORS_ORIGIN.
 */

import type { DataSource } from "./DataSource";
import type {
  GoldQuery,
  GoldResponse,
  GoldTable,
  HealthResponse,
  InsightsQuery,
  InsightsResponse,
} from "./types";

export class ApiError extends Error {
  readonly status: number;
  readonly code: string;
  readonly details: unknown;
  constructor(status: number, code: string, message: string, details?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

interface ApiErrorBody {
  error: { code: string; message: string; details?: unknown };
}

function isApiErrorBody(value: unknown): value is ApiErrorBody {
  if (typeof value !== "object" || value === null) return false;
  const v = value as Record<string, unknown>;
  if (typeof v.error !== "object" || v.error === null) return false;
  const e = v.error as Record<string, unknown>;
  return typeof e.code === "string" && typeof e.message === "string";
}

async function parseErrorOrThrow(response: Response): Promise<never> {
  let body: unknown = null;
  try {
    body = await response.json();
  } catch {
    throw new ApiError(response.status, "NETWORK_ERROR", response.statusText);
  }
  if (isApiErrorBody(body)) {
    throw new ApiError(
      response.status,
      body.error.code,
      body.error.message,
      body.error.details,
    );
  }
  throw new ApiError(response.status, "UNKNOWN_ERROR", response.statusText);
}

function buildQueryString(
  params: Record<string, string | number | undefined>,
): string {
  const entries = Object.entries(params).filter(
    ([, v]) => v !== undefined && v !== "",
  ) as [string, string | number][];
  if (entries.length === 0) return "";
  const usp = new URLSearchParams();
  for (const [k, v] of entries) usp.set(k, String(v));
  return `?${usp.toString()}`;
}

export function createApiDataSource(baseUrl: string): DataSource {
  const base = baseUrl.replace(/\/+$/, "");

  async function getJson<T>(path: string): Promise<T> {
    const res = await fetch(`${base}${path}`, {
      method: "GET",
      headers: { Accept: "application/json" },
    });
    if (!res.ok) await parseErrorOrThrow(res);
    return (await res.json()) as T;
  }

  return {
    name: "api",

    async health(): Promise<HealthResponse> {
      return getJson<HealthResponse>("/api/health");
    },

    async getGold<T extends GoldTable>(
      table: T,
      query: GoldQuery,
    ): Promise<GoldResponse<T>> {
      const qs = buildQueryString({
        customer_id: query.customer_id,
        dim_type: query.dim_type,
        dim_id: query.dim_id,
        start: query.start,
        end: query.end,
      });
      return getJson<GoldResponse<T>>(`/api/analytics/gold/${table}${qs}`);
    },

    async getInsights(query: InsightsQuery): Promise<InsightsResponse> {
      const qs = buildQueryString({
        customer_id: query.customer_id,
        chart: query.chart,
      });
      return getJson<InsightsResponse>(`/api/analytics/insights${qs}`);
    },
  };
}
