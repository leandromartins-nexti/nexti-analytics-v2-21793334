/**
 * FeriasTabContent — aba "Férias" da tela Operacional
 *
 * Layout:
 *   Linha 1: 6 Big Numbers
 *   Linha 2: Mapa de Operações | Composição da Cobertura
 *   Linha 3: Disciplina de Planejamento | Risco Trabalhista
 *
 * Dados: fetch de /data/ferias/{resumo,cobertura,disciplina,risco}.json
 */
import { useEffect, useMemo, useState } from "react";
import {
  ResponsiveContainer, ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid,
  Tooltip as RechartsTooltip, Legend, ReferenceLine, ScatterChart, Scatter,
  ZAxis, Cell,
} from "recharts";
import { Filter } from "lucide-react";
import InfoTip from "@/components/analytics/InfoTip";

// ── Tipagens ──
interface ResumoData {
  periodo: { inicio: string; fim: string; label: string };
  score_ferias: { valor: number; label: string; delta_pp_vs_anterior: number; comentario: string };
  volume_total_ferias: { valor: number; label: string; comentario: string };
  horas_cobertura_he_pct: { valor: number; unidade: string; label: string; comentario: string };
  antecedencia_media_dias: { valor: number; unidade: string; label: string; comentario: string };
  ferias_com_ponto_batido_pct: { valor: number; unidade: string; label: string; comentario: string };
  ferias_sem_cobertura_pct: { valor: number; unidade: string; label: string; comentario: string };
}

interface CoberturaMes {
  mes: string;
  ferista_dedicado_h: number;
  remanejo_h: number;
  overtime_h: number;
  total_horas_cobertura: number;
  pct_he_sobre_cobertura: number;
  qtd_feristas_dedicados: number;
  qtd_remanejadores: number;
  ferias_sem_cobertura_qtd: number;
  ferias_sem_cobertura_pct: number;
  ferias_total_mes: number;
}

interface CoberturaData {
  periodo: { inicio: string; fim: string };
  totais_periodo: Record<string, number>;
  serie_mensal: CoberturaMes[];
}

interface DisciplinaMes {
  mes: string;
  antecipada_mais_30d: number;
  razoavel_16_30d: number;
  apertada_8_15d: number;
  ultima_hora_0_7d: number;
  total_ferias: number;
  pct_ultima_hora: number;
  antecedencia_media_dias: number;
}

interface DisciplinaData {
  periodo: { inicio: string; fim: string };
  totais_periodo: Record<string, number>;
  serie_mensal: DisciplinaMes[];
  configuracao: { meta_pct_ultima_hora: number; faixas: Record<string, string> };
}

interface RiscoMes {
  mes: string;
  ferias_com_ponto_batido: number;
  ferias_sem_cobertura_identificada: number;
  ferias_equivalentes_com_he: number;
  total_ferias_no_mes: number;
  ponto_batido_ocorrencias_total: number;
  overtime_horas: number;
  pct_efetivo_afetado_ponto_batido: number;
}

interface RiscoData {
  periodo: { inicio: string; fim: string };
  totais_periodo: Record<string, number>;
  serie_mensal: RiscoMes[];
  configuracao: { tolerancia_pct_efetivo_afetado: number };
}

// ── Mapa de meses ISO -> label ──
const MES_LABEL: Record<string, string> = {
  "2025-04-01": "abr/25", "2025-05-01": "mai/25", "2025-06-01": "jun/25",
  "2025-07-01": "jul/25", "2025-08-01": "ago/25", "2025-09-01": "set/25",
  "2025-10-01": "out/25", "2025-11-01": "nov/25", "2025-12-01": "dez/25",
  "2026-01-01": "jan/26", "2026-02-01": "fev/26", "2026-03-01": "mar/26",
};

const fmtNum = (n: number) => n.toLocaleString("pt-BR");
const fmtH = (n: number) => `${Math.round(n).toLocaleString("pt-BR")}h`;
const fmtHCompact = (n: number) => {
  if (n >= 1000) return `${(n / 1000).toFixed(0)}k`;
  return `${n}`;
};
const fmtPct = (n: number) => `${n.toFixed(1).replace(".", ",")}%`;

// ── Cores ──
const COLORS = {
  feristaDedicado: "#15803d",
  remanejo: "#86efac",
  he: "#f97316",
  heLine: "#ea580c",
  antecipada: "#15803d",
  razoavel: "#86efac",
  apertada: "#eab308",
  ultimaHora: "#dc2626",
  pontoBatido: "#dc2626",
  semCobertura: "#f97316",
  comHe: "#eab308",
  metaLine: "#9ca3af",
  good: "#15803d",
  warn: "#f59e0b",
  bad: "#dc2626",
};

// ── Bolhas mockadas Mapa de Operações ──
const MAPA_BUBBLES = [
  { sigla: "SEG", nome: "SEGURANÇA PATRIMONIAL", headcount: 18, score: 73 },
  { sigla: "TER", nome: "TERCEIRIZAÇÃO", headcount: 22, score: 69 },
  { sigla: "POR", nome: "PORTARIA E LIMPEZA", headcount: 250, score: 50 },
];

function bubbleColor(score: number): string {
  if (score >= 70) return COLORS.good;
  if (score >= 50) return COLORS.warn;
  return COLORS.bad;
}

// ── Mapeamentos de label de status do Big Number ──
const STATUS_COLOR: Record<string, string> = {
  Bom: "text-green-600",
  Atenção: "text-orange-500",
  Crítico: "text-red-600",
  Período: "text-muted-foreground",
};

function StatusLabel({ label }: { label: string }) {
  return (
    <p className={`text-[11px] mt-0.5 font-medium ${STATUS_COLOR[label] ?? "text-muted-foreground"}`}>
      {label}
    </p>
  );
}

// ── Header Filtros (visual, não funcional) ──
function HeaderFilters() {
  return (
    <div className="flex items-center justify-between gap-2 mb-3 flex-wrap">
      <div className="flex items-center gap-2">
        <Filter className="w-4 h-4 text-muted-foreground" />
        <span className="text-xs text-muted-foreground">Período:</span>
        <span className="text-xs font-medium bg-card border border-border/50 rounded-md px-2 py-1">
          Últimos 12 meses
        </span>
      </div>
      <div className="flex items-center gap-1 bg-card border border-border/50 rounded-md p-0.5">
        <button disabled className="text-[11px] px-2 py-1 rounded text-muted-foreground/60 cursor-not-allowed">Empresa</button>
        <button disabled className="text-[11px] px-2 py-1 rounded bg-[#FF5722] text-white">Un. Negócio</button>
        <button disabled className="text-[11px] px-2 py-1 rounded text-muted-foreground/60 cursor-not-allowed">Área</button>
      </div>
    </div>
  );
}

// ── Card Container padrão ──
function ChartCard({
  title, subtitle, info, badge, children,
}: {
  title: string;
  subtitle?: string;
  info?: string;
  badge?: { text: string; bg: string; color: string };
  children: React.ReactNode;
}) {
  return (
    <div className="bg-card border border-border/50 rounded-xl p-4 flex flex-col">
      <div className="flex items-start justify-between mb-1 gap-2">
        <div className="flex items-center gap-1.5">
          <h4 className="text-sm font-semibold">{title}</h4>
          {info && <InfoTip text={info} />}
        </div>
        {badge && (
          <span
            className="text-[10px] font-medium rounded-full px-2 py-0.5 whitespace-nowrap"
            style={{ background: badge.bg, color: badge.color }}
          >
            {badge.text}
          </span>
        )}
      </div>
      {subtitle && <p className="text-[10px] text-muted-foreground mb-2">{subtitle}</p>}
      <div className="flex-1">{children}</div>
    </div>
  );
}

// ── Skeleton genérico ──
function CardSkeleton({ height = 280 }: { height?: number }) {
  return (
    <div className="bg-card border border-border/50 rounded-xl p-4 animate-pulse">
      <div className="h-4 w-1/3 bg-muted rounded mb-2" />
      <div className="h-3 w-1/2 bg-muted rounded mb-4" />
      <div className="bg-muted rounded" style={{ height }} />
    </div>
  );
}

function ErrorState({ message }: { message: string }) {
  return (
    <div className="flex items-center justify-center h-[280px] text-xs text-muted-foreground">
      {message}
    </div>
  );
}

// ── Hook genérico de fetch JSON ──
function useJsonFetch<T>(url: string): { data: T | null; loading: boolean; error: string | null } {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    fetch(url)
      .then(r => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then(json => {
        if (!cancelled) {
          setData(json as T);
          setLoading(false);
        }
      })
      .catch(err => {
        if (!cancelled) {
          setError(err.message || "Erro ao carregar dados");
          setLoading(false);
        }
      });
    return () => { cancelled = true; };
  }, [url]);

  return { data, loading, error };
}

// ────────────────────────────────────────────────────────────
// Big Numbers (linha 1)
// ────────────────────────────────────────────────────────────
function BigNumbersRow({ data }: { data: ResumoData }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-6 gap-3">
      {/* 1. Score Férias */}
      <div className="bg-card border border-border/50 rounded-xl p-4 hover:shadow-lg hover:-translate-y-0.5 transition-all flex flex-col">
        <div className="flex items-center gap-1 mb-2">
          <p className="text-[10px] font-semibold text-muted-foreground tracking-wide uppercase">Score Férias</p>
          <InfoTip text="Score composto de gestão de férias. Considera planejamento, cobertura e exposição trabalhista. Quanto maior, melhor." />
        </div>
        <p className="text-xl font-bold mt-0.5 truncate text-orange-500">{data.score_ferias.valor}</p>
        <StatusLabel label={data.score_ferias.label} />
        <span className="text-[10px] flex items-center gap-0.5 mt-1 text-red-600">
          ↓ {Math.abs(data.score_ferias.delta_pp_vs_anterior)}pp vs ant.
        </span>
        <p className="text-[10px] text-muted-foreground mt-1 line-clamp-2">{data.score_ferias.comentario}</p>
      </div>

      {/* 2. Volume Total Férias */}
      <div className="bg-card border border-border/50 rounded-xl p-4 hover:shadow-lg hover:-translate-y-0.5 transition-all flex flex-col">
        <div className="flex items-center gap-1 mb-2">
          <p className="text-[10px] font-semibold text-muted-foreground tracking-wide uppercase">Volume Total Férias</p>
          <InfoTip text="Quantidade de férias iniciadas no período analisado." />
        </div>
        <p className="text-xl font-bold mt-0.5 truncate text-foreground">{fmtNum(data.volume_total_ferias.valor)}</p>
        <StatusLabel label={data.volume_total_ferias.label} />
        <p className="text-[10px] text-muted-foreground mt-1 line-clamp-2">{data.volume_total_ferias.comentario}</p>
      </div>

      {/* 3. % HE na Cobertura */}
      <div className="bg-card border border-border/50 rounded-xl p-4 hover:shadow-lg hover:-translate-y-0.5 transition-all flex flex-col">
        <div className="flex items-center gap-1 mb-2">
          <p className="text-[10px] font-semibold text-muted-foreground tracking-wide uppercase">% HE na Cobertura</p>
          <InfoTip text="Percentual de horas extras sobre o total de horas de cobertura de férias." />
        </div>
        <p className="text-xl font-bold mt-0.5 truncate text-green-600">
          {data.horas_cobertura_he_pct.valor.toFixed(2).replace(".", ",")}%
        </p>
        <StatusLabel label={data.horas_cobertura_he_pct.label} />
        <p className="text-[10px] text-muted-foreground mt-1 line-clamp-2">{data.horas_cobertura_he_pct.comentario}</p>
      </div>

      {/* 4. Antecedência Média */}
      <div className="bg-card border border-border/50 rounded-xl p-4 hover:shadow-lg hover:-translate-y-0.5 transition-all flex flex-col">
        <div className="flex items-center gap-1 mb-2">
          <p className="text-[10px] font-semibold text-muted-foreground tracking-wide uppercase">Antecedência Média</p>
          <InfoTip text="Tempo médio entre o lançamento da férias no sistema e seu início efetivo." />
        </div>
        <p className="text-xl font-bold mt-0.5 truncate text-red-600">
          {data.antecedencia_media_dias.valor.toString().replace(".", ",")} dias
        </p>
        <StatusLabel label={data.antecedencia_media_dias.label} />
        <p className="text-[10px] text-muted-foreground mt-1 line-clamp-2">{data.antecedencia_media_dias.comentario}</p>
      </div>

      {/* 5. % Ponto Batido em Férias */}
      <div className="bg-card border border-border/50 rounded-xl p-4 hover:shadow-lg hover:-translate-y-0.5 transition-all flex flex-col">
        <div className="flex items-center gap-1 mb-2">
          <p className="text-[10px] font-semibold text-muted-foreground tracking-wide uppercase">% Ponto Batido em Férias</p>
          <InfoTip text="Percentual de férias com ponto batido pelo titular durante o período de férias." />
        </div>
        <p className="text-xl font-bold mt-0.5 truncate text-red-600">
          {data.ferias_com_ponto_batido_pct.valor.toString().replace(".", ",")}%
        </p>
        <StatusLabel label={data.ferias_com_ponto_batido_pct.label} />
        <p className="text-[10px] text-muted-foreground mt-1 line-clamp-2">{data.ferias_com_ponto_batido_pct.comentario}</p>
      </div>

      {/* 6. % Sem Cobertura Formal */}
      <div className="bg-card border border-border/50 rounded-xl p-4 hover:shadow-lg hover:-translate-y-0.5 transition-all flex flex-col">
        <div className="flex items-center gap-1 mb-2">
          <p className="text-[10px] font-semibold text-muted-foreground tracking-wide uppercase">% Sem Cobertura Formal</p>
          <InfoTip text="Percentual de férias sem cobertura formal cadastrada no sistema." />
        </div>
        <p className="text-xl font-bold mt-0.5 truncate text-orange-500">
          {data.ferias_sem_cobertura_pct.valor.toFixed(1).replace(".", ",")}%
        </p>
        <StatusLabel label={data.ferias_sem_cobertura_pct.label} />
        <p className="text-[10px] text-muted-foreground mt-1 line-clamp-2">{data.ferias_sem_cobertura_pct.comentario}</p>
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────
// Mapa de Operações (Linha 2 esq)
// ────────────────────────────────────────────────────────────
function MapaOperacoesCard() {
  const data = MAPA_BUBBLES.map(b => ({ ...b, color: bubbleColor(b.score) }));

  return (
    <ChartCard
      title="Mapa de Operações"
      subtitle="Headcount × Score Férias · uma bolha por un. negócio · consolidado"
      info="Cada bolha é uma unidade de negócio. Posição horizontal = headcount. Posição vertical = Score Férias. Cor reforça a classificação."
    >
      <ResponsiveContainer width="100%" height={280}>
        <ScatterChart margin={{ top: 10, right: 50, bottom: 20, left: 10 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            type="number" dataKey="headcount" name="Headcount"
            domain={[0, 300]} ticks={[0, 50, 100, 150, 200, 250, 300]}
            tick={{ fontSize: 11, fill: "#374151" }}
            label={{ value: "Headcount", position: "insideBottom", offset: -10, fontSize: 11, fill: "#374151" }}
          />
          <YAxis
            type="number" dataKey="score" name="Score Férias"
            domain={[0, 100]} ticks={[0, 25, 50, 75, 100]}
            tick={{ fontSize: 11, fill: "#374151" }}
            label={{ value: "Score Férias", angle: -90, position: "insideLeft", fontSize: 11, fill: "#374151" }}
          />
          <ZAxis type="number" range={[400, 1200]} dataKey="headcount" />
          <ReferenceLine
            y={70}
            stroke={COLORS.good}
            strokeWidth={1.5}
            strokeDasharray="4 4"
            label={({ viewBox }: any) => {
              const { x, y, width } = viewBox || {};
              const right = (x ?? 0) + (width ?? 0);
              return (
                <text x={right - 4} y={(y ?? 0) - 4} fontSize={10} fill={COLORS.good} fontWeight={500} textAnchor="end">
                  Limite saudável
                </text>
              );
            }}
          />
          <RechartsTooltip
            cursor={{ strokeDasharray: "3 3" }}
            content={({ active, payload }) => {
              if (!active || !payload?.length) return null;
              const d = payload[0].payload;
              return (
                <div className="bg-white border border-border/50 rounded-md p-3 shadow-md text-xs space-y-1">
                  <p className="font-semibold">{d.nome}</p>
                  <p>Headcount: <span className="font-medium">{d.headcount}</span></p>
                  <p>Score: <span className="font-bold" style={{ color: d.color }}>{d.score}</span></p>
                </div>
              );
            }}
          />
          <Scatter
            data={data}
            shape={(props: any) => {
              const { cx, cy, payload } = props;
              const r = Math.max(16, Math.min(32, 16 + (payload.headcount / 300) * 16));
              return (
                <g>
                  <circle cx={cx} cy={cy} r={r} fill={payload.color} fillOpacity={0.75} stroke={payload.color} strokeWidth={1.5} />
                  <text x={cx} y={cy - 3} textAnchor="middle" fontSize={10} fontWeight={700} fill="#fff" dominantBaseline="middle">
                    {payload.sigla}
                  </text>
                  <text x={cx} y={cy + 9} textAnchor="middle" fontSize={9} fontWeight={600} fill="#fff" dominantBaseline="middle">
                    {payload.score}
                  </text>
                </g>
              );
            }}
          />
        </ScatterChart>
      </ResponsiveContainer>
      <div className="flex items-center justify-center gap-3 mt-1 text-[11px]">
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full inline-block" style={{ background: COLORS.good }} />≥ 70</span>
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full inline-block" style={{ background: COLORS.warn }} />50-70</span>
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full inline-block" style={{ background: COLORS.bad }} />&lt; 50</span>
      </div>
    </ChartCard>
  );
}

// ────────────────────────────────────────────────────────────
// Composição da Cobertura (Linha 2 dir)
// ────────────────────────────────────────────────────────────
function CoberturaCard() {
  const { data, loading, error } = useJsonFetch<CoberturaData>("/data/ferias/cobertura.json");

  const chartData = useMemo(() => {
    if (!data) return [];
    return data.serie_mensal.map(m => ({
      ...m,
      mesLabel: MES_LABEL[m.mes] ?? m.mes,
    }));
  }, [data]);

  if (loading) return <CardSkeleton />;
  if (error || !data) {
    return (
      <ChartCard title="Composição da Cobertura de Férias" subtitle="Como cada férias é coberta · últimos 12 meses · em horas">
        <ErrorState message={`Erro ao carregar dados: ${error ?? "sem dados"}`} />
      </ChartCard>
    );
  }

  return (
    <ChartCard
      title="Composição da Cobertura de Férias"
      subtitle="Como cada férias é coberta · últimos 12 meses · em horas"
      info="Ferista dedicado: substituto que cobre 5+ férias no ano (recurso planejado). Remanejo: substituto ocasional, hora regular. HE: hora extra paga em cobertura. Linha mostra % de HE sobre o total. Quanto menor, mais saudável."
    >
      <ResponsiveContainer width="100%" height={280}>
        <ComposedChart data={chartData} margin={{ top: 10, right: 30, bottom: 5, left: 10 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
          <XAxis dataKey="mesLabel" tick={{ fontSize: 11, fill: "#374151" }} />
          <YAxis
            yAxisId="left"
            domain={[0, 60000]}
            ticks={[0, 15000, 30000, 45000, 60000]}
            tickFormatter={(v) => fmtHCompact(v)}
            tick={{ fontSize: 11, fill: "#374151" }}
            label={{ value: "Horas de cobertura", angle: -90, position: "insideLeft", fontSize: 11, fill: "#374151", offset: 0 }}
          />
          <YAxis
            yAxisId="right" orientation="right"
            domain={[0, 5]} ticks={[0, 1, 2, 3, 4, 5]}
            tickFormatter={(v) => `${v}%`}
            tick={{ fontSize: 11, fill: "#374151" }}
            label={{ value: "% HE", angle: 90, position: "insideRight", fontSize: 11, fill: "#374151" }}
          />
          <RechartsTooltip
            content={({ active, payload, label }) => {
              if (!active || !payload?.length) return null;
              const d = payload[0].payload as CoberturaMes & { mesLabel: string };
              return (
                <div className="bg-white border border-border/50 rounded-md p-3 shadow-md text-xs space-y-1 min-w-[240px]">
                  <p className="font-semibold">{label}</p>
                  <p>Total de cobertura: <span className="font-medium">{fmtH(d.total_horas_cobertura)}</span></p>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5" style={{ background: COLORS.feristaDedicado }} />
                    <span className="text-muted-foreground">Ferista dedicado:</span>
                    <span className="font-medium">{fmtH(d.ferista_dedicado_h)} · {d.qtd_feristas_dedicados} pessoas</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5" style={{ background: COLORS.remanejo }} />
                    <span className="text-muted-foreground">Remanejo:</span>
                    <span className="font-medium">{fmtH(d.remanejo_h)} · {d.qtd_remanejadores} pessoas</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5" style={{ background: COLORS.he }} />
                    <span className="text-muted-foreground">HE:</span>
                    <span className="font-medium">{fmtH(d.overtime_h)}</span>
                  </div>
                  <p className="border-t border-border/30 pt-1 mt-1">
                    % HE sobre cobertura: <span className="font-bold" style={{ color: COLORS.heLine }}>{fmtPct(d.pct_he_sobre_cobertura)}</span>
                  </p>
                  <p>Férias do mês: <span className="font-medium">{d.ferias_total_mes}</span></p>
                  <p className="text-orange-600">
                    Sem cobertura: {d.ferias_sem_cobertura_qtd} ({fmtPct(d.ferias_sem_cobertura_pct)})
                  </p>
                </div>
              );
            }}
          />
          <Bar yAxisId="left" dataKey="ferista_dedicado_h" stackId="cob" fill={COLORS.feristaDedicado} name="Ferista dedicado" />
          <Bar yAxisId="left" dataKey="remanejo_h" stackId="cob" fill={COLORS.remanejo} name="Remanejo" />
          <Bar yAxisId="left" dataKey="overtime_h" stackId="cob" fill={COLORS.he} name="HE" radius={[4, 4, 0, 0]} />
          <Line
            yAxisId="right" type="monotone" dataKey="pct_he_sobre_cobertura"
            stroke={COLORS.heLine} strokeWidth={2.5}
            dot={{ r: 4, fill: COLORS.heLine, stroke: COLORS.heLine }}
            name="% HE na cobertura"
          />
          <Legend
            iconType="square" iconSize={10}
            wrapperStyle={{ fontSize: 11, paddingTop: 8 }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

// ────────────────────────────────────────────────────────────
// Disciplina de Planejamento (Linha 3 esq)
// ────────────────────────────────────────────────────────────
function DisciplinaCard() {
  const { data, loading, error } = useJsonFetch<DisciplinaData>("/data/ferias/disciplina.json");

  const chartData = useMemo(() => {
    if (!data) return [];
    return data.serie_mensal.map(m => ({
      ...m,
      mesLabel: MES_LABEL[m.mes] ?? m.mes,
    }));
  }, [data]);

  if (loading) return <CardSkeleton />;
  if (error || !data) {
    return (
      <ChartCard title="Disciplina de Planejamento de Férias" subtitle="Antecedência entre lançamento e início · em dias">
        <ErrorState message={`Erro ao carregar dados: ${error ?? "sem dados"}`} />
      </ChartCard>
    );
  }

  const meta = data.configuracao.meta_pct_ultima_hora;

  return (
    <ChartCard
      title="Disciplina de Planejamento de Férias"
      subtitle="Antecedência entre lançamento e início · em dias"
      info="Distribuição do tempo entre o lançamento da férias no sistema e seu início efetivo. No segmento de vigilância, antecedência costuma ser mensal (14-30 dias). Mais de 30% lançado em 0-7 dias indica gestão reativa."
    >
      <ResponsiveContainer width="100%" height={280}>
        <ComposedChart data={chartData} margin={{ top: 10, right: 30, bottom: 5, left: 10 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
          <XAxis dataKey="mesLabel" tick={{ fontSize: 11, fill: "#374151" }} />
          <YAxis
            yAxisId="left"
            domain={[0, 600]}
            ticks={[0, 100, 200, 300, 400, 500, 600]}
            tick={{ fontSize: 11, fill: "#374151" }}
            label={{ value: "Volume de férias", angle: -90, position: "insideLeft", fontSize: 11, fill: "#374151" }}
          />
          <YAxis
            yAxisId="right" orientation="right"
            domain={[0, 60]} ticks={[0, 10, 20, 30, 40, 50, 60]}
            tickFormatter={(v) => `${v}%`}
            tick={{ fontSize: 11, fill: "#374151" }}
            label={{ value: "% última hora", angle: 90, position: "insideRight", fontSize: 11, fill: "#374151" }}
          />
          <RechartsTooltip
            content={({ active, payload, label }) => {
              if (!active || !payload?.length) return null;
              const d = payload[0].payload as DisciplinaMes & { mesLabel: string };
              const pctAcima = d.pct_ultima_hora > meta;
              return (
                <div className="bg-white border border-border/50 rounded-md p-3 shadow-md text-xs space-y-1 min-w-[240px]">
                  <p className="font-semibold">{label}</p>
                  <p>Total de férias: <span className="font-medium">{d.total_ferias}</span></p>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5" style={{ background: COLORS.antecipada }} />
                    <span className="text-muted-foreground">Antecipada (&gt;30d):</span>
                    <span className="font-medium">{d.antecipada_mais_30d} ({fmtPct((d.antecipada_mais_30d / d.total_ferias) * 100)})</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5" style={{ background: COLORS.razoavel }} />
                    <span className="text-muted-foreground">Razoável (16-30d):</span>
                    <span className="font-medium">{d.razoavel_16_30d} ({fmtPct((d.razoavel_16_30d / d.total_ferias) * 100)})</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5" style={{ background: COLORS.apertada }} />
                    <span className="text-muted-foreground">Apertada (8-15d):</span>
                    <span className="font-medium">{d.apertada_8_15d} ({fmtPct((d.apertada_8_15d / d.total_ferias) * 100)})</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5" style={{ background: COLORS.ultimaHora }} />
                    <span className="text-muted-foreground">Última hora (0-7d):</span>
                    <span className="font-medium">{d.ultima_hora_0_7d} ({fmtPct(d.pct_ultima_hora)})</span>
                  </div>
                  <p className={pctAcima ? "text-red-600" : "text-green-600"}>
                    {pctAcima ? "Acima" : "Abaixo"} da meta de {meta}%
                  </p>
                  <p>Antecedência média: <span className="font-medium">{d.antecedencia_media_dias.toString().replace(".", ",")} dias</span></p>
                </div>
              );
            }}
          />
          <Bar yAxisId="left" dataKey="antecipada_mais_30d" stackId="disc" fill={COLORS.antecipada} name="Antecipada (>30 dias)" />
          <Bar yAxisId="left" dataKey="razoavel_16_30d" stackId="disc" fill={COLORS.razoavel} name="Razoável (16-30 dias)" />
          <Bar yAxisId="left" dataKey="apertada_8_15d" stackId="disc" fill={COLORS.apertada} name="Apertada (8-15 dias)" />
          <Bar yAxisId="left" dataKey="ultima_hora_0_7d" stackId="disc" fill={COLORS.ultimaHora} name="Última hora (0-7 dias)" radius={[4, 4, 0, 0]} />
          <ReferenceLine
            yAxisId="right"
            y={meta}
            stroke={COLORS.metaLine}
            strokeWidth={1.5}
            strokeDasharray="4 4"
            label={({ viewBox }: any) => {
              const { x, y, width } = viewBox || {};
              const right = (x ?? 0) + (width ?? 0);
              return (
                <g>
                  <rect x={right - 110} y={(y ?? 0) - 11} width={106} height={14} fill="#fff" stroke="#e5e7eb" rx={2} />
                  <text x={right - 6} y={(y ?? 0) - 1} fontSize={11} fill="#374151" textAnchor="end">Meta: abaixo de {meta}%</text>
                </g>
              );
            }}
          />
          <Line
            yAxisId="right" type="monotone" dataKey="pct_ultima_hora"
            stroke={COLORS.ultimaHora} strokeWidth={2.5}
            dot={{ r: 4, fill: COLORS.ultimaHora, stroke: COLORS.ultimaHora }}
            name="% Última hora"
          />
          <Legend iconType="square" iconSize={10} wrapperStyle={{ fontSize: 11, paddingTop: 8 }} />
        </ComposedChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

// ────────────────────────────────────────────────────────────
// Risco Trabalhista (Linha 3 dir)
// ────────────────────────────────────────────────────────────
function RiscoCard() {
  const { data, loading, error } = useJsonFetch<RiscoData>("/data/ferias/risco.json");

  const chartData = useMemo(() => {
    if (!data) return [];
    return data.serie_mensal.map(m => ({
      ...m,
      mesLabel: MES_LABEL[m.mes] ?? m.mes,
    }));
  }, [data]);

  if (loading) return <CardSkeleton />;
  if (error || !data) {
    return (
      <ChartCard title="Risco Trabalhista em Férias" subtitle="Indicadores de exposição · últimos 12 meses">
        <ErrorState message={`Erro ao carregar dados: ${error ?? "sem dados"}`} />
      </ChartCard>
    );
  }

  const tol = data.configuracao.tolerancia_pct_efetivo_afetado;

  return (
    <ChartCard
      title="Risco Trabalhista em Férias"
      subtitle="Indicadores de exposição · últimos 12 meses"
      info="Três indicadores de risco em férias: (1) Ponto batido em férias — colaborador em férias bate ponto, gerando passivo; (2) Sem cobertura identificada — férias sem rastro formal de cobertura; (3) Cobertura com HE — não é passivo, mas é alerta de custo. Linha mostra a taxa de férias com ponto batido."
      badge={{ text: "Indicador de passivo trabalhista", bg: "#fee2e2", color: "#991b1b" }}
    >
      <ResponsiveContainer width="100%" height={280}>
        <ComposedChart data={chartData} margin={{ top: 10, right: 30, bottom: 5, left: 10 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
          <XAxis dataKey="mesLabel" tick={{ fontSize: 11, fill: "#374151" }} />
          <YAxis
            yAxisId="left"
            domain={[0, 700]}
            ticks={[0, 100, 200, 300, 400, 500, 600, 700]}
            tick={{ fontSize: 11, fill: "#374151" }}
            label={{ value: "Férias afetadas", angle: -90, position: "insideLeft", fontSize: 11, fill: "#374151" }}
          />
          <YAxis
            yAxisId="right" orientation="right"
            domain={[0, 100]} ticks={[0, 25, 50, 75, 100]}
            tickFormatter={(v) => `${v}%`}
            tick={{ fontSize: 11, fill: "#374151" }}
            label={{ value: "% efetivo afetado", angle: 90, position: "insideRight", fontSize: 11, fill: "#374151" }}
          />
          <RechartsTooltip
            content={({ active, payload, label }) => {
              if (!active || !payload?.length) return null;
              const d = payload[0].payload as RiscoMes & { mesLabel: string };
              const pctSemCob = (d.ferias_sem_cobertura_identificada / d.total_ferias_no_mes) * 100;
              return (
                <div className="bg-white border border-border/50 rounded-md p-3 shadow-md text-xs space-y-1 min-w-[240px]">
                  <p className="font-semibold">{label}</p>
                  <p>Total de férias no mês: <span className="font-medium">{d.total_ferias_no_mes}</span></p>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5" style={{ background: COLORS.pontoBatido }} />
                    <span className="text-muted-foreground">Ponto batido em férias:</span>
                    <span className="font-medium">{d.ferias_com_ponto_batido} ({fmtPct(d.pct_efetivo_afetado_ponto_batido)})</span>
                  </div>
                  <p className="pl-4 text-[10px] text-muted-foreground">
                    {fmtNum(d.ponto_batido_ocorrencias_total)} ocorrências
                  </p>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5" style={{ background: COLORS.semCobertura }} />
                    <span className="text-muted-foreground">Sem cobertura identificada:</span>
                    <span className="font-medium">{d.ferias_sem_cobertura_identificada} ({fmtPct(pctSemCob)})</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5" style={{ background: COLORS.comHe }} />
                    <span className="text-muted-foreground">Cobertura com HE:</span>
                    <span className="font-medium">~{d.ferias_equivalentes_com_he} férias-equiv.</span>
                  </div>
                  <p className="pl-4 text-[10px] text-muted-foreground">
                    {fmtH(d.overtime_horas)} totais de HE
                  </p>
                  <p className="border-t border-border/30 pt-1 mt-1 text-red-600">
                    % efetivo afetado: <span className="font-bold">{fmtPct(d.pct_efetivo_afetado_ponto_batido)}</span> (acima da tolerância)
                  </p>
                </div>
              );
            }}
          />
          <Bar yAxisId="left" dataKey="ferias_com_ponto_batido" stackId="risk" fill={COLORS.pontoBatido} name="Ponto batido em férias" />
          <Bar yAxisId="left" dataKey="ferias_sem_cobertura_identificada" stackId="risk" fill={COLORS.semCobertura} name="Sem cobertura identificada" />
          <Bar yAxisId="left" dataKey="ferias_equivalentes_com_he" stackId="risk" fill={COLORS.comHe} name="Férias-equivalentes com HE" radius={[4, 4, 0, 0]} />
          <ReferenceLine
            yAxisId="right"
            y={tol}
            stroke={COLORS.metaLine}
            strokeWidth={1.5}
            strokeDasharray="4 4"
            label={({ viewBox }: any) => {
              const { x, y, width } = viewBox || {};
              const right = (x ?? 0) + (width ?? 0);
              return (
                <g>
                  <rect x={right - 90} y={(y ?? 0) - 11} width={86} height={14} fill="#fff" stroke="#e5e7eb" rx={2} />
                  <text x={right - 6} y={(y ?? 0) - 1} fontSize={11} fill="#374151" textAnchor="end">Tolerância: {tol}%</text>
                </g>
              );
            }}
          />
          <Line
            yAxisId="right" type="monotone" dataKey="pct_efetivo_afetado_ponto_batido"
            stroke={COLORS.pontoBatido} strokeWidth={2.5}
            dot={{ r: 4, fill: COLORS.pontoBatido, stroke: COLORS.pontoBatido }}
            name="% efetivo afetado"
          />
          <Legend iconType="square" iconSize={10} wrapperStyle={{ fontSize: 11, paddingTop: 8 }} />
        </ComposedChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

// ────────────────────────────────────────────────────────────
// Componente principal
// ────────────────────────────────────────────────────────────
export default function FeriasTabContent() {
  const { data: resumo, loading: loadingResumo, error: errorResumo } = useJsonFetch<ResumoData>("/data/ferias/resumo.json");

  return (
    <div className="flex-1 min-w-0 space-y-3 px-3 sm:pl-6 sm:pr-4 py-4 pb-24 xl:pb-4">
      <HeaderFilters />

      {/* Linha 1: Big Numbers */}
      {loadingResumo && (
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-card border border-border/50 rounded-xl p-4 animate-pulse">
              <div className="h-3 w-3/4 bg-muted rounded mb-3" />
              <div className="h-6 w-1/2 bg-muted rounded mb-2" />
              <div className="h-3 w-1/3 bg-muted rounded" />
            </div>
          ))}
        </div>
      )}
      {errorResumo && (
        <div className="bg-card border border-border/50 rounded-xl p-4 text-xs text-muted-foreground">
          Erro ao carregar resumo: {errorResumo}
        </div>
      )}
      {resumo && <BigNumbersRow data={resumo} />}

      {/* Linha 2: Mapa de Operações | Composição da Cobertura */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-3">
        <MapaOperacoesCard />
        <CoberturaCard />
      </div>

      {/* Linha 3: Disciplina de Planejamento | Risco Trabalhista */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-3">
        <DisciplinaCard />
        <RiscoCard />
      </div>
    </div>
  );
}
