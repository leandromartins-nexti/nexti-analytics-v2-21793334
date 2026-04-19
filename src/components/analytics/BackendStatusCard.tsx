/**
 * Dev-facing card that proves the front is wired to the right data source.
 *
 * Mounted in Configuração → Base de Dados. Fetches health + a tiny sample
 * count from each gold table through `useAnalyticsData`. When
 * VITE_USE_MOCK_DATA=false, every value here comes through HTTP from the
 * nexti-analytics-api.
 */

import { useMemo } from "react";
import { CheckCircle2, XCircle, Loader2, Database, Cloud } from "lucide-react";
import { CURRENT_CUSTOMER } from "@/config/customer";
import { dataSourceConfig } from "@/lib/data";
import { GOLD_TABLES } from "@/lib/data/types";
import {
  useBackendHealth,
  useGoldTable,
  useInsights,
} from "@/hooks/useAnalyticsData";

function StatusPill({
  loading,
  ok,
  label,
}: {
  loading: boolean;
  ok: boolean;
  label: string;
}) {
  const Icon = loading ? Loader2 : ok ? CheckCircle2 : XCircle;
  const tone = loading
    ? "text-muted-foreground"
    : ok
      ? "text-emerald-600"
      : "text-rose-600";
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs ${tone}`}>
      <Icon className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
      {label}
    </span>
  );
}

function GoldTableRow({ table }: { table: (typeof GOLD_TABLES)[number] }) {
  const query = useGoldTable(table, {
    customer_id: CURRENT_CUSTOMER.customer_id,
    dim_type: CURRENT_CUSTOMER.primary_dim_type,
  });
  return (
    <div className="flex items-center justify-between py-1.5 text-xs border-b border-border/60 last:border-b-0">
      <code className="font-mono text-muted-foreground">{table}</code>
      {query.isLoading && (
        <StatusPill loading ok={false} label="carregando…" />
      )}
      {query.isError && (
        <StatusPill loading={false} ok={false} label="falhou" />
      )}
      {query.isSuccess && (
        <span className="text-foreground font-medium">
          {query.data.count.toLocaleString("pt-BR")} rows
        </span>
      )}
    </div>
  );
}

export default function BackendStatusCard() {
  const health = useBackendHealth({ refetchIntervalMs: 15_000 });
  const insights = useInsights({ customer_id: CURRENT_CUSTOMER.customer_id });

  const modeIcon = dataSourceConfig.mode === "api" ? Cloud : Database;
  const ModeIcon = modeIcon;

  const healthOk = health.isSuccess && health.data.status === "ok";

  const modeLabel = useMemo(() => {
    if (dataSourceConfig.mode === "mock") return "Mock (bundled JSONs)";
    return `API · ${dataSourceConfig.apiUrl}`;
  }, []);

  return (
    <div className="rounded-lg border border-border bg-white p-4 mb-4">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <ModeIcon className="w-4 h-4 text-[#FF5722]" />
            Fonte de dados
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">{modeLabel}</p>
        </div>
        <div className="flex flex-col items-end gap-1">
          {health.isLoading && (
            <StatusPill loading ok={false} label="sondando…" />
          )}
          {health.isError && (
            <StatusPill loading={false} ok={false} label="offline" />
          )}
          {health.isSuccess && (
            <>
              <StatusPill
                loading={false}
                ok={healthOk}
                label={`${health.data.status} · ${health.data.mode}`}
              />
              {health.data.db !== "skipped" && (
                <span className="text-[11px] text-muted-foreground">
                  DB: {health.data.db}
                </span>
              )}
            </>
          )}
        </div>
      </div>

      <div className="bg-muted/30 rounded-md px-3 py-2">
        <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider mb-1">
          Gold tables · tenant {CURRENT_CUSTOMER.customer_id} ({CURRENT_CUSTOMER.name})
        </p>
        {GOLD_TABLES.map((t) => (
          <GoldTableRow key={t} table={t} />
        ))}
        <div className="flex items-center justify-between py-1.5 text-xs mt-1 border-t border-border/60">
          <code className="font-mono text-muted-foreground">analytics_insights</code>
          {insights.isLoading && (
            <StatusPill loading ok={false} label="carregando…" />
          )}
          {insights.isError && (
            <StatusPill loading={false} ok={false} label="falhou" />
          )}
          {insights.isSuccess && (
            <span className="text-foreground font-medium">
              {insights.data.count.toLocaleString("pt-BR")} insights
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
