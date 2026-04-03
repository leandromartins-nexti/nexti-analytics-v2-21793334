import { TrendingUp, ShieldAlert, Lightbulb, Info, Trophy, Target, AlertTriangle, CheckCircle2, TrendingDown, Zap, ArrowUpRight } from "lucide-react";
import { getV3KPIs, formatCurrencyV3, generateV3Insights, driversV3, getNivelConfianca, getScoreOperacional, getScoreFaixa, absenteismoV3, getEvolucaoEmpilhada, getMediaPeriodo, driverColors, getDriverName } from "@/lib/analyticsV3Data";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, ReferenceLine } from "recharts";
import SpeedometerGauge from "./SpeedometerGauge";

const driverKeys = ["he", "an", "desc", "rhd", "fech", "disp", "quad", "hpnf", "benef"];

export default function V3ResumoExecutivoTab() {
  const kpis = getV3KPIs();
  const insights = generateV3Insights();
  const nivelConfianca = getNivelConfianca();
  const scoreOp = getScoreOperacional();
  const scoreFaixa = getScoreFaixa(scoreOp);
  const topDriver = driversV3.filter(d => d.categoria === "monetario" && d.ativo).sort((a, b) => b.valorMonetizado - a.valorMonetizado)[0];
  const evolucaoEmpilhada = getEvolucaoEmpilhada();
  const mediaPeriodo = getMediaPeriodo();

  const insightIcons = [Zap, ArrowUpRight, AlertTriangle, TrendingUp, CheckCircle2, AlertTriangle, TrendingUp];
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
        {/* Hero: Economia + Score lado a lado */}
        <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-border">
            <div className="p-8">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Economia Gerada</p>
              </div>
              <h1 className="text-5xl lg:text-6xl font-extrabold text-foreground tracking-tight leading-none">{formatCurrencyV3(kpis.valorCapturado)}</h1>
              <p className="text-sm text-muted-foreground mt-3">Resultado consolidado da evolução operacional no período analisado</p>
              <div className="mt-4 flex items-center gap-2 flex-wrap">
                <span className="bg-primary/10 text-primary border border-primary/20 rounded-full px-3 py-1 text-xs font-medium">abr/2025 – mar/2026</span>
                <span className="bg-muted text-muted-foreground rounded-full px-3 py-1 text-xs font-medium">Orsegups</span>
                <span className="bg-muted text-muted-foreground rounded-full px-3 py-1 text-xs font-medium">8.000 colaboradores</span>
              </div>
            </div>
            <div className="p-8 flex flex-col items-center justify-center">
              <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-5 flex items-center gap-1.5">
                Score Operacional
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="w-3.5 h-3.5 text-muted-foreground/50 cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs text-xs">
                    Leitura consolidada da eficiência, estabilidade e risco operacional da operação no período analisado.
                  </TooltipContent>
                </Tooltip>
              </p>
              <SpeedometerGauge value={scoreOp} />
              <p className="text-base font-bold mt-4" style={{ color: scoreFaixa.color }}>{scoreFaixa.label}</p>
              <p className="text-xs text-muted-foreground/60 mt-1">Saúde geral da operação no período</p>
            </div>
          </div>
        </div>

        {/* 4 KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-card rounded-xl border border-border p-4">
            <div className="flex items-center justify-between mb-1">
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                Nível de Confiança
                <Tooltip>
                  <TooltipTrigger asChild><Info className="w-3 h-3 text-muted-foreground/50 cursor-help" /></TooltipTrigger>
                  <TooltipContent className="max-w-xs text-xs">Indicador que representa a confiabilidade da economia gerada, considerando a composição entre drivers comprovados, híbridos e referenciais e os pesos definidos na configuração.</TooltipContent>
                </Tooltip>
              </p>
              <Target className="w-4 h-4 text-primary" />
            </div>
            <p className={`text-2xl font-bold ${nivelConfianca >= 75 ? "text-green-600" : nivelConfianca >= 50 ? "text-amber-600" : "text-red-600"}`}>{nivelConfianca}%</p>
            <div className="w-full bg-muted rounded-full h-1.5 mt-2">
              <div className="h-1.5 rounded-full transition-all" style={{ width: `${nivelConfianca}%`, backgroundColor: nivelConfianca >= 75 ? "hsl(142,71%,45%)" : nivelConfianca >= 50 ? "hsl(45,93%,47%)" : "hsl(0,84%,60%)" }} />
            </div>
          </div>
          <div className="bg-card rounded-xl border border-border p-4">
            <div className="flex items-center justify-between mb-1">
              <p className="text-xs text-muted-foreground">Principal Alavanca</p>
              <Trophy className="w-4 h-4 text-amber-500" />
            </div>
            <p className="text-sm font-bold text-foreground leading-tight">{topDriver.nome}</p>
            <p className="text-xs text-muted-foreground mt-1">{formatCurrencyV3(topDriver.valorMonetizado)} · {topDriver.participacao}%</p>
          </div>
          <div className="bg-card rounded-xl border border-border p-4">
            <div className="flex items-center justify-between mb-1">
              <p className="text-xs text-muted-foreground">Melhor Operação</p>
              <TrendingUp className="w-4 h-4 text-green-500" />
            </div>
            <p className="text-lg font-bold text-foreground">{kpis.melhorOperacao}</p>
            <p className="text-xs text-muted-foreground mt-1">Score 88 · Tendência de alta</p>
          </div>
          <div className="bg-card rounded-xl border border-border p-4">
            <div className="flex items-center justify-between mb-1">
              <p className="text-xs text-muted-foreground">Maior Risco</p>
              <ShieldAlert className="w-4 h-4 text-red-500" />
            </div>
            <p className="text-lg font-bold text-foreground">{kpis.maiorRisco}</p>
            <p className="text-xs text-muted-foreground mt-1">Score 64 · Absenteísmo {absenteismoV3.porEstrutura.find(e => e.nome === "Regional BA")?.taxa}%</p>
          </div>
        </div>

        {/* Evolução empilhada + Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
          {/* Gráfico empilhado - 3 colunas */}
          <div className="lg:col-span-3 bg-card rounded-xl border border-border p-5">
            <div className="mb-4">
              <h3 className="font-semibold text-foreground text-sm">Evolução da Economia por Competência</h3>
              <p className="text-xs text-muted-foreground">Composição por driver em cada competência do período</p>
            </div>
            {/* Legend */}
            <div className="flex flex-wrap gap-x-4 gap-y-1.5 mb-4">
              {driverKeys.map(id => (
                <div key={id} className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: driverColors[id] }} />
                  <span className="text-[10px] text-muted-foreground">{getDriverName(id)}</span>
                </div>
              ))}
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={evolucaoEmpilhada} barCategoryGap="15%">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                <XAxis dataKey="mes" fontSize={11} tick={{ fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                <YAxis hide />
                <RechartsTooltip
                  content={({ active, payload, label }) => {
                    if (!active || !payload?.length) return null;
                    const items = payload.filter(p => p.dataKey !== "total" && (p.value as number) > 0).reverse();
                    const total = items.reduce((s, p) => s + ((p.value as number) ?? 0), 0);
                    return (
                      <div className="bg-card border border-border rounded-xl shadow-xl p-3.5 text-xs min-w-[200px]">
                        <p className="font-bold text-foreground mb-2">{label}</p>
                        <div className="space-y-1.5">
                          {items.map((item, idx) => {
                            const val = (item.value as number) ?? 0;
                            const pct = total > 0 ? ((val / total) * 100).toFixed(1) : "0";
                            const driver = driversV3.find(d => d.id === item.dataKey);
                            return (
                              <div key={idx} className="flex items-center justify-between gap-3">
                                <div className="flex items-center gap-1.5">
                                  <div className="w-2 h-2 rounded-sm" style={{ backgroundColor: item.color as string }} />
                                  <span className="text-muted-foreground">{getDriverName(item.dataKey as string)}</span>
                                </div>
                                <div className="text-right">
                                  <span className="font-semibold text-foreground">{formatCurrencyV3(val)}</span>
                                  <span className="text-muted-foreground ml-1">({pct}%)</span>
                                </div>
                              </div>
                            );
                          })}
                          <div className="flex justify-between border-t border-border pt-1.5 mt-1 font-bold">
                            <span className="text-foreground">Total</span>
                            <span className="text-foreground">{formatCurrencyV3(total)}</span>
                          </div>
                        </div>
                      </div>
                    );
                  }}
                />
                <ReferenceLine
                  y={mediaPeriodo}
                  stroke="hsl(var(--muted-foreground))"
                  strokeWidth={1.5}
                  strokeDasharray="6 3"
                  label={{ value: `Média: ${formatCurrencyV3(mediaPeriodo)}`, position: "right", fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
                />
                {driverKeys.map(id => (
                  <Bar
                    key={id}
                    dataKey={id}
                    stackId="economia"
                    fill={driverColors[id]}
                    radius={id === "benef" ? [3, 3, 0, 0] : [0, 0, 0, 0]}
                  />
                ))}
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Insights - 2 colunas */}
          <div className="lg:col-span-2 bg-card rounded-xl border border-border p-5 flex flex-col">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-1.5 rounded-lg bg-primary/10">
                <Lightbulb className="w-4 h-4 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground text-sm">Insights da Operação</h3>
                <p className="text-[10px] text-muted-foreground">Análise executiva do período</p>
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
                    <p className="text-xs text-foreground/80 leading-relaxed">{insight}</p>
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
