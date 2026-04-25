/**
 * FeriasTabContent — clone do layout da aba "Ponto" (QualidadeTab) usando valores default.
 *
 * Este componente serve como TEMPLATE de aba nova: para criar uma nova aba similar,
 * basta clonar este arquivo e ajustar:
 *   - Os labels dos KPIs/gráficos
 *   - Os valores numéricos default em DEFAULT_*
 *
 * O layout (grid, sidebar, modais, gráficos, paddings, cores) deve permanecer 100% idêntico.
 *
 * Layout (igual à aba Ponto):
 *   - Container flex-col xl:flex-row w-full
 *   - Esquerda (flex-1): 6 KPI cards + Mapa + 3 gráficos + Insights
 *   - Direita: GroupBySidebar (idêntico ao da aba Ponto)
 *   - Modais: ChartDataModal x3 + CompositeChartDataModal
 */
import { useMemo, useState } from "react";
import {
  ResponsiveContainer, ComposedChart, Bar, Line, Area, XAxis, YAxis, CartesianGrid,
  Tooltip as RechartsTooltip, Legend, ReferenceLine, ScatterChart, Scatter,
  ZAxis, Cell, LabelList, ReferenceArea,
} from "recharts";
import {
  Database, ArrowUp, ArrowDown, Minus as MinusIcon,
} from "lucide-react";
import { Tooltip as UITooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import ChartDataModal from "@/components/analytics/ChartDataModal";
import CompositeChartDataModal from "@/components/analytics/CompositeChartDataModal";
import ScoreGauge from "@/components/analytics/ScoreGauge";
import InfoTip from "@/components/analytics/InfoTip";
import { ScoreBoard } from "@/components/analytics/KPIBoard";
import GroupBySidebar, { type GroupBy } from "@/components/analytics/GroupBySidebar";
import { evolucaoQualidadeHeadcountSource, evolucaoQualidadeHeadcountColumns } from "@/data/chart-sources/evolucao-qualidade-headcount";
import { evolucaoTempoTratativaSource, evolucaoTempoTratativaColumns } from "@/data/chart-sources/evolucao-tempo-tratativa";
import { sobrecargaBackofficeSource, sobrecargaBackofficeColumns } from "@/data/chart-sources/sobrecarga-backoffice";

// ════════════════════════════════════════════════════════════
// DEFAULTS — ajuste apenas estes valores ao clonar para nova aba
// ════════════════════════════════════════════════════════════
const DEFAULTS = {
  // KPIs (6 big numbers)
  scoreComposto: 58,
  scoreFaixa: "Atenção",
  scoreColor: "#f59e0b",
  scoreDeltaPp: -8,
  scoreAnterior: 66,

  qualidadePct: 71,
  qualidadeLabel: "Atenção",
  qualidadeText: "text-orange-500",
  qualidadeDeltaPp: -3,
  qualidadeAnterior: 74,

  tempoMedioDias: 14.9,
  tempoMedioLabel: "Crítico",
  tempoMedioColor: "text-red-600",
  tempoMedioDeltaDias: 1.2,
  tempoMedioAnterior: 13.7,

  sobrecargaValue: 29,
  sobrecargaLabel: "Atenção",
  sobrecargaColor: "text-orange-500",
  sobrecargaDeltaPct: 4,
  sobrecargaAnterior: 28,

  melhorOperacao: { nome: "SEGURANÇA PATRIMONIAL", score: 73, label: "Bom", text: "text-green-600" },
  maiorRisco: { nome: "PORTARIA E LIMPEZA", score: 50, label: "Crítico", text: "text-red-600" },

  // Score breakdown (popover)
  scoreBreakdown: [
    { metrica: "Planejamento", peso: 40, valor_atual: 65, unidade: "", nota: 65, contribuicao: 26, cor_semantica: "warning" },
    { metrica: "Cobertura formal", peso: 35, valor_atual: 71, unidade: "%", nota: 71, contribuicao: 25, cor_semantica: "warning" },
    { metrica: "Risco trabalhista", peso: 25, valor_atual: 28, unidade: "", nota: 28, contribuicao: 7, cor_semantica: "critical" },
  ],

  // Mapa de operações (bolhas)
  mapaOperacoes: [
    { regional: "SEGURANÇA PATRIMONIAL", headcount: 18, score: 73, qualidade: 75, velocidade: 70, backoffice: 73, bubbleColor: "#22c55e", classifLabel: "Bom" },
    { regional: "TERCEIRIZAÇÃO", headcount: 22, score: 69, qualidade: 70, velocidade: 65, backoffice: 71, bubbleColor: "#f59e0b", classifLabel: "Atenção" },
    { regional: "PORTARIA E LIMPEZA", headcount: 250, score: 50, qualidade: 55, velocidade: 45, backoffice: 50, bubbleColor: "#ef4444", classifLabel: "Crítico" },
  ],

  // Gráfico 2: Evolução (Registradas vs Justificadas + Headcount Ativo)
  evolucaoQualidade: [
    { mes: "abr/25", registradas: 14489, justificadas: 21318, activeHeadcount: 470, hcPonto: 433 },
    { mes: "mai/25", registradas: 16780, justificadas: 23316, activeHeadcount: 472, hcPonto: 433 },
    { mes: "jun/25", registradas: 18637, justificadas: 24726, activeHeadcount: 475, hcPonto: 442 },
    { mes: "jul/25", registradas: 23772, justificadas: 27085, activeHeadcount: 478, hcPonto: 542 },
    { mes: "ago/25", registradas: 22963, justificadas: 24182, activeHeadcount: 480, hcPonto: 491 },
    { mes: "set/25", registradas: 22515, justificadas: 20958, activeHeadcount: 480, hcPonto: 442 },
    { mes: "out/25", registradas: 25802, justificadas: 25201, activeHeadcount: 482, hcPonto: 493 },
    { mes: "nov/25", registradas: 23128, justificadas: 21551, activeHeadcount: 483, hcPonto: 407 },
    { mes: "dez/25", registradas: 19902, justificadas: 21450, activeHeadcount: 485, hcPonto: 533 },
    { mes: "jan/26", registradas: 19434, justificadas: 27100, activeHeadcount: 484, hcPonto: 476 },
    { mes: "fev/26", registradas: 14289, justificadas: 23629, activeHeadcount: 484, hcPonto: 359 },
    { mes: "mar/26", registradas: 16768, justificadas: 37363, activeHeadcount: 484, hcPonto: 500 },
  ],

  // Gráfico 3: Evolução do Tempo de Tratativa (faixas)
  evolucaoTempo: [
    { mes: "abr/25", ate1d: 43, de1a3d: 137, de3a7d: 112, de7a15d: 100, mais15d: 41, total: 433 },
    { mes: "mai/25", ate1d: 40, de1a3d: 103, de3a7d: 87, de7a15d: 130, mais15d: 73, total: 433 },
    { mes: "jun/25", ate1d: 19, de1a3d: 69, de3a7d: 120, de7a15d: 150, mais15d: 84, total: 442 },
    { mes: "jul/25", ate1d: 39, de1a3d: 155, de3a7d: 131, de7a15d: 145, mais15d: 72, total: 542 },
    { mes: "ago/25", ate1d: 61, de1a3d: 120, de3a7d: 122, de7a15d: 130, mais15d: 58, total: 491 },
    { mes: "set/25", ate1d: 43, de1a3d: 136, de3a7d: 127, de7a15d: 95, mais15d: 41, total: 442 },
    { mes: "out/25", ate1d: 43, de1a3d: 119, de3a7d: 131, de7a15d: 140, mais15d: 60, total: 493 },
    { mes: "nov/25", ate1d: 39, de1a3d: 121, de3a7d: 132, de7a15d: 80, mais15d: 35, total: 407 },
    { mes: "dez/25", ate1d: 55, de1a3d: 177, de3a7d: 130, de7a15d: 120, mais15d: 51, total: 533 },
    { mes: "jan/26", ate1d: 73, de1a3d: 159, de3a7d: 113, de7a15d: 90, mais15d: 41, total: 476 },
    { mes: "fev/26", ate1d: 38, de1a3d: 130, de3a7d: 100, de7a15d: 60, mais15d: 31, total: 359 },
    { mes: "mar/26", ate1d: 57, de1a3d: 167, de3a7d: 137, de7a15d: 100, mais15d: 39, total: 500 },
  ],

  // Gráfico 4: Sobrecarga / Risco
  sobrecarga: [
    { mes: "abr/25", produtividade: 24, operadores: 92, he: 917 },
    { mes: "mai/25", produtividade: 26, operadores: 99, he: 1273 },
    { mes: "jun/25", produtividade: 30, operadores: 90, he: 1200 },
    { mes: "jul/25", produtividade: 31, operadores: 106, he: 1341 },
    { mes: "ago/25", produtividade: 27, operadores: 86, he: 862 },
    { mes: "set/25", produtividade: 27, operadores: 92, he: 1041 },
    { mes: "out/25", produtividade: 28, operadores: 105, he: 893 },
    { mes: "nov/25", produtividade: 22, operadores: 95, he: 1232 },
    { mes: "dez/25", produtividade: 35, operadores: 102, he: 933 },
    { mes: "jan/26", produtividade: 32, operadores: 98, he: 1183 },
    { mes: "fev/26", produtividade: 23, operadores: 84, he: 1148 },
    { mes: "mar/26", produtividade: 28, operadores: 97, he: 1661 },
  ],

  // Sidebar — items
  sidebarItems: [
    { nome: "PORTARIA E LIMPEZA", score: 50 },
    { nome: "SEGURANÇA PATRIMONIAL", score: 73 },
    { nome: "TERCEIRIZAÇÃO", score: 69 },
  ],
};

// ════════════════════════════════════════════════════════════
// Helpers
// ════════════════════════════════════════════════════════════
const formatTempoMedio = (d: number) => {
  if (d < 1) return `${Math.round(d * 24)}h`;
  return `${d.toFixed(1).replace(".", ",")} dias`;
};

function renderVariation(delta: number, anterior: string, suffix: string, invert = false) {
  const absDelta = Math.abs(delta);
  const improved = invert ? delta < 0 : delta > 0;
  const DeltaIcon = delta > 0 ? ArrowUp : delta < 0 ? ArrowDown : MinusIcon;
  const dColor = absDelta < 0.1 ? "text-muted-foreground" : improved ? "text-green-600" : "text-red-600";
  return (
    <span className={`text-[10px] flex items-center gap-0.5 mt-1 ${dColor}`}>
      <DeltaIcon className="w-3 h-3" /> {absDelta.toString().replace(".", ",")}{suffix} vs {anterior} (ant.)
    </span>
  );
}

// ════════════════════════════════════════════════════════════
// Componente principal
// ════════════════════════════════════════════════════════════
export default function FeriasTabContent() {
  // Estado local (mesmo padrão da aba Ponto)
  const [selectedRegional, setSelectedRegional] = useState<string | null>(null);
  const [groupBy, setGroupBy] = useState<GroupBy>("unidade");
  const [selectedMes, setSelectedMes] = useState<string | null>(null);
  const [fixedBubble, setFixedBubble] = useState<string | null>(null);
  const [chartDataModal, setChartDataModal] = useState<string | null>(null);
  const [mapaScoreFilter, setMapaScoreFilter] = useState<Set<string>>(new Set(["green", "orange", "red"]));
  const [mapaDimension, setMapaDimension] = useState<"score" | "qualidade" | "velocidade" | "backoffice">("score");

  const onRegionalClick = (n: string) => setSelectedRegional(prev => prev === n ? null : n);
  const onGroupByChange = (g: GroupBy) => { setGroupBy(g); setSelectedRegional(null); };

  // Mapa: domain dinâmico
  const mapaDomain = useMemo(() => {
    const headcounts = DEFAULTS.mapaOperacoes.map(d => d.headcount);
    const maxHc = Math.max(...headcounts) * 1.15;
    const xMin = 0;
    const xMax = Math.ceil(maxHc / 50) * 50;
    const step = Math.max(50, Math.ceil(xMax / 6 / 50) * 50);
    const xTicks: number[] = [];
    for (let i = xMin; i <= xMax; i += step) xTicks.push(i);
    return { xMin, xMax, xTicks, yMin: 0, yMax: 100 };
  }, []);

  const dimensionConfig: Record<string, { label: string; yLabel: string; thresholds: [number, number] }> = {
    score: { label: "Score", yLabel: "Score Operacional", thresholds: [70, 50] },
    qualidade: { label: "Qualidade", yLabel: "Qualidade (%)", thresholds: [85, 70] },
    velocidade: { label: "Velocidade", yLabel: "Velocidade", thresholds: [70, 50] },
    backoffice: { label: "Back-office", yLabel: "Saúde Back-office", thresholds: [70, 50] },
  };
  const activeDimConfig = dimensionConfig[mapaDimension];

  const getMapaVal = (d: any) => Number(d[mapaDimension]) || 0;
  const getMapaBubbleColor = (val: number) => {
    if (val >= activeDimConfig.thresholds[0]) return "#22c55e";
    if (val >= activeDimConfig.thresholds[1]) return "#f59e0b";
    return "#ef4444";
  };

  const toggleMapaScoreFilter = (cat: string) => {
    setMapaScoreFilter(prev => {
      const next = new Set(prev);
      if (next.has(cat)) next.delete(cat);
      else next.add(cat);
      return next;
    });
  };

  const criticalCount = DEFAULTS.mapaOperacoes.filter(d => d.score < activeDimConfig.thresholds[1]).length;

  // Tempo de tratativa: gera dados normalizados (em %) + tempo médio
  const tempoTratativaData = useMemo(() => {
    return DEFAULTS.evolucaoTempo.map(d => {
      const total = d.total || 1;
      const raw = [d.ate1d, d.de1a3d, d.de3a7d, d.de7a15d, d.mais15d].map(v => (v / total) * 100);
      const floored = raw.map(v => Math.floor(v));
      const remainder = 100 - floored.reduce((s, v) => s + v, 0);
      const fracs = raw.map((v, i) => ({ i, frac: v - floored[i] })).sort((a, b) => b.frac - a.frac);
      for (let j = 0; j < remainder; j++) floored[fracs[j].i]++;
      const tempoMedio = Math.round(((d.ate1d * 0.5 + d.de1a3d * 2 + d.de3a7d * 5 + d.de7a15d * 11 + d.mais15d * 20) / total) * 10) / 10;
      return {
        mes: d.mes,
        ate1d: floored[0], de1a3d: floored[1], de3a7d: floored[2], de7a15d: floored[3], mais15d: floored[4],
        rawAte1d: d.ate1d, rawDe1a3d: d.de1a3d, rawDe3a7d: d.de3a7d, rawDe7a15d: d.de7a15d, rawMais15d: d.mais15d,
        total: d.total,
        tempoMedio,
      };
    });
  }, []);

  // Sobrecarga: thresholds + cores
  const sobrecargaData = useMemo(() => {
    const prodValues = DEFAULTS.sobrecarga.map(d => d.produtividade).sort((a, b) => a - b);
    const p50Idx = Math.floor(prodValues.length * 0.5);
    const p90Idx = Math.floor(prodValues.length * 0.9);
    const P50 = prodValues[p50Idx] || 100;
    const P90 = prodValues[p90Idx] || 500;
    const limiteSaudavel = Math.round(P50 * 1.5);
    return DEFAULTS.sobrecarga.map(d => {
      const categoria = d.produtividade > P90 ? "Pico crítico" : d.produtividade > limiteSaudavel ? "Acima do limite" : "Saudável";
      const barColor = d.produtividade > P90 ? "#ef4444" : d.produtividade > limiteSaudavel ? "#f59e0b" : "#22c55e";
      return { ...d, categoria, barColor, limiteSaudavel };
    });
  }, []);
  const limiteSaudavel = sobrecargaData[0]?.limiteSaudavel ?? 0;
  const picoEntry = sobrecargaData.reduce((max, d) => d.produtividade > max.produtividade ? d : max, sobrecargaData[0]);

  // Right Y domain do gráfico Evolução (Headcount)
  const rightDomainMax = useMemo(() => {
    const max = Math.max(...DEFAULTS.evolucaoQualidade.map(d => d.activeHeadcount));
    return Math.ceil(max * 1.2);
  }, []);

  return (
    <div className="flex flex-col xl:flex-row w-full">
      {/* Left: KPI cards + charts */}
      <div className="flex-1 min-w-0 space-y-3 px-3 sm:pl-6 sm:pr-4 py-4 pb-24 xl:pb-4">

        {/* Linha 1: 6 KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-3">
          {/* 1. Score Férias */}
          <ScoreBoard
            title="Score Férias"
            tooltip={`Score Férias\n─────────────────\nSaúde geral consolidada da gestão de férias.\nCombina 3 componentes com pesos configuráveis.\n\nJanela: últimos 12 meses.\n\nScore ${DEFAULTS.scoreComposto}: planejamento + cobertura + risco trabalhista`}
          >
            <Popover>
              <PopoverTrigger asChild>
                <button className="flex flex-col items-center gap-0 cursor-pointer" title="Ver decomposição do score">
                  <ScoreGauge score={DEFAULTS.scoreComposto} label={`${DEFAULTS.scoreComposto}`} faixa={DEFAULTS.scoreFaixa} color={DEFAULTS.scoreColor} />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-0" side="bottom" align="start">
                <div className="p-3 border-b border-border/50">
                  <p className="text-sm font-semibold">Como o Score {DEFAULTS.scoreComposto} foi calculado</p>
                </div>
                <div className="p-3 space-y-3">
                  {DEFAULTS.scoreBreakdown.map((comp) => {
                    const COMP_COLORS: Record<string, string> = { success: "#22c55e", warning: "#eab308", critical: "#ef4444" };
                    const barColor = COMP_COLORS[comp.cor_semantica] || "#6b7280";
                    const barWidth = Math.max(comp.contribuicao / DEFAULTS.scoreComposto * 100, 4);
                    return (
                      <div key={comp.metrica} className="space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-medium">{comp.metrica}</span>
                          <span className="text-[10px] text-muted-foreground">peso {comp.peso}%</span>
                        </div>
                        <div className="flex items-center justify-between text-[11px]">
                          <span>{comp.valor_atual}{comp.unidade}  →  Nota {comp.nota}</span>
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
                    <span className="text-sm font-bold" style={{ color: DEFAULTS.scoreColor }}>
                      {DEFAULTS.scoreComposto} ({DEFAULTS.scoreFaixa})
                    </span>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
            {(() => {
              const delta = DEFAULTS.scoreDeltaPp;
              const absDelta = Math.abs(delta);
              const improved = delta > 0;
              const DeltaIcon = delta > 0 ? ArrowUp : delta < 0 ? ArrowDown : MinusIcon;
              const dColor = absDelta < 1 ? "text-muted-foreground" : improved ? "text-green-600" : "text-red-600";
              return (
                <span className={`text-[9px] flex items-center gap-0.5 -mt-0.5 ${dColor}`}>
                  <DeltaIcon className="w-3 h-3" /> {Math.round(absDelta)}pp vs {DEFAULTS.scoreAnterior} (ant.)
                </span>
              );
            })()}
          </ScoreBoard>

          {/* 2. Cobertura (Qualidade) */}
          <div className="bg-card border border-border/50 rounded-xl p-4 hover:shadow-lg hover:-translate-y-0.5 transition-all flex flex-col">
            <div className="flex items-center gap-1 mb-2">
              <p className="text-[10px] font-semibold text-muted-foreground tracking-wide uppercase">Cobertura</p>
              <InfoTip text={`Cobertura de Férias\n─────────────────\n% de férias com cobertura formal cadastrada.\n\nJanela: últimos 12 meses.\n\nAtual ${DEFAULTS.qualidadePct}%`} />
            </div>
            <p className="text-xl font-bold mt-0.5 truncate text-foreground">{DEFAULTS.qualidadePct}%</p>
            <p className={`text-[11px] mt-0.5 font-medium ${DEFAULTS.qualidadeText}`}>{DEFAULTS.qualidadeLabel}</p>
            {renderVariation(DEFAULTS.qualidadeDeltaPp, `${DEFAULTS.qualidadeAnterior}%`, "pp")}
          </div>

          {/* 3. Antecedência Média (Tempo Médio) */}
          <div className="bg-card border border-border/50 rounded-xl p-4 hover:shadow-lg hover:-translate-y-0.5 transition-all flex flex-col">
            <div className="flex items-center gap-1 mb-2">
              <p className="text-[10px] font-semibold text-muted-foreground tracking-wide uppercase">Antecedência</p>
              <InfoTip text={`Antecedência Média\n─────────────────\nTempo médio entre lançamento da férias no sistema e seu início.\n\nJanela: últimos 12 meses.\n\nAtual ${formatTempoMedio(DEFAULTS.tempoMedioDias)}`} />
            </div>
            <p className="text-xl font-bold mt-0.5 truncate text-foreground">{formatTempoMedio(DEFAULTS.tempoMedioDias)}</p>
            <p className={`text-[11px] mt-0.5 font-medium ${DEFAULTS.tempoMedioColor}`}>{DEFAULTS.tempoMedioLabel}</p>
            {renderVariation(DEFAULTS.tempoMedioDeltaDias, `${DEFAULTS.tempoMedioAnterior} dias`, " dias", true)}
          </div>

          {/* 4. Sobrecarga (sem cobertura) */}
          <div className="bg-card border border-border/50 rounded-xl p-4 hover:shadow-lg hover:-translate-y-0.5 transition-all flex flex-col">
            <div className="flex items-center gap-1 mb-2">
              <p className="text-[10px] font-semibold text-muted-foreground tracking-wide uppercase">Sem Cobertura</p>
              <InfoTip text={`Férias sem Cobertura Formal\n─────────────────\n% de férias sem cobertura formal cadastrada no sistema.\n\nJanela: últimos 12 meses.\n\nAtual ${DEFAULTS.sobrecargaValue}%`} />
            </div>
            <p className="text-xl font-bold mt-0.5 truncate text-foreground">{DEFAULTS.sobrecargaValue}%</p>
            <p className={`text-[11px] mt-0.5 font-medium ${DEFAULTS.sobrecargaColor}`}>{DEFAULTS.sobrecargaLabel}</p>
            {(() => {
              const pctDelta = DEFAULTS.sobrecargaDeltaPct;
              const improved = pctDelta < 0;
              const DeltaIcon = pctDelta > 0 ? ArrowUp : pctDelta < 0 ? ArrowDown : MinusIcon;
              const dColor = Math.abs(pctDelta) < 3 ? "text-muted-foreground" : improved ? "text-green-600" : "text-red-600";
              return (
                <span className={`text-[10px] flex items-center gap-0.5 mt-1 ${dColor}`}>
                  <DeltaIcon className="w-3 h-3" /> {Math.abs(pctDelta)}% vs {DEFAULTS.sobrecargaAnterior} (ant.)
                </span>
              );
            })()}
          </div>

          {/* 5. Melhor Operação */}
          <UITooltip>
            <TooltipTrigger asChild>
              <div className="bg-card border border-border/50 rounded-xl p-4 hover:shadow-lg hover:-translate-y-0.5 transition-all flex flex-col">
                <div className="flex items-center gap-1 mb-2">
                  <p className="text-[10px] font-semibold text-muted-foreground tracking-wide uppercase">Melhor Operação</p>
                  <InfoTip text={`Melhor Operação\n─────────────────\nA operação com maior Score de Férias no período.\n\nJanela: últimos 12 meses.\n\n${DEFAULTS.melhorOperacao.nome}: Score ${DEFAULTS.melhorOperacao.score} (${DEFAULTS.melhorOperacao.label})`} />
                </div>
                <p className="text-lg font-bold mt-0.5 truncate text-foreground">{DEFAULTS.melhorOperacao.nome}</p>
                <p className={`text-[11px] mt-0.5 truncate ${DEFAULTS.melhorOperacao.text}`}>Score {DEFAULTS.melhorOperacao.score} · {DEFAULTS.melhorOperacao.label}</p>
                <span className="text-[10px] text-muted-foreground mt-0.5">Mantém posição</span>
              </div>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="max-w-[260px] text-xs">
              {DEFAULTS.melhorOperacao.nome}
            </TooltipContent>
          </UITooltip>

          {/* 6. Maior Risco */}
          <UITooltip>
            <TooltipTrigger asChild>
              <div className="bg-card border border-border/50 rounded-xl p-4 hover:shadow-lg hover:-translate-y-0.5 transition-all flex flex-col">
                <div className="flex items-center gap-1 mb-2">
                  <p className="text-[10px] font-semibold text-muted-foreground tracking-wide uppercase">Maior Risco</p>
                  <InfoTip text={`Maior Risco\n─────────────────\nA operação com menor Score de Férias no período.\nPrioridade alta de ação.\n\nJanela: últimos 12 meses.\n\n${DEFAULTS.maiorRisco.nome}: Score ${DEFAULTS.maiorRisco.score} (${DEFAULTS.maiorRisco.label})`} />
                </div>
                <p className="text-lg font-bold mt-0.5 truncate text-foreground">{DEFAULTS.maiorRisco.nome}</p>
                <p className={`text-[11px] mt-0.5 truncate ${DEFAULTS.maiorRisco.text}`}>Score {DEFAULTS.maiorRisco.score} · {DEFAULTS.maiorRisco.label}</p>
                <span className="text-[10px] text-muted-foreground mt-0.5">Mantém posição</span>
              </div>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="max-w-[260px] text-xs">
              {DEFAULTS.maiorRisco.nome}
            </TooltipContent>
          </UITooltip>
        </div>

        {/* Row 1: Mapa de Operações + Evolução */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-3">
          {/* Mapa de Operações */}
          <div className={`bg-card border rounded-xl p-4 ${selectedRegional ? "border-[#FF5722]/30" : "border-border/50"}`}>
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-1.5">
                <h4 className="text-sm font-semibold">Mapa de Operações</h4>
                <InfoTip text="Cada bolha é uma operação. Posição horizontal mostra o headcount (escala da operação). Posição vertical mostra o Score Operacional (saúde). Cor da bolha reforça a classificação do score." />
              </div>
              <div className="flex items-center gap-1.5">
                {criticalCount > 0 && mapaDimension === "score" && (
                  <span className="text-[10px] font-medium bg-red-50 text-red-600 border border-red-200 px-2 py-0.5 rounded-full">
                    {criticalCount} crítica{criticalCount > 1 ? "s" : ""}
                  </span>
                )}
                <select
                  value={mapaDimension}
                  onChange={(e) => setMapaDimension(e.target.value as any)}
                  className="h-7 pl-2 pr-6 text-[11px] font-medium rounded-md border border-border bg-card text-foreground appearance-none cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#FF5722] bg-[length:12px] bg-[right_4px_center] bg-no-repeat"
                  style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%239ca3af' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")` }}
                >
                  {Object.entries(dimensionConfig).map(([key, cfg]) => (
                    <option key={key} value={key}>{cfg.label}</option>
                  ))}
                </select>
                <button onClick={() => setChartDataModal("matrizSaude")} className="p-1 rounded hover:bg-muted/60 transition-colors" title="Ver dados">
                  <Database className="w-3.5 h-3.5 text-muted-foreground" />
                </button>
              </div>
            </div>
            <p className="text-[10px] text-muted-foreground mb-2">
              Headcount × {activeDimConfig.yLabel} · uma bolha por {groupBy === "empresa" ? "empresa" : groupBy === "unidade" ? "un. negócio" : "área"}{selectedMes ? ` · ${selectedMes}` : " · consolidado"}
            </p>
            <ResponsiveContainer width="100%" height={280}>
              <ScatterChart margin={{ top: 5, right: 50, bottom: 10, left: 0 }}>
                <defs>
                  <linearGradient id="mapaFeriasGradient" x1="1" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#22c55e" stopOpacity={0.20} />
                    <stop offset="50%" stopColor="#f59e0b" stopOpacity={0.10} />
                    <stop offset="100%" stopColor="#ef4444" stopOpacity={0.15} />
                  </linearGradient>
                </defs>
                <ReferenceArea x1={mapaDomain.xMin} x2={mapaDomain.xMax} y1={mapaDomain.yMin} y2={mapaDomain.yMax} fill="url(#mapaFeriasGradient)" strokeOpacity={0} />
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" dataKey="headcount" name="Headcount" domain={[mapaDomain.xMin, mapaDomain.xMax]} ticks={mapaDomain.xTicks} tick={{ fontSize: 10 }} label={{ value: "Headcount", position: "insideBottom", offset: -5, fontSize: 10 }} />
                <YAxis type="number" dataKey={mapaDimension} name={activeDimConfig.yLabel} domain={[mapaDomain.yMin, mapaDomain.yMax]} ticks={[0, 25, 50, 75, 100]} tick={{ fontSize: 10 }} label={{ value: activeDimConfig.yLabel, angle: -90, position: "insideLeft", fontSize: 10 }} />
                <ZAxis type="number" range={[150, 150]} />
                <ReferenceLine y={activeDimConfig.thresholds[0]} stroke="#22c55e" strokeWidth={1.5} strokeDasharray="8 4" label={({ viewBox }: any) => {
                  const { y, width, x } = viewBox || {};
                  const rightEdge = (x ?? 0) + (width ?? 0);
                  return (
                    <g>
                      <text x={rightEdge - 4} y={(y ?? 0) - 4} fontSize={9} fill="#22c55e" fontWeight={500} textAnchor="end">Limite saudável</text>
                    </g>
                  );
                }} />
                <ReferenceArea x1={mapaDomain.xMax * 0.75} x2={mapaDomain.xMax} y1={100} y2={110} fill="transparent" strokeOpacity={0} label={{ value: "Escala produtiva", position: "insideTopRight", fontSize: 9, fontWeight: 500, fill: "rgba(34,197,94,0.6)" }} />
                <ReferenceArea x1={mapaDomain.xMin} x2={mapaDomain.xMax * 0.25} y1={0} y2={5} fill="transparent" strokeOpacity={0} label={{ value: "Baixa performance", position: "insideBottomLeft", fontSize: 9, fontWeight: 500, fill: "rgba(239,68,68,0.6)" }} />
                <RechartsTooltip content={({ active, payload }) => {
                  if (!active || !payload?.length) return null;
                  const d: any = payload[0].payload;
                  const groupLabel = groupBy === "empresa" ? "empresa" : groupBy === "unidade" ? "un. negócio" : "área";
                  return (
                    <div className="bg-white border rounded-lg p-2.5 shadow-md text-xs space-y-1">
                      <p className="font-semibold text-sm">{d.regional}</p>
                      <p className="text-muted-foreground text-[10px]">{groupLabel}</p>
                      <hr className="border-border/50" />
                      <p>Score: <span className="font-bold" style={{ color: d.bubbleColor }}>{d.score}</span> · {d.classifLabel}</p>
                      <hr className="border-border/50" />
                      <p>Headcount: <span className="font-medium">{d.headcount}</span> pessoas</p>
                      <p>Cobertura: <span className="font-medium">{d.qualidade}%</span></p>
                      <p>Velocidade: <span className="font-medium">nota {d.velocidade}</span></p>
                      <p>Saúde do Back-office: <span className="font-medium">nota {d.backoffice}</span></p>
                    </div>
                  );
                }} />
                <Scatter data={DEFAULTS.mapaOperacoes.filter((d: any) => {
                  const val = getMapaVal(d);
                  const cat = val >= activeDimConfig.thresholds[0] ? "green" : val >= activeDimConfig.thresholds[1] ? "orange" : "red";
                  return mapaScoreFilter.has(cat);
                })} shape={(props: any) => {
                  const { cx, cy, payload } = props;
                  const r = 14;
                  const val = getMapaVal(payload);
                  const dynColor = getMapaBubbleColor(val);
                  const isFixed = fixedBubble === payload.regional;
                  const isSelected = !selectedRegional || selectedRegional === payload.regional;
                  const hasFilter = !!selectedRegional;
                  const opacity = isFixed ? 0.85 : isSelected ? 0.75 : 0.45;
                  const textColor = "#fff";
                  const clean = payload.regional.replace(/^VIG\s*EYES\s*/i, "").trim();
                  const abbr = clean ? clean.slice(0, 3).toUpperCase() : payload.regional.slice(0, 3).toUpperCase();
                  return (
                    <g
                      onClick={() => {
                        setFixedBubble(prev => prev === payload.regional ? null : payload.regional);
                        onRegionalClick(payload.regional);
                      }}
                      className="cursor-pointer"
                    >
                      <circle cx={cx} cy={cy} r={r} fill={dynColor} fillOpacity={opacity}
                        stroke={isFixed && hasFilter ? "#FF5722" : dynColor}
                        strokeWidth={isFixed && hasFilter ? 2 : 1}
                        strokeDasharray={isFixed && hasFilter ? "4 3" : "none"}
                      />
                      <text x={cx} y={cy - 3} textAnchor="middle" fontSize={8} fontWeight={700} fill={textColor} dominantBaseline="middle">
                        {abbr}
                      </text>
                      <text x={cx} y={cy + 6} textAnchor="middle" fontSize={7} fontWeight={600} fill={textColor} dominantBaseline="middle">
                        {val}
                      </text>
                    </g>
                  );
                }} />
              </ScatterChart>
            </ResponsiveContainer>
            <div className="flex items-center justify-center gap-3 mt-1 text-[10px]">
              {[
                { cat: "green", color: "#22c55e", label: `≥ ${activeDimConfig.thresholds[0]}` },
                { cat: "orange", color: "#f59e0b", label: `${activeDimConfig.thresholds[1]}-${activeDimConfig.thresholds[0]}` },
                { cat: "red", color: "#ef4444", label: `< ${activeDimConfig.thresholds[1]}` },
              ].map(({ cat, color, label }) => {
                const active = mapaScoreFilter.has(cat);
                return (
                  <button
                    key={cat}
                    onClick={() => toggleMapaScoreFilter(cat)}
                    className={`flex items-center gap-1 px-2 py-0.5 rounded-full border transition-all ${
                      active
                        ? "border-border/60 text-foreground"
                        : "border-transparent text-muted-foreground/40 line-through"
                    }`}
                  >
                    <span
                      className="w-2 h-2 rounded-full inline-block transition-opacity"
                      style={{ backgroundColor: color, opacity: active ? 1 : 0.3 }}
                    />
                    {label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Evolução da Cobertura e Headcount */}
          <div className={`bg-card border rounded-xl p-4 ${selectedMes ? "border-[#FF5722]/30" : "border-border/50"}`}>
            <div className="flex items-center justify-between mb-0.5">
              <div>
                <h4 className="text-sm font-semibold">Evolução da Cobertura e Headcount</h4>
                <p className="text-[10px] text-muted-foreground mb-2">Ferista dedicado vs Remanejo (barras) · Headcount Ativo (área) · clique para filtrar</p>
              </div>
              <button onClick={() => setChartDataModal("evoQualidade")} className="p-1.5 rounded-md hover:bg-muted transition-colors" title="Ver dados"><Database className="w-4 h-4 text-muted-foreground" /></button>
            </div>
            <div className="relative pt-6">
              <ResponsiveContainer width="100%" height={280}>
                <ComposedChart data={DEFAULTS.evolucaoQualidade} onClick={(e: any) => {
                  if (e?.activeLabel) setSelectedMes(prev => prev === e.activeLabel ? null : e.activeLabel);
                }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="mes" tick={(props: any) => {
                    const { x, y, payload } = props;
                    const isActive = selectedMes === payload.value;
                    return <text x={x} y={y + 12} textAnchor="middle" fontSize={10} fill={isActive ? "#FF5722" : "hsl(var(--muted-foreground))"} fontWeight={isActive ? 700 : 400}>{payload.value}</text>;
                  }} />
                  <YAxis yAxisId="left" tick={{ fontSize: 10 }} tickFormatter={v => v >= 1000 ? `${(v/1000).toFixed(0)}K` : `${v}`} label={{ value: "Volume de cobertura", angle: -90, position: "insideLeft", style: { fontSize: 10, fill: "hsl(var(--muted-foreground))" }, offset: 0 }} />
                  <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 10 }} domain={[0, rightDomainMax]} tickFormatter={v => v >= 1000 ? `${(v/1000).toFixed(0)}K` : `${v}`} label={{ value: "Headcount", angle: 90, position: "insideRight", style: { fontSize: 10, fill: "hsl(var(--muted-foreground))" }, offset: 0 }} />
                  <RechartsTooltip cursor={false} wrapperStyle={{ pointerEvents: "none" }} content={({ active, payload, label }) => {
                    if (!active || !payload?.length) return null;
                    const d: any = payload[0]?.payload;
                    const reg = d?.registradas ?? 0;
                    const jus = d?.justificadas ?? 0;
                    const total = reg + jus;
                    const activeHC = d?.activeHeadcount ?? 0;
                    const hcPonto = d?.hcPonto ?? 0;
                    return (
                      <div className="bg-white border rounded-lg p-2.5 shadow-md text-xs space-y-1">
                        <p className="font-semibold text-foreground">{label}</p>
                        <p className="text-muted-foreground">Total: <span className="font-semibold text-foreground">{total.toLocaleString("pt-BR")}</span></p>
                        {[{ name: "Ferista dedicado", value: reg, color: "#22c55e" }, { name: "Remanejo", value: jus, color: "#ef4444" }].map(f => (
                          <div key={f.name} className="flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5" style={{ backgroundColor: f.color }} />
                            <span className="text-muted-foreground">{f.name}:</span>
                            <span className="font-medium text-foreground">{`${((f.value / total) * 100).toFixed(0)}% (${f.value.toLocaleString("pt-BR")})`}</span>
                          </div>
                        ))}
                        <div className="border-t border-border/40 pt-1 mt-1 space-y-0.5">
                          <div className="flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5" style={{ backgroundColor: "#D3D1C7" }} />
                            <span className="text-muted-foreground">Headcount ativo:</span>
                            <span className="font-medium text-foreground">{activeHC} pessoas</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 bg-transparent" />
                            <span className="text-muted-foreground">Férias do mês:</span>
                            <span className="font-medium text-foreground">{hcPonto}</span>
                          </div>
                        </div>
                      </div>
                    );
                  }} />
                  <Area yAxisId="right" type="monotone" dataKey="activeHeadcount" fill="#D3D1C7" fillOpacity={0.4} stroke="#D3D1C7" strokeWidth={0} name="Headcount" />
                  <Bar yAxisId="left" dataKey="registradas" stackId="qual" radius={[0, 0, 0, 0]} name="Ferista dedicado">
                    {DEFAULTS.evolucaoQualidade.map((entry, idx) => {
                      const isActive = selectedMes && selectedMes === entry.mes;
                      const dimmed = selectedMes && selectedMes !== entry.mes;
                      return <Cell key={idx} fill={dimmed ? "rgba(34,197,94,0.45)" : "rgba(34,197,94,0.75)"} stroke={isActive ? "#FF5722" : "#22c55e"} strokeWidth={isActive ? 2 : 1} strokeDasharray={isActive ? "4 3" : "none"} />;
                    })}
                    <LabelList content={({ x, y, width, height, index }: any) => {
                      const d = DEFAULTS.evolucaoQualidade[index];
                      if (!d) return null;
                      const total = d.registradas + d.justificadas;
                      const pct = total > 0 ? ((d.registradas / total) * 100).toFixed(0) : "0";
                      return (
                        <text x={(x ?? 0) + (width ?? 0) / 2} y={(y ?? 0) + (height ?? 0) / 2 + 3} textAnchor="middle" fontSize={9} fill="#fff" fontWeight={600}>
                          {pct}%
                        </text>
                      );
                    }} />
                  </Bar>
                  <Bar yAxisId="left" dataKey="justificadas" stackId="qual" radius={[4, 4, 0, 0]} name="Remanejo">
                    {DEFAULTS.evolucaoQualidade.map((entry, idx) => {
                      const isActive = selectedMes && selectedMes === entry.mes;
                      const dimmed = selectedMes && selectedMes !== entry.mes;
                      return <Cell key={idx} fill={dimmed ? "rgba(239,68,68,0.45)" : "rgba(239,68,68,0.75)"} stroke={isActive ? "#FF5722" : "#ef4444"} strokeWidth={isActive ? 2 : 1} strokeDasharray={isActive ? "4 3" : "none"} />;
                    })}
                    <LabelList content={({ x, y, width, height, index }: any) => {
                      const d = DEFAULTS.evolucaoQualidade[index];
                      if (!d) return null;
                      const total = d.registradas + d.justificadas;
                      const pct = total > 0 ? ((d.justificadas / total) * 100).toFixed(0) : "0";
                      return (
                        <text x={(x ?? 0) + (width ?? 0) / 2} y={(y ?? 0) + (height ?? 0) / 2 + 3} textAnchor="middle" fontSize={9} fill="#fff" fontWeight={600}>
                          {pct}%
                        </text>
                      );
                    }} />
                  </Bar>
                  <Legend iconType="square" iconSize={10} wrapperStyle={{ fontSize: 10, paddingTop: 8 }} payload={[
                    { value: "Ferista dedicado", type: "square", color: "#22c55e" },
                    { value: "Remanejo", type: "square", color: "#ef4444" },
                    { value: "Headcount Ativo", type: "square", color: "#D3D1C7" },
                  ]} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Row 2: Evolução do Tempo de Tratativa + Sobrecarga */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-3">
          {/* Evolução do Tempo de Tratativa */}
          <div className={`bg-card border rounded-xl p-4 ${selectedMes ? "border-[#FF5722]/30" : "border-border/50"}`}>
            <div className="flex items-center justify-between mb-0.5">
              <div>
                <h4 className="text-sm font-semibold">Evolução da Antecedência de Planejamento</h4>
                <p className="text-[10px] text-muted-foreground mb-2">Evolução mensal da distribuição por faixa · linha azul = tempo médio (dias)</p>
              </div>
              <button onClick={() => setChartDataModal("evoTratativa")} className="p-1.5 rounded-md hover:bg-muted transition-colors" title="Ver dados"><Database className="w-4 h-4 text-muted-foreground" /></button>
            </div>
            <div className="relative pt-6">
              <ResponsiveContainer width="100%" height={280}>
                <ComposedChart data={tempoTratativaData} onClick={(e: any) => {
                  if (e?.activeLabel) setSelectedMes(prev => prev === e.activeLabel ? null : e.activeLabel);
                }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="mes" tick={(props: any) => {
                    const { x, y, payload } = props;
                    const isActive = selectedMes === payload.value;
                    return <text x={x} y={y + 12} textAnchor="middle" fontSize={10} fill={isActive ? "#FF5722" : "hsl(var(--muted-foreground))"} fontWeight={isActive ? 700 : 400}>{payload.value}</text>;
                  }} />
                  <YAxis yAxisId="left" tick={{ fontSize: 10 }} domain={[0, 100]} tickFormatter={v => `${v}%`} label={{ value: "Distribuição por faixa (%)", angle: -90, position: "insideLeft", style: { fontSize: 10, fill: "hsl(var(--muted-foreground))" }, offset: 0 }} />
                  <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 10 }} label={{ value: "Tempo médio (dias)", angle: 90, position: "insideRight", style: { fontSize: 10, fill: "hsl(var(--muted-foreground))" }, offset: 0 }} />
                  {selectedMes && <ReferenceLine yAxisId="left" x={selectedMes} stroke="#FF5722" strokeWidth={2} strokeDasharray="4 3" />}
                  <RechartsTooltip cursor={false} wrapperStyle={{ pointerEvents: "none" }} content={({ active, payload, label }) => {
                    if (!active || !payload?.length) return null;
                    const d: any = payload[0]?.payload;
                    if (!d) return null;
                    const faixaColors: Record<string, string> = { ate1d: "#22c55e", de1a3d: "#84cc16", de3a7d: "#f59e0b", de7a15d: "#f97316", mais15d: "#ef4444" };
                    const faixaLabels: Record<string, string> = { ate1d: "Até 1 dia", de1a3d: "1–3 dias", de3a7d: "3–7 dias", de7a15d: "7–15 dias", mais15d: "+15 dias" };
                    const rawKeys: Record<string, string> = { ate1d: "rawAte1d", de1a3d: "rawDe1a3d", de3a7d: "rawDe3a7d", de7a15d: "rawDe7a15d", mais15d: "rawMais15d" };
                    return (
                      <div className="bg-white border rounded-lg p-2.5 shadow-md text-xs space-y-1">
                        <p className="font-semibold text-foreground">{label}</p>
                        <p className="text-muted-foreground">Total: <span className="font-semibold text-foreground">{(d.total ?? 0).toLocaleString("pt-BR")}</span></p>
                        {["ate1d", "de1a3d", "de3a7d", "de7a15d", "mais15d"].map(k => {
                          const pct = d[k] ?? 0;
                          const abs = d[rawKeys[k]] ?? 0;
                          return (
                            <div key={k} className="flex items-center gap-1.5">
                              <span className="w-2.5 h-2.5" style={{ backgroundColor: faixaColors[k] }} />
                              <span className="text-muted-foreground">{faixaLabels[k]}:</span>
                              <span className="font-medium text-foreground">{pct}% ({abs.toLocaleString("pt-BR")})</span>
                            </div>
                          );
                        })}
                        <div className="border-t border-border/40 pt-1 mt-1 flex items-center gap-1.5">
                          <span className="w-2.5 h-0 border-t-2 border-dashed" style={{ borderColor: "#3b82f6", width: 10 }} />
                          <span className="text-muted-foreground">Tempo médio:</span>
                          <span className="font-medium text-foreground">{d.tempoMedio} dias</span>
                        </div>
                      </div>
                    );
                  }} />
                  <Area yAxisId="left" type="monotone" dataKey="ate1d" stackId="faixa" fill="#22c55e" fillOpacity={0.35} stroke="#22c55e" strokeWidth={0.5} name="Até 1 dia" />
                  <Area yAxisId="left" type="monotone" dataKey="de1a3d" stackId="faixa" fill="#84cc16" fillOpacity={0.35} stroke="#84cc16" strokeWidth={0.5} name="1-3 dias" />
                  <Area yAxisId="left" type="monotone" dataKey="de3a7d" stackId="faixa" fill="#f59e0b" fillOpacity={0.35} stroke="#f59e0b" strokeWidth={0.5} name="3-7 dias" />
                  <Area yAxisId="left" type="monotone" dataKey="de7a15d" stackId="faixa" fill="#f97316" fillOpacity={0.35} stroke="#f97316" strokeWidth={0.5} name="7-15 dias" />
                  <Area yAxisId="left" type="monotone" dataKey="mais15d" stackId="faixa" fill="#ef4444" fillOpacity={0.35} stroke="#ef4444" strokeWidth={0.5} name="+15 dias" />
                  <Line yAxisId="right" type="monotone" dataKey="tempoMedio" name="Tempo médio (dias)" stroke="#3b82f6" strokeWidth={2} strokeDasharray="6 3" dot={{ r: 3, fill: "#3b82f6" }} />
                  <Legend iconType="square" iconSize={10} wrapperStyle={{ fontSize: 10, paddingTop: 8 }} payload={[
                    { value: "Até 1 dia", type: "square", color: "#22c55e" },
                    { value: "1-3 dias", type: "square", color: "#84cc16" },
                    { value: "3-7 dias", type: "square", color: "#f59e0b" },
                    { value: "7-15 dias", type: "square", color: "#f97316" },
                    { value: "+15 dias", type: "square", color: "#ef4444" },
                    { value: "Tempo médio (dias)", type: "line", color: "#3b82f6" },
                  ]} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Sobrecarga / Risco */}
          <div className={`bg-card border rounded-xl p-4 ${selectedMes ? "border-[#FF5722]/30" : "border-border/50"}`}>
            <div className="flex items-center justify-between mb-0.5">
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="text-sm font-semibold">Risco de Cobertura em Férias</h4>
                  <InfoTip text="Mostra quantas férias afetam cada operador em média por mês e quantas horas extras o time teve. A cor da barra indica se a carga está dentro do normal histórico ou em zona crítica. A linha tracejada mostra horas extras acumuladas, para entender como o time absorveu os picos." />
                </div>
                <p className="text-[10px] text-muted-foreground mb-1">
                  Carga de férias e HE por operador. Linha tracejada azul = HE total do time.
                </p>
              </div>
              <button onClick={() => setChartDataModal("sobrecarga")} className="text-muted-foreground hover:text-foreground transition-colors" title="Ver dados do gráfico">
                <Database className="w-4 h-4" />
              </button>
            </div>
            <div className="relative pt-6">
              <ResponsiveContainer width="100%" height={280}>
                <ComposedChart data={sobrecargaData} margin={{ top: 24, right: 10, bottom: 0, left: 0 }} onClick={(e: any) => {
                  if (e?.activeLabel) setSelectedMes(prev => prev === e.activeLabel ? null : e.activeLabel);
                }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="mes" tick={(props: any) => {
                    const { x, y, payload } = props;
                    const isActive = selectedMes === payload.value;
                    return <text x={x} y={y + 12} textAnchor="middle" fontSize={10} fill={isActive ? "#FF5722" : "hsl(var(--muted-foreground))"} fontWeight={isActive ? 700 : 400}>{payload.value}</text>;
                  }} />
                  <YAxis yAxisId="left" tick={{ fontSize: 10 }} />
                  <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 10 }} tickFormatter={(v: number) => v >= 1000 ? `${(v/1000).toFixed(1).replace('.', ',')}k` : `${v}`} label={{ value: "HE (h)", angle: 90, position: "insideRight", fontSize: 9, fill: "hsl(var(--muted-foreground))" }} />
                  <ReferenceLine yAxisId="left" y={limiteSaudavel} stroke="#22c55e" strokeDasharray="5 3" strokeWidth={1.2} label={({ viewBox }: any) => {
                    const { y, width, x } = viewBox || {};
                    const rightEdge = (x ?? 0) + (width ?? 0);
                    return (
                      <g>
                        <text x={rightEdge - 4} y={(y ?? 0) - 4} fontSize={9} fill="#22c55e" fontWeight={500} textAnchor="end">Limite saudável</text>
                      </g>
                    );
                  }} />
                  <RechartsTooltip cursor={false} wrapperStyle={{ pointerEvents: "none" }} content={({ active, payload, label }) => {
                    if (!active || !payload?.length) return null;
                    const d: any = payload[0]?.payload;
                    if (!d) return null;
                    return (
                      <div className="bg-white border rounded-lg p-2.5 shadow-md text-xs space-y-1">
                        <p className="font-semibold text-foreground">{label}</p>
                        <hr className="border-border/50" />
                        <div className="flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5" style={{ backgroundColor: d.barColor }} />
                          <span className="text-muted-foreground">Férias por operador:</span>
                          <span className="font-medium text-foreground">{d.produtividade.toLocaleString("pt-BR")}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 bg-blue-500" />
                          <span className="text-muted-foreground">Operadores ativos:</span>
                          <span className="font-medium text-foreground">{d.operadores}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 bg-blue-500" />
                          <span className="text-muted-foreground">HE rateada do time:</span>
                          <span className="font-medium text-foreground">{d.he.toLocaleString("pt-BR")}h</span>
                        </div>
                        <div className="flex items-center gap-1.5 pt-1 border-t border-border/50">
                          <span className="text-muted-foreground">Status:</span>
                          <span className="font-medium" style={{ color: d.barColor }}>{d.categoria}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-muted-foreground">Limite saudável:</span>
                          <span className="font-medium text-foreground">{d.limiteSaudavel} fer/operador</span>
                        </div>
                      </div>
                    );
                  }} />
                  <Bar yAxisId="left" dataKey="produtividade" radius={[4, 4, 0, 0]} name="Carga por operador" strokeWidth={1}>
                    {sobrecargaData.map((entry, idx) => {
                      const dimmed = selectedMes && selectedMes !== entry.mes;
                      const baseColor = entry.barColor;
                      const hexToRgb = (hex: string) => {
                        const r = parseInt(hex.slice(1, 3), 16);
                        const g = parseInt(hex.slice(3, 5), 16);
                        const b = parseInt(hex.slice(5, 7), 16);
                        return `${r},${g},${b}`;
                      };
                      const isActive = selectedMes && selectedMes === entry.mes;
                      return <Cell key={idx} fill={dimmed ? `rgba(${hexToRgb(baseColor)},0.45)` : `rgba(${hexToRgb(baseColor)},0.75)`} stroke={isActive ? "#FF5722" : baseColor} strokeWidth={isActive ? 2 : 1} strokeDasharray={isActive ? "4 3" : "none"} />;
                    })}
                    <LabelList content={({ x, y, width: w, height: h, index }: any) => {
                      const d = sobrecargaData[index];
                      if (!d) return null;
                      const barH = h ?? 0;
                      return (
                        <g>
                          <text x={(x ?? 0) + (w ?? 0) / 2} y={(y ?? 0) + barH / 2 + 3} textAnchor="middle" fontSize={9} fill="#fff" fontWeight={600}>
                            {d.operadores >= 1000 ? `${(d.operadores/1000).toFixed(1).replace('.', ',')}k` : d.operadores}
                          </text>
                        </g>
                      );
                    }} />
                  </Bar>
                  <Line yAxisId="right" type="monotone" dataKey="he" name="Horas extras" stroke="#3b82f6" strokeWidth={2} strokeDasharray="6 3" dot={{ r: 3, fill: "#3b82f6" }} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
            {/* Legend */}
            <div className="flex items-center justify-center gap-4 mt-1 text-[10px] text-muted-foreground">
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 inline-block" style={{ backgroundColor: "#22c55e", opacity: 0.75 }} /> Saudável</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 inline-block" style={{ backgroundColor: "#f59e0b", opacity: 0.75 }} /> Acima do limite</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 inline-block" style={{ backgroundColor: "#ef4444", opacity: 0.75 }} /> Pico crítico</span>
              <span className="flex items-center gap-1"><span className="w-1.5 h-0 inline-block border-t-2 border-dashed" style={{ borderColor: "#3b82f6", width: 12 }} /> HE do time</span>
            </div>
          </div>
        </div>

        {/* Insights da Aba */}
        <div className="bg-card border border-border/50 rounded-xl p-4">
          <div className="flex items-center gap-1.5 mb-3">
            <h4 className="text-sm font-semibold">Insights de Férias</h4>
            <InfoTip text="Análises automáticas dos principais riscos e oportunidades em gestão de férias do período." />
          </div>
          <div className="space-y-2">
            <div className="flex items-start gap-2 p-3 rounded-lg bg-red-50 border border-red-200">
              <span className="text-red-600 text-xs font-semibold mt-0.5">⚠️ RISCO</span>
              <div className="flex-1">
                <p className="text-xs font-medium text-foreground">98,8% das férias têm ponto batido pelo titular</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">Escala não é desativada em férias — passivo trabalhista estrutural.</p>
              </div>
            </div>
            <div className="flex items-start gap-2 p-3 rounded-lg bg-orange-50 border border-orange-200">
              <span className="text-orange-600 text-xs font-semibold mt-0.5">🟠 ATENÇÃO</span>
              <div className="flex-1">
                <p className="text-xs font-medium text-foreground">Antecedência média de 14,9 dias</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">Planejamento de última hora — gestão reativa de férias.</p>
              </div>
            </div>
            <div className="flex items-start gap-2 p-3 rounded-lg bg-amber-50 border border-amber-200">
              <span className="text-amber-600 text-xs font-semibold mt-0.5">🟡 OPORTUNIDADE</span>
              <div className="flex-1">
                <p className="text-xs font-medium text-foreground">29% das férias sem cobertura formal</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">Posto descoberto ou cobertura informal — formalizar substituições.</p>
              </div>
            </div>
            <div className="flex items-start gap-2 p-3 rounded-lg bg-green-50 border border-green-200">
              <span className="text-green-600 text-xs font-semibold mt-0.5">✓ POSITIVO</span>
              <div className="flex-1">
                <p className="text-xs font-medium text-foreground">HE na cobertura está em 2,49%</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">HE é minoritária na cobertura — operação cobre bem com remanejos planejados.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar (idêntica à aba Ponto: ops, insights, chat AI) */}
      <GroupBySidebar
        items={DEFAULTS.sidebarItems}
        selectedRegional={selectedRegional}
        onRegionalClick={onRegionalClick}
        onItemDetail={() => {}}
        groupBy={groupBy}
        onGroupByChange={onGroupByChange}
      />

      {/* Modais (mesmas instâncias que a aba Ponto) */}
      <ChartDataModal
        open={chartDataModal === "evoQualidade"}
        onClose={() => setChartDataModal(null)}
        title="Evolução da Cobertura e Headcount"
        columns={evolucaoQualidadeHeadcountColumns}
        source={evolucaoQualidadeHeadcountSource}
        activeGroupBy={groupBy as "empresa" | "unidade" | "area"}
      />
      <ChartDataModal
        open={chartDataModal === "evoTratativa"}
        onClose={() => setChartDataModal(null)}
        title="Evolução da Antecedência de Planejamento"
        columns={evolucaoTempoTratativaColumns}
        source={evolucaoTempoTratativaSource}
        activeGroupBy={groupBy as "empresa" | "unidade" | "area"}
      />
      <CompositeChartDataModal
        open={chartDataModal === "matrizSaude"}
        onClose={() => setChartDataModal(null)}
        title="Mapa de Operações"
        subtitle="Gráfico de síntese · consolida dados de 3 fontes (Score = Cobertura + Antecedência + Risco)"
        activeGroupBy={groupBy as "empresa" | "unidade" | "area"}
        sections={[
          { label: "Fonte 1: Evolução da Cobertura e Headcount", source: evolucaoQualidadeHeadcountSource, columns: evolucaoQualidadeHeadcountColumns },
          { label: "Fonte 2: Evolução da Antecedência de Planejamento", source: evolucaoTempoTratativaSource, columns: evolucaoTempoTratativaColumns },
          { label: "Fonte 3: Risco de Cobertura em Férias", source: sobrecargaBackofficeSource, columns: sobrecargaBackofficeColumns },
        ]}
      />
      <ChartDataModal
        open={chartDataModal === "sobrecarga"}
        onClose={() => setChartDataModal(null)}
        title="Risco de Cobertura em Férias"
        columns={sobrecargaBackofficeColumns}
        source={sobrecargaBackofficeSource}
        activeGroupBy={groupBy as "empresa" | "unidade" | "area"}
      />
    </div>
  );
}
