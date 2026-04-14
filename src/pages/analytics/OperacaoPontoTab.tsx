import { useState, useMemo } from "react";
import { Lock, ArrowUp, ArrowDown, Minus as MinusIcon, AlertTriangle, Database } from "lucide-react";
import { Tooltip as UITooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import {
  ResponsiveContainer, ComposedChart, BarChart, Bar, Line,
  XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend,
  ScatterChart, Scatter, ZAxis, Cell, ReferenceLine,
} from "recharts";
import ScoreGauge from "@/components/analytics/ScoreGauge";
import InfoTip from "@/components/analytics/InfoTip";
import { ScoreBoard, KPIBoard } from "@/components/analytics/KPIBoard";
import GroupBySidebar, { type GroupBy } from "@/components/analytics/GroupBySidebar";
import ChartDataModal from "@/components/analytics/ChartDataModal";
import { useScoreConfig, getScoreClassification } from "@/contexts/ScoreConfigContext";

import kpisHeader from "@/data/operacao-ponto/kpis-header.json";
import evolucaoTimeVolume from "@/data/operacao-ponto/evolucao-time-volume.json";
import estruturaPorCargo from "@/data/operacao-ponto/estrutura-por-cargo-por-empresa.json";
import dimensionamento from "@/data/operacao-ponto/dimensionamento-por-operacao.json";
import topOperadores from "@/data/operacao-ponto/top-operadores.json";

// ── Category colors ──
const CATEGORY_COLORS: Record<string, string> = {
  operacional: "#22c55e",
  operacional_supervisao: "#6b7280",
  gerencial: "#f97316",
  diretoria: "#ef4444",
  outros: "#94a3b8",
};

function getCategoryColor(categoria: string, concentracaoMax: number): string {
  if (concentracaoMax > 20) return "#ef4444";
  return CATEGORY_COLORS[categoria] || CATEGORY_COLORS.outros;
}

// ── Score sidebar items ──
function getSidebarItems(groupBy: GroupBy) {
  return [
    { nome: "SEGURANCA PATRIMONIAL", score: 62 },
    { nome: "PORTARIA E LIMPEZA", score: 45 },
    { nome: "TERCEIRIZACAO", score: 38 },
  ];
}

function getCargoData(selectedRegional: string | null, groupBy: GroupBy) {
  if (!selectedRegional) return estruturaPorCargo.consolidado;
  const empresaData = (estruturaPorCargo.por_empresa as any)[selectedRegional];
  if (empresaData) return empresaData;
  return estruturaPorCargo.consolidado;
}

// ── Delta label helper ──
function DeltaLabel({
  delta, anterior, unit = "", invertedBetter = false, suffix = "",
}: {
  delta: number; anterior: number; unit?: string; invertedBetter?: boolean; suffix?: string;
}) {
  const absDelta = Math.abs(delta);
  const improved = invertedBetter ? delta < 0 : delta > 0;
  const DeltaIcon = delta > 0 ? ArrowUp : delta < 0 ? ArrowDown : MinusIcon;
  const dColor = absDelta < 0.5 ? "text-muted-foreground" : improved ? "text-green-600" : "text-red-600";

  return (
    <UITooltip>
      <TooltipTrigger asChild>
        <span className={`text-[9px] flex items-center gap-0.5 cursor-help -mt-0.5 ${dColor}`}>
          <DeltaIcon className="w-3 h-3" /> {absDelta.toFixed(1)}{unit} vs {anterior}{suffix} (ant.)
        </span>
      </TooltipTrigger>
      <TooltipContent side="bottom" className="text-xs">
        <p>Atual: {(anterior + delta).toFixed(1)}{suffix} · Anterior: {anterior}{suffix}</p>
      </TooltipContent>
    </UITooltip>
  );
}

// ── Main content ──
function OperacaoPontoContent({
  selectedRegional, onRegionalClick, groupBy, onGroupByChange,
}: {
  selectedRegional: string | null;
  onRegionalClick: (n: string) => void;
  groupBy: GroupBy;
  onGroupByChange: (g: GroupBy) => void;
}) {
  const { config: scoreConfig } = useScoreConfig();
  const [chartDataModal, setChartDataModal] = useState<string | null>(null);

  const score = kpisHeader.score_composto;
  const scoreClassif = getScoreClassification(score, scoreConfig);
  const melhorClassif = getScoreClassification(kpisHeader.melhor_operacao.score, scoreConfig);
  const riscoClassif = getScoreClassification(kpisHeader.maior_risco.score, scoreConfig);

  const concPct = kpisHeader.kpis.concentracao_max_pct;
  const concColor = concPct < 15 ? "#22c55e" : concPct <= 20 ? "#f97316" : "#ef4444";

  const prevScore = kpisHeader.kpis_anterior.score_aba;
  const scoreDelta = score - prevScore;
  const prevConc = kpisHeader.kpis_anterior.concentracao_max_pct;
  const concDelta = +(concPct - prevConc).toFixed(1);

  const sidebarItems = useMemo(() => getSidebarItems(groupBy).sort((a, b) => b.score - a.score), [groupBy]);
  const cargoData = useMemo(() => getCargoData(selectedRegional, groupBy), [selectedRegional, groupBy]);

  const maxVolume = Math.max(...topOperadores.dados.map(o => o.qtd_ajustes), 1);

  return (
    <div className="flex flex-1 min-h-0">
      <div className="flex-1 min-w-0 space-y-3 pl-6 pr-4 py-4 overflow-y-auto">
        {/* ── KPI Row ── */}
        <div className="grid grid-cols-6 gap-3">
          {/* 1. Score */}
          <ScoreBoard title="Operação de Ponto" tooltip="Score composto de saúde do time de tratativa: pessoas ativas, concentração de carga, diversidade de cargos e produtividade. Configurável.">
            <Popover>
              <PopoverTrigger asChild>
                <button className="flex flex-col items-center gap-0 cursor-pointer" title="Ver decomposição do score">
                  <ScoreGauge score={score} label={`${score}`} faixa={scoreClassif.label} color={scoreClassif.color} />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-0" side="bottom" align="start">
                <div className="p-3 border-b border-border/50">
                  <p className="text-sm font-semibold">Como o Score {score} foi calculado</p>
                </div>
                <div className="p-3 space-y-3">
                  {kpisHeader.componentes.map((comp) => {
                    const COMP_COLORS: Record<string, string> = { success: "#22c55e", warning: "#eab308", critical: "#ef4444" };
                    const barColor = COMP_COLORS[comp.cor_semantica] || "#6b7280";
                    const barWidth = Math.max(comp.contribuicao / score * 100, 4);
                    return (
                      <div key={comp.metrica} className="space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-medium">{comp.metrica}</span>
                          <span className="text-[10px] text-muted-foreground">peso {comp.peso}%</span>
                        </div>
                        <div className="flex items-center justify-between text-[11px]">
                          <span>{comp.valor_atual}{comp.unidade} → Nota {comp.nota}</span>
                          <span className="font-semibold">{comp.contribuicao} pts</span>
                        </div>
                        <div className="h-2 bg-muted/50 rounded-full overflow-hidden">
                          <div className="h-full rounded-full transition-all" style={{ width: `${barWidth}%`, backgroundColor: barColor }} />
                        </div>
                      </div>
                    );
                  })}
                  <div className="border-t border-border/50 pt-2 flex items-center justify-between">
                    <span className="text-xs font-semibold">Score composto</span>
                    <span className="text-sm font-bold" style={{ color: scoreClassif.color }}>
                      {score} ({scoreClassif.label})
                    </span>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
            <DeltaLabel delta={scoreDelta} anterior={prevScore} unit="pp" invertedBetter={false} />
          </ScoreBoard>

          {/* 2. Pessoas Ativas */}
          <KPIBoard
            title="Pessoas Ativas"
            tooltip="Quantas pessoas distintas fizeram ao menos 1 ajuste de ponto no período."
            value={`${kpisHeader.kpis.pessoas_ativas}`}
            subtitle={`${kpisHeader.kpis.cargos_envolvidos} cargos envolvidos`}
          />

          {/* 3. Concentração Máxima */}
          <div className="bg-card border border-border/50 rounded-xl p-4 hover:shadow-lg hover:-translate-y-0.5 transition-all flex flex-col">
            <div className="flex items-center gap-1 mb-2">
              <p className="text-[10px] font-semibold text-muted-foreground tracking-wide uppercase">Concentração Máx.</p>
              <InfoTip text="Qual percentual do volume total está concentrado na pessoa de maior volume individual. Acima de 20% indica dependência crítica." />
            </div>
            <p className="text-xl font-bold mt-0.5 truncate" style={{ color: concColor }}>
              {concPct}%
              {concPct > 20 && <AlertTriangle className="inline w-4 h-4 ml-1" />}
            </p>
            <DeltaLabel delta={concDelta} anterior={prevConc} unit="pp" invertedBetter={true} suffix="%" />
          </div>

          {/* 4. Melhor Operação */}
          <div className="bg-card border border-border/50 rounded-xl p-4 hover:shadow-lg hover:-translate-y-0.5 transition-all flex flex-col">
            <div className="flex items-center gap-1 mb-2">
              <p className="text-[10px] font-semibold text-muted-foreground tracking-wide uppercase">Melhor Operação</p>
              <InfoTip text="Operação com estrutura de tratativa mais saudável." />
            </div>
            <p className="text-xl font-bold mt-0.5 truncate" style={{ color: melhorClassif.color }}>{kpisHeader.melhor_operacao.atual}</p>
            <p className="text-[11px] mt-1 truncate" style={{ color: melhorClassif.color }}>Score {kpisHeader.melhor_operacao.score} · {melhorClassif.label}</p>
            <span className="text-[10px] text-muted-foreground mt-0.5">
              {kpisHeader.melhor_operacao.mudou ? kpisHeader.melhor_operacao.mudanca_label : "Mesma posição do período anterior"}
            </span>
          </div>

          {/* 5. Maior Risco */}
          <div className="bg-card border border-border/50 rounded-xl p-4 hover:shadow-lg hover:-translate-y-0.5 transition-all flex flex-col">
            <div className="flex items-center gap-1 mb-2">
              <p className="text-[10px] font-semibold text-muted-foreground tracking-wide uppercase">Maior Risco</p>
              <InfoTip text="Operação com maior fragilidade estrutural." />
            </div>
            <p className="text-xl font-bold mt-0.5 truncate" style={{ color: riscoClassif.color }}>{kpisHeader.maior_risco.atual}</p>
            <p className="text-[11px] mt-1 truncate" style={{ color: riscoClassif.color }}>Score {kpisHeader.maior_risco.score} · {riscoClassif.label}</p>
            <span className="text-[10px] text-muted-foreground mt-0.5">
              {kpisHeader.maior_risco.mudou ? kpisHeader.maior_risco.mudanca_label : "Passou a liderar o risco"}
            </span>
          </div>

          {/* 6. Custo do Back-office — locked */}
          <UITooltip>
            <TooltipTrigger asChild>
              <div className="bg-card border border-border/50 rounded-xl p-4 flex flex-col relative opacity-60 cursor-default select-none">
                <Lock className="w-3.5 h-3.5 absolute top-2.5 right-2.5 text-muted-foreground" />
                <div className="flex items-center gap-1 mb-2">
                  <p className="text-[10px] font-semibold text-muted-foreground tracking-wide uppercase">Custo do Back-office</p>
                </div>
                <p className="text-lg font-bold mt-0.5 text-muted-foreground">Em breve</p>
                <p className="text-[10px] text-muted-foreground mt-1">Requer integração da folha</p>
              </div>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="max-w-[260px] text-xs">
              Cálculo do custo operacional do time de tratativa de ponto. Requer integração da folha de pagamento. Previsto para a próxima versão.
            </TooltipContent>
          </UITooltip>
        </div>

        {/* ── Row 2: 2 charts ── */}
        <div className="grid grid-cols-2 gap-3">
          {/* Chart 1: Evolução do Time e Volume */}
          <div className="bg-card border rounded-xl p-4 border-border/50">
            <div className="flex items-center justify-between mb-0.5">
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="text-sm font-semibold">Evolução do Time e Volume</h4>
                  <InfoTip text="Compara o volume de ajustes processados com a quantidade de operadores ativos ao longo do tempo. Permite identificar gargalos ou ociosidade." />
                </div>
                <p className="text-[10px] text-muted-foreground mb-2">O time acompanha o volume ao longo do tempo?</p>
              </div>
              <button onClick={() => setChartDataModal("evolucao")} className="p-1.5 rounded-md hover:bg-muted transition-colors" title="Ver dados"><Database className="w-4 h-4 text-muted-foreground" /></button>
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <ComposedChart data={evolucaoTimeVolume.dados}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="competencia" tick={{ fontSize: 10 }} />
                <YAxis yAxisId="left" tick={{ fontSize: 10 }} tickFormatter={(v) => v >= 1000 ? `${(v / 1000).toFixed(0)}K` : `${v}`} />
                <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 10 }} domain={[0, "auto"]} />
                <RechartsTooltip content={({ active, payload, label }) => {
                  if (!active || !payload?.length) return null;
                  const d = payload[0]?.payload;
                  return (
                    <div className="bg-white border rounded-lg p-2.5 shadow-md text-xs space-y-1">
                      <p className="font-semibold text-foreground">{label}</p>
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5" style={{ backgroundColor: "rgba(255,87,34,0.6)" }} />
                        <span className="text-muted-foreground">Volume:</span>
                        <span className="font-medium text-foreground">{d.qtd_ajustes?.toLocaleString("pt-BR")} ajustes</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5" style={{ backgroundColor: "#6366f1" }} />
                        <span className="text-muted-foreground">Operadores:</span>
                        <span className="font-medium text-foreground">{d.operadores_ativos}</span>
                      </div>
                      <p className="text-muted-foreground">Ajustes/operador: <span className="font-semibold text-foreground">{d.ajustes_por_operador}</span></p>
                    </div>
                  );
                }} />
                <Legend iconSize={10} wrapperStyle={{ fontSize: 11, paddingTop: 8 }} />
                <Bar yAxisId="left" dataKey="qtd_ajustes" name="Volume de ajustes" fill="rgba(255,87,34,0.6)" radius={[3, 3, 0, 0]} />
                <Line yAxisId="right" dataKey="operadores_ativos" name="Operadores ativos" type="monotone" stroke="#6366f1" strokeWidth={2} dot={{ r: 3 }} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>

          {/* Chart 2: Estrutura da Tratativa por Cargo */}
          <div className="bg-card border rounded-xl p-4 border-border/50">
            <div className="flex items-center justify-between mb-0.5">
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="text-sm font-semibold">Estrutura da Tratativa por Cargo</h4>
                  <InfoTip text="Como a carga de ajustes está distribuída entre os cargos. Cargos gerenciais com volume alto indicam desvio de função." />
                </div>
                <p className="text-[10px] text-muted-foreground mb-2">Como a carga está distribuída entre os cargos?</p>
              </div>
              <button onClick={() => setChartDataModal("estruturaCargo")} className="p-1.5 rounded-md hover:bg-muted transition-colors" title="Ver dados"><Database className="w-4 h-4 text-muted-foreground" /></button>
            </div>
            <div className="space-y-2">
              {cargoData.map((cargo: any) => {
                const barColor = getCategoryColor(cargo.categoria, cargo.concentracao_max);
                const isAlert = (cargo.categoria === "gerencial" || cargo.categoria === "diretoria") && cargo.pct > 5;
                const isConcAlert = cargo.concentracao_max > 20;
                return (
                  <div key={cargo.cargo} className="flex items-center gap-2">
                    <span className="text-[11px] text-foreground font-medium w-[140px] truncate">{cargo.cargo}</span>
                    <div className="flex-1 h-5 bg-muted/30 rounded-full overflow-hidden relative">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{ width: `${Math.max(cargo.pct, 2)}%`, backgroundColor: barColor }}
                      />
                    </div>
                    <span className="text-[10px] text-muted-foreground w-[100px] text-right">
                      {cargo.pct}% ({cargo.qtd_pessoas}p)
                    </span>
                    {(isAlert || isConcAlert) && (
                      <UITooltip>
                        <TooltipTrigger asChild>
                          <AlertTriangle className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                        </TooltipTrigger>
                        <TooltipContent className="text-xs max-w-[200px]">
                          {isConcAlert ? `${cargo.concentracao_max}% concentrado em 1 pessoa` : "Cargo gerencial com volume acima de 5%"}
                        </TooltipContent>
                      </UITooltip>
                    )}
                  </div>
                );
              })}
              <div className="flex flex-wrap gap-3 mt-2 pt-2 border-t border-border/30">
                {[
                  { label: "Operacional", color: CATEGORY_COLORS.operacional },
                  { label: "Supervisão", color: CATEGORY_COLORS.operacional_supervisao },
                  { label: "Gerencial", color: CATEGORY_COLORS.gerencial },
                  { label: "Diretoria", color: CATEGORY_COLORS.diretoria },
                ].map(l => (
                  <span key={l.label} className="flex items-center gap-1 text-[10px] text-muted-foreground">
                    <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: l.color }} />
                    {l.label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Row 3: 2 charts ── */}
        <div className="grid grid-cols-2 gap-3">
          {/* Chart 3: Dimensionamento por Operação */}
          <div className="bg-card border rounded-xl p-4 border-border/50">
            <div className="flex items-center justify-between mb-0.5">
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="text-sm font-semibold">Dimensionamento por Operação</h4>
                  <InfoTip text="Compara o volume de ajustes com o número de operadores por operação. A linha tracejada indica o ratio ideal. Acima: superdimensionado. Abaixo: subdimensionado." />
                </div>
                <p className="text-[10px] text-muted-foreground mb-2">Quais operações têm time sub ou superdimensionado?</p>
              </div>
              <button onClick={() => setChartDataModal("dimensionamento")} className="p-1.5 rounded-md hover:bg-muted transition-colors" title="Ver dados"><Database className="w-4 h-4 text-muted-foreground" /></button>
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <ScatterChart>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  type="number" dataKey="volume_medio_mensal" name="Volume médio mensal"
                  tick={{ fontSize: 10 }}
                  tickFormatter={(v) => v >= 1000 ? `${(v / 1000).toFixed(1)}K` : `${v}`}
                />
                <YAxis
                  type="number" dataKey="operadores_ativos" name="Operadores"
                  tick={{ fontSize: 10 }}
                />
                <ZAxis type="number" dataKey="headcount_total" range={[100, 800]} />
                <ReferenceLine
                  stroke="#6b7280" strokeDasharray="8 4" strokeWidth={1.5}
                  label={{ value: `Ratio ideal: ${dimensionamento.ratio_ideal}/op`, fontSize: 9, fill: "#6b7280" }}
                  segment={[
                    { x: 0, y: 0 },
                    { x: 5000, y: 5000 / dimensionamento.ratio_ideal },
                  ]}
                />
                <RechartsTooltip content={({ active, payload }) => {
                  if (!active || !payload?.length) return null;
                  const d = payload[0]?.payload;
                  return (
                    <div className="bg-white border rounded-lg p-2.5 shadow-md text-xs space-y-1">
                      <p className="font-semibold text-foreground">{d.business_unit_name}</p>
                      <p className="text-muted-foreground">Volume médio: <span className="font-semibold text-foreground">{d.volume_medio_mensal?.toLocaleString("pt-BR")}</span>/mês</p>
                      <p className="text-muted-foreground">Operadores: <span className="font-semibold text-foreground">{d.operadores_ativos}</span></p>
                      <p className="text-muted-foreground">Headcount: <span className="font-semibold text-foreground">{d.headcount_total}</span></p>
                      <p className="text-muted-foreground">Ratio: <span className="font-semibold text-foreground">{d.ajustes_por_operador_mensal}</span> ajustes/op</p>
                      <p className={`font-semibold ${d.status === "saudavel" ? "text-green-600" : d.status === "subdimensionado" ? "text-red-600" : "text-blue-600"}`}>
                        {d.status === "saudavel" ? "Saudável" : d.status === "subdimensionado" ? "Subdimensionado" : "Superdimensionado"}
                      </p>
                    </div>
                  );
                }} />
                <Scatter data={dimensionamento.dados} name="Operações">
                  {dimensionamento.dados.map((entry, idx) => (
                    <Cell
                      key={idx}
                      fill={entry.status === "saudavel" ? "#22c55e" : entry.status === "subdimensionado" ? "#ef4444" : "#3b82f6"}
                      fillOpacity={0.7}
                    />
                  ))}
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
            <div className="flex gap-4 mt-1 justify-center">
              {[
                { label: "Saudável", color: "#22c55e" },
                { label: "Subdimensionado", color: "#ef4444" },
                { label: "Superdimensionado", color: "#3b82f6" },
              ].map(l => (
                <span key={l.label} className="flex items-center gap-1 text-[10px] text-muted-foreground">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: l.color }} />
                  {l.label}
                </span>
              ))}
            </div>
          </div>

          {/* Chart 4: Top 10 Operadores */}
          <div className="bg-card border rounded-xl p-4 border-border/50">
            <div className="flex items-center justify-between mb-0.5">
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="text-sm font-semibold">Top 10 Operadores</h4>
                  <InfoTip text="Os 10 operadores com maior volume individual de ajustes no período. Badges indicam o cargo e a cor da barra reflete concentração acima de 20%." />
                </div>
                <p className="text-[10px] text-muted-foreground mb-2">Quem individualmente concentra mais volume?</p>
              </div>
              <button onClick={() => setChartDataModal("topOperadores")} className="p-1.5 rounded-md hover:bg-muted transition-colors" title="Ver dados"><Database className="w-4 h-4 text-muted-foreground" /></button>
            </div>
            <div className="space-y-1.5">
              {topOperadores.dados.slice(0, 10).map((op, idx) => {
                const barWidth = (op.qtd_ajustes / maxVolume) * 100;
                const isConcentrated = op.pct > 20;
                return (
                  <UITooltip key={idx}>
                    <TooltipTrigger asChild>
                      <div className="flex items-center gap-2 cursor-default">
                        <span className="text-[10px] text-muted-foreground w-4 text-right">{idx + 1}</span>
                        <span className="text-[11px] text-foreground font-medium w-[130px] truncate">{op.person_name}</span>
                        <span className="text-[9px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground shrink-0">{op.career_name}</span>
                        <div className="flex-1 h-4 bg-muted/30 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all"
                            style={{
                              width: `${Math.max(barWidth, 3)}%`,
                              backgroundColor: isConcentrated ? "#ef4444" : "#FF5722",
                              opacity: 0.7,
                            }}
                          />
                        </div>
                        <span className="text-[10px] text-muted-foreground w-[100px] text-right">
                          {op.qtd_ajustes.toLocaleString("pt-BR")} · {op.pct}%
                        </span>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent className="text-xs max-w-[220px]">
                      <p className="font-semibold">{op.person_name}</p>
                      <p>Cargo: {op.career_name}</p>
                      <p>Volume: {op.qtd_ajustes.toLocaleString("pt-BR")} ajustes ({op.pct}%)</p>
                      <p>Meses ativos: {op.meses_atividade}</p>
                      <p>Primeiro ajuste: {new Date(op.primeiro_ajuste).toLocaleDateString("pt-BR")}</p>
                      <p>Último ajuste: {new Date(op.ultimo_ajuste).toLocaleDateString("pt-BR")}</p>
                    </TooltipContent>
                  </UITooltip>
                );
              })}
            </div>
            <p className="text-[10px] text-muted-foreground text-center mt-2">
              Mostrando 10 de {topOperadores.dados.length} operadores com ajustes no período
            </p>
          </div>
        </div>
      </div>

      {/* Right: Sidebar */}
      <GroupBySidebar
        items={sidebarItems}
        groupBy={groupBy}
        onGroupByChange={onGroupByChange}
        selectedRegional={selectedRegional}
        onRegionalClick={onRegionalClick}
      />

      {/* Data Modals */}
      <ChartDataModal
        open={chartDataModal === "evolucao"}
        onClose={() => setChartDataModal(null)}
        title="Evolução do Time e Volume"
        data={evolucaoTimeVolume.dados}
        columns={[
          { key: "competencia", label: "Competência" },
          { key: "qtd_ajustes", label: "Volume" },
          { key: "operadores_ativos", label: "Operadores" },
          { key: "ajustes_por_operador", label: "Ajustes/Op" },
        ]}
        sqlQuery="SELECT DATE_FORMAT(reference_month, '%b/%y') AS competencia, SUM(adjustments) AS qtd_ajustes, COUNT(DISTINCT operator_id) AS operadores_ativos, ROUND(SUM(adjustments)/COUNT(DISTINCT operator_id),0) AS ajustes_por_operador FROM vw_operacao_ponto WHERE customer_id = 642 AND reference_month BETWEEN '2025-04-01' AND '2026-03-31' GROUP BY reference_month ORDER BY reference_month;"
      />
      <ChartDataModal
        open={chartDataModal === "estruturaCargo"}
        onClose={() => setChartDataModal(null)}
        title="Estrutura da Tratativa por Cargo"
        data={cargoData}
        columns={[
          { key: "cargo", label: "Cargo" },
          { key: "pct", label: "%", format: (v: number) => `${v}%` },
          { key: "qtd_pessoas", label: "Pessoas" },
          { key: "categoria", label: "Categoria" },
        ]}
        sqlQuery="SELECT career_name AS cargo, ROUND(COUNT(*)*100.0/SUM(COUNT(*)) OVER(), 1) AS pct, COUNT(DISTINCT person_id) AS qtd_pessoas, career_category AS categoria FROM vw_operacao_ponto_por_cargo WHERE customer_id = 642 GROUP BY career_name, career_category ORDER BY pct DESC;"
      />
      <ChartDataModal
        open={chartDataModal === "dimensionamento"}
        onClose={() => setChartDataModal(null)}
        title="Dimensionamento por Operação"
        data={dimensionamento.dados}
        columns={[
          { key: "business_unit_name", label: "Operação" },
          { key: "volume_medio_mensal", label: "Vol. Médio/mês" },
          { key: "operadores_ativos", label: "Operadores" },
          { key: "ajustes_por_operador_mensal", label: "Ajustes/Op" },
          { key: "status", label: "Status" },
        ]}
        sqlQuery="SELECT bu.name AS business_unit_name, ROUND(AVG(volume),0) AS volume_medio_mensal, COUNT(DISTINCT operator_id) AS operadores_ativos, ROUND(AVG(volume)/NULLIF(COUNT(DISTINCT operator_id),0),0) AS ajustes_por_operador_mensal FROM vw_dimensionamento_ponto WHERE customer_id = 642 GROUP BY bu.id ORDER BY volume_medio_mensal DESC;"
      />
      <ChartDataModal
        open={chartDataModal === "topOperadores"}
        onClose={() => setChartDataModal(null)}
        title="Top 10 Operadores"
        data={topOperadores.dados.slice(0, 10)}
        columns={[
          { key: "person_name", label: "Operador" },
          { key: "career_name", label: "Cargo" },
          { key: "qtd_ajustes", label: "Ajustes" },
          { key: "pct", label: "%", format: (v: number) => `${v}%` },
          { key: "meses_atividade", label: "Meses" },
        ]}
        sqlQuery="SELECT p.name AS person_name, c.name AS career_name, COUNT(*) AS qtd_ajustes, ROUND(COUNT(*)*100.0/SUM(COUNT(*)) OVER(), 1) AS pct FROM adjustments a JOIN person p ON p.id = a.person_id JOIN career c ON c.id = p.career_id WHERE a.customer_id = 642 AND a.reference_month BETWEEN '2025-04-01' AND '2026-03-31' GROUP BY p.id ORDER BY qtd_ajustes DESC LIMIT 10;"
      />
    </div>
  );
}

// ── Exported Tab ──
export default function OperacaoPontoTab() {
  const [selectedRegional, setSelectedRegional] = useState<string | null>(null);
  const [groupBy, setGroupBy] = useState<GroupBy>("empresa");
  const handleRegionalClick = (nome: string) => setSelectedRegional(prev => prev === nome ? null : nome);
  const handleGroupByChange = (g: GroupBy) => { setGroupBy(g); setSelectedRegional(null); };

  return (
    <OperacaoPontoContent
      selectedRegional={selectedRegional}
      onRegionalClick={handleRegionalClick}
      groupBy={groupBy}
      onGroupByChange={handleGroupByChange}
    />
  );
}
