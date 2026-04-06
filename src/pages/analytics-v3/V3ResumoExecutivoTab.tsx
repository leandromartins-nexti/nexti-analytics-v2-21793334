import { TrendingUp, ShieldAlert, Lightbulb, Info, Trophy, Target, AlertTriangle, CheckCircle2, Zap, ArrowUpRight } from "lucide-react";
import { getV3KPIs, formatCurrencyV3, generateV3Insights, getNivelConfianca, getScoreOperacional, getScoreFaixa, absenteismoV3, getEvolucaoConsolidada, getEvolucaoOperacional, driversV3 } from "@/lib/analyticsV3Data";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, ReferenceLine } from "recharts";
import SpeedometerGauge from "./SpeedometerGauge";

export default function V3ResumoExecutivoTab() {
  const kpis = getV3KPIs();
  const insights = generateV3Insights();
  const nivelConfianca = getNivelConfianca();
  const scoreOp = getScoreOperacional();
  const scoreFaixa = getScoreFaixa(scoreOp);
  const evolucao = getEvolucaoConsolidada();
  const evolucaoOp = getEvolucaoOperacional();
  const mediaEconomia = Math.round(evolucao.reduce((s, e) => s + e.economiaGerada, 0) / evolucao.length);
  const topDriverData = driversV3.filter(d => d.categoria === "monetario" && d.ativo).sort((a, b) => b.valorMonetizado - a.valorMonetizado)[0];

  const insightIcons = [Zap, ArrowUpRight, AlertTriangle, CheckCircle2, Target, AlertTriangle, TrendingUp];
  const insightStyles = [
    "border-l-4 border-l-primary bg-primary/5",
    "border-l-4 border-l-green-500 bg-green-50",
    "border-l-4 border-l-red-500 bg-red-50",
    "border-l-4 border-l-blue-500 bg-blue-50",
    "border-l-4 border-l-green-500 bg-green-50",
    "border-l-4 border-l-amber-500 bg-amber-50",
    "border-l-4 border-l-blue-500 bg-blue-50",
  ];
  const insightIconColors = ["text-primary", "text-green-600", "text-red-500", "text-blue-600", "text-green-600", "text-amber-600", "text-blue-600"];

  return (
    <TooltipProvider>
      <div className="space-y-5">
        {/* Hero: Economia + Score */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-gray-200">
            <div className="p-8">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-[#FF5722]" />
                <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Economia Gerada</p>
              </div>
              <h1 className="text-5xl lg:text-6xl font-extrabold text-gray-800 tracking-tight leading-none">{formatCurrencyV3(kpis.valorCapturado)}</h1>
              <p className="text-sm text-gray-500 mt-3">Resultado consolidado da evolução operacional no período analisado</p>
              <div className="mt-4 flex items-center gap-2 flex-wrap">
                <span className="bg-orange-50 text-[#FF5722] border border-[#FF5722]/30 rounded-full px-3 py-1 text-xs font-medium">abr/2025 – mar/2026</span>
                <span className="bg-gray-100 text-gray-600 rounded-full px-3 py-1 text-xs font-medium">Orsegups</span>
                <span className="bg-gray-100 text-gray-600 rounded-full px-3 py-1 text-xs font-medium">8.000 colaboradores</span>
              </div>
            </div>
            <div className="p-8 flex flex-col items-center justify-center">
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-5 flex items-center gap-1.5">
                Score Operacional
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="w-3.5 h-3.5 text-gray-400 cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs text-xs">
                    Composição: qualidade do ponto, absenteísmo, coberturas, postos descobertos, reserva técnica e dependência de HE.
                  </TooltipContent>
                </Tooltip>
              </p>
              <SpeedometerGauge value={scoreOp} />
              <p className="text-base font-bold mt-4" style={{ color: scoreFaixa.color }}>{scoreFaixa.label}</p>
              <p className="text-xs text-gray-400 mt-1">Saúde geral da operação no período</p>
            </div>
          </div>
        </div>

        {/* 4 KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-1">
              <p className="text-xs text-gray-500 flex items-center gap-1">
                Nível de Confiança
                <Tooltip>
                  <TooltipTrigger asChild><Info className="w-3 h-3 text-gray-400 cursor-help" /></TooltipTrigger>
                  <TooltipContent className="max-w-xs text-xs">Confiabilidade da economia: soma(valor × peso_confiança) / soma(valor)</TooltipContent>
                </Tooltip>
              </p>
              <Target className="w-4 h-4 text-[#FF5722]" />
            </div>
            <p className={`text-2xl font-bold ${nivelConfianca >= 75 ? "text-green-600" : nivelConfianca >= 50 ? "text-amber-600" : "text-red-600"}`}>{nivelConfianca}%</p>
            <div className="w-full bg-gray-100 rounded-full h-1.5 mt-2">
              <div className="h-1.5 rounded-full transition-all" style={{ width: `${nivelConfianca}%`, backgroundColor: nivelConfianca >= 75 ? "hsl(142,71%,45%)" : nivelConfianca >= 50 ? "hsl(45,93%,47%)" : "hsl(0,84%,60%)" }} />
            </div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-1">
              <p className="text-xs text-gray-500">Principal Alavanca</p>
              <Trophy className="w-4 h-4 text-amber-500" />
            </div>
            <p className="text-sm font-bold text-gray-800 leading-tight">{topDriverData?.nome}</p>
            <p className="text-xs text-gray-500 mt-1">{formatCurrencyV3(topDriverData?.valorMonetizado ?? 0)} · {topDriverData?.participacao}%</p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-1">
              <p className="text-xs text-gray-500">Melhor Operação</p>
              <TrendingUp className="w-4 h-4 text-green-500" />
            </div>
            <p className="text-lg font-bold text-gray-800">{kpis.melhorOperacao}</p>
            <p className="text-xs text-gray-500 mt-1">Score 88 · Tendência de alta</p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-1">
              <p className="text-xs text-gray-500">Maior Risco</p>
              <ShieldAlert className="w-4 h-4 text-red-500" />
            </div>
            <p className="text-lg font-bold text-gray-800">{kpis.maiorRisco}</p>
            <p className="text-xs text-gray-500 mt-1">Score 64 · Absenteísmo {absenteismoV3.porEstrutura.find(e => e.nome === "Regional BA")?.taxa}%</p>
          </div>
        </div>

        {/* Two charts + Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
          {/* Charts column - 3/5 */}
          <div className="lg:col-span-3 space-y-5">
            {/* Chart 1: Evolução Operacional */}
            <div className="bg-white rounded-lg border border-gray-200 p-5">
              <div className="mb-4">
                <h3 className="font-semibold text-gray-800 text-sm">Evolução Operacional dos Principais Vetores</h3>
                <p className="text-xs text-gray-500">Disciplina, absenteísmo e movimentações por competência</p>
              </div>
              <div className="flex flex-wrap gap-x-4 gap-y-1 mb-3">
                <div className="flex items-center gap-1.5"><div className="w-2.5 h-0.5 bg-green-500 rounded" /><span className="text-[10px] text-gray-500">Qualidade do Ponto (%)</span></div>
                <div className="flex items-center gap-1.5"><div className="w-2.5 h-0.5 bg-red-500 rounded" /><span className="text-[10px] text-gray-500">Absenteísmo (%)</span></div>
                <div className="flex items-center gap-1.5"><div className="w-2.5 h-0.5 bg-amber-500 rounded" /><span className="text-[10px] text-gray-500">Pressão Operacional</span></div>
              </div>
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={evolucaoOp}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                  <XAxis dataKey="mes" fontSize={10} tick={{ fill: "#6b7280" }} axisLine={false} tickLine={false} />
                  <YAxis yAxisId="pct" domain={[0, 100]} fontSize={10} tick={{ fill: "#6b7280" }} axisLine={false} tickLine={false} tickFormatter={v => `${v}%`} />
                  <YAxis yAxisId="abs" orientation="right" hide />
                  <RechartsTooltip
                    content={({ active, payload, label }) => {
                      if (!active || !payload?.length) return null;
                      return (
                        <div className="bg-white border border-gray-200 rounded-lg shadow-xl p-3 text-xs">
                          <p className="font-bold text-gray-800 mb-1.5">{label}</p>
                          {payload.map((p, i) => (
                            <div key={i} className="flex justify-between gap-4 py-0.5">
                              <span className="text-gray-500">{p.name}</span>
                              <span className="font-medium text-gray-800">{typeof p.value === 'number' ? (p.name?.toString().includes('Moviment') ? p.value.toLocaleString() : `${p.value}%`) : p.value}</span>
                            </div>
                          ))}
                        </div>
                      );
                    }}
                  />
                  <Line yAxisId="pct" type="monotone" dataKey="qualidadePonto" stroke="#22c55e" strokeWidth={2} dot={{ r: 2 }} name="Qualidade do Ponto" />
                  <Line yAxisId="pct" type="monotone" dataKey="absenteismo" stroke="#ef4444" strokeWidth={2} dot={{ r: 2 }} name="Absenteísmo" />
                  <Line yAxisId="pct" type="monotone" dataKey="pressaoOperacional" stroke="#f59e0b" strokeWidth={2} dot={{ r: 2 }} name="Pressão Operacional" strokeDasharray="4 2" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Chart 2: Economia por competência */}
            <div className="bg-white rounded-lg border border-gray-200 p-5">
              <div className="mb-4">
                <h3 className="font-semibold text-gray-800 text-sm">Economia Gerada por Competência</h3>
                <p className="text-xs text-gray-500">Valor capturado mês a mês ao longo do período</p>
              </div>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={evolucao} barCategoryGap="15%">
                  <defs>
                    <linearGradient id="barGradResumo" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#FF5722" stopOpacity={0.9} />
                      <stop offset="100%" stopColor="#FF5722" stopOpacity={0.4} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                  <XAxis dataKey="mes" fontSize={10} tick={{ fill: "#6b7280" }} axisLine={false} tickLine={false} />
                  <YAxis fontSize={10} tick={{ fill: "#6b7280" }} axisLine={false} tickLine={false} tickFormatter={v => formatCurrencyV3(v)} />
                  <RechartsTooltip
                    content={({ active, payload, label }) => {
                      if (!active || !payload?.length) return null;
                      const dataPoint = evolucao.find(e => e.mes === label);
                      return (
                        <div className="bg-white border border-gray-200 rounded-lg shadow-xl p-3 text-xs">
                          <p className="font-bold text-gray-800 mb-1.5">{label}</p>
                          <div className="space-y-1">
                            <div className="flex justify-between gap-4"><span className="text-gray-500">Economia</span><span className="font-semibold text-gray-800">{formatCurrencyV3(dataPoint?.economiaGerada ?? 0)}</span></div>
                            <div className="flex justify-between gap-4"><span className="text-gray-500">Acumulado</span><span className="font-medium text-gray-500">{formatCurrencyV3(dataPoint?.acumulado ?? 0)}</span></div>
                            <div className="flex justify-between gap-4"><span className="text-gray-500">% Comprovado</span><span className="font-medium text-green-600">{dataPoint?.pctComprovado ?? 0}%</span></div>
                          </div>
                        </div>
                      );
                    }}
                  />
                  <ReferenceLine
                    y={mediaEconomia}
                    stroke="#6b7280"
                    strokeWidth={1.5}
                    strokeDasharray="6 3"
                    label={{ value: `Média: ${formatCurrencyV3(mediaEconomia)}`, position: "right", fontSize: 10, fill: "#6b7280" }}
                  />
                  <Bar dataKey="economiaGerada" fill="url(#barGradResumo)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Insights - 2/5 */}
          <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200 p-5 flex flex-col">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-1.5 rounded-lg bg-orange-50">
                <Lightbulb className="w-4 h-4 text-[#FF5722]" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 text-sm">Insights da Operação</h3>
                <p className="text-[10px] text-gray-500">Análise executiva do período</p>
              </div>
            </div>
            <div className="space-y-2 flex-1 overflow-y-auto">
              {insights.map((insight, i) => {
                const Icon = insightIcons[i % insightIcons.length];
                const style = insightStyles[i % insightStyles.length];
                const iconColor = insightIconColors[i % insightIconColors.length];
                return (
                  <div key={i} className={`flex items-start gap-2.5 rounded-lg p-3 ${style}`}>
                    <Icon className={`w-4 h-4 mt-0.5 shrink-0 ${iconColor}`} />
                    <p className="text-xs text-gray-600 leading-relaxed">{insight}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
