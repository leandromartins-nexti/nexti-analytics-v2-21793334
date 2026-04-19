/**
 * React Query wrappers around the active DataSource.
 *
 * Consumers call these hooks instead of fetching directly — they handle
 * caching, deduping, loading/error states, and swap source transparently
 * based on VITE_USE_MOCK_DATA.
 */

import { useQuery } from "@tanstack/react-query";
import { dataSource } from "@/lib/data";
import type {
  AnalyticsResponse,
  GoldQuery,
  GoldTable,
  HealthResponse,
  InsightsQuery,
} from "@/lib/data/types";

/** Stable cache keys. Keep `dataSource.name` in the key so mock and api
 *  answers never collide if someone flips the env mid-session. */
const keys = {
  health: () => ["analytics", dataSource.name, "health"] as const,
  gold: (table: GoldTable, query: GoldQuery) =>
    ["analytics", dataSource.name, "gold", table, query] as const,
  insights: (query: InsightsQuery) =>
    ["analytics", dataSource.name, "insights", query] as const,
};

export function useBackendHealth(options?: { refetchIntervalMs?: number }) {
  return useQuery<HealthResponse>({
    queryKey: keys.health(),
    queryFn: () => dataSource.health(),
    refetchInterval: options?.refetchIntervalMs ?? false,
    staleTime: 10_000,
    retry: 1,
  });
}

export function useGoldTable(table: GoldTable, query: GoldQuery) {
  return useQuery<AnalyticsResponse>({
    queryKey: keys.gold(table, query),
    queryFn: () => dataSource.getGold(table, query),
    staleTime: 60_000,
    retry: 1,
  });
}

export function useInsights(query: InsightsQuery) {
  return useQuery<AnalyticsResponse>({
    queryKey: keys.insights(query),
    queryFn: () => dataSource.getInsights(query),
    staleTime: 60_000,
    retry: 1,
  });
}
