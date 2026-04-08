import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight, Filter, Eraser, TrendingUp, Shield, Zap, AlertTriangle, Info } from "lucide-react";
import { FilterPanel } from "@/components/layout/FilterPanel";
import { resumo, evolucaoVetores, evolucaoEconomia } from "@/lib/analytics-mock-data";
import {
  ResponsiveContainer, ComposedChart, BarChart, Bar, Line, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend, ReferenceLine, LabelList,
} from "recharts";
import { Tooltip as UITooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

// ── Gauge Component ─────────────────────────────────────────────
function ScoreGauge({ score }: { score: number }) {
  const radius = 80;
  const stroke = 14;
  const cx = 100;
  const cy = 95;
  const circumference = Math.PI * radius;
  const progress = (score / 100) * circumference;

  const color = score >= 85 ? "hsl(var(--success))" : score >= 70 ? "#FF5722" : "hsl(var(--destructive))";

  return (
    <svg width="200" height="120" viewBox="0 0 200 120">
      <path
        d={`M ${cx - radius} ${cy} A ${radius} ${radius} 0 0 1 ${cx + radius} ${cy}`}
        fill="none" stroke="#e5e7eb" strokeWidth={stroke} strokeLinecap="round"
      />
      <path
        d={`M ${cx - radius} ${cy} A ${radius} ${radius} 0 0 1 ${cx + radius} ${cy}`}
        fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round"
        strokeDasharray={`${progress} ${circumference}`}
      />
    </svg>
  );
}

// ── KPI Card Wrapper ────────────────────────────────────────────
function KpiCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-card border border-border/50 rounded-xl p-5">
      {children}
    </div>
  );
}

// ── InfoTip ─────────────────────────────────────────────────────
function InfoTip({ text }: { text: string }) {
  return (
    <UITooltip>
      <TooltipTrigger asChild>
        <Info size={14} className="text-muted-foreground cursor-help" />
      </TooltipTrigger>
      <TooltipContent className="max-w-[240px] text-xs">{text}</TooltipContent>
    </UITooltip>
  );
}

// ── Main Page ───────────────────────────────────────────────────
export default function AnalyticsResumoExecutivo() {
  const navigate = useNavigate();
  const [filterOpen, setFilterOpen] = useState(false);

  const scoreColor = resumo.scoreOperacional >= 85 ? "text-green-600" : resumo.scoreOperacional >= 70 ? "text-[#FF5722]" : "text-red-600";

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      {/* Breadcrumb */}
      <header className="border-b border-border px-6 py-3 bg-white">
        <div className="flex items-center gap-2 text-sm">
          <span className="text-[#FF5722] font-medium cursor-pointer hover:underline" onClick={() => navigate("/analytics")}>Home</span>
          <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
          <span className="text-[#FF5722] font-medium cursor-pointer hover:underline" onClick={() => navigate("/analytics")}>Analytics</span>
          <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
          <span className="text-foreground font-semibold">Resumo Executivo</span>
        </div>
      </header>

      {/* Filter bar */}
      <div className="bg-white px-6 py-3 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-2 text-sm">
            <Filter className="w-4 h-4 text-[#FF5722]" />
            <span className="font-semibold text-foreground">Filtros Aplicados:</span>
          </div>
          <span className="bg-orange-50 text-[#FF5722] border border-orange-200 rounded-full px-3 py-1 text-[11px] font-medium">Período: {resumo.periodo}</span>
          <span className="bg-orange-50 text-[#FF5722] border border-orange-200 rounded-full px-3 py-1 text-[11px] font-medium">Cliente: {resumo.cliente}</span>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <button onClick={() => setFilterOpen(true)} className="border border-border text-muted-foreground px-4 py-2 rounded text-sm font-medium flex items-center gap-2 hover:bg-gray-50">
            <Filter className="w-4 h-4" /> Filtros
          </button>
          <button className="flex items-center gap-1.5 text-sm text-[#FF5722] hover:underline">
            <Eraser className="w-4 h-4" /> Limpar Filtros
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-6 flex-1">
        <div className="flex gap-6">
          {/* Main content */}
          <div className="flex-1 space-y-6">
            {/* Hero — grid 2 cols */}
            <div className="grid grid-cols-2 gap-6">
              {/* Economia Gerada */}
              <div className="bg-card border border-border/50 rounded-xl p-8">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp size={18} className="text-[#FF5722]" />
                  <span className="text-sm font-semibold text-muted-foreground tracking-wide uppercase">Economia Gerada</span>
                </div>
                <p className="text-[3rem] font-bold leading-none">{resumo.economiaGerada}</p>
                <p className="text-sm text-muted-foreground mt-3">Resultado consolidado da evolução operacional no período analisado</p>
                <div className="flex gap-2 mt-5">
                  <span className="bg-orange-50 text-[#FF5722] border border-orange-200 text-[11px] font-medium px-3 py-1 rounded-full">{resumo.periodo}</span>
                  <span className="bg-gray-100 text-gray-600 text-[11px] font-medium px-3 py-1 rounded-full">{resumo.cliente}</span>
                  <span className="bg-gray-100 text-gray-600 text-[11px] font-medium px-3 py-1 rounded-full">{resumo.colaboradores.toLocaleString()} colaboradores</span>
                </div>
              </div>

              {/* Score Operacional */}
              <div className="bg-card border border-border/50 rounded-xl p-8 text-center">
                <div className="flex items-center justify-center gap-2 mb-6">
                  <span className="text-sm font-semibold text-muted-foreground tracking-wide uppercase">Score Operacional</span>
                  <InfoTip text="Índice de 0 a 100 que combina qualidade do ponto, absenteísmo, horas extras, movimentações e coberturas. Pesos configuráveis." />
                </div>
                <ScoreGauge score={resumo.scoreOperacional} />
                <p className={`text-[2.8rem] font-bold leading-none ${scoreColor} -mt-2`}>{resumo.scoreOperacional}</p>
                <p className={`text-lg font-semibold ${scoreColor} mt-2`}>{resumo.scoreFaixa}</p>
                <p className="text-sm text-muted-foreground mt-2">Saúde geral da operação no período</p>
              </div>
            </div>

            {/* 4 KPI Cards */}
            <div className="grid grid-cols-4 gap-4">
              <KpiCard>
                <div className="flex justify-between items-start">
                  <Shield size={20} className="text-green-500" />
                  <InfoTip text="% dos dados baseados em eventos operacionais reais da plataforma Nexti" />
                </div>
                <p className="text-[0.85rem] font-medium text-muted-foreground mt-3">Nível de Confiança</p>
                <p className="text-[1.8rem] font-semibold leading-none mt-1 text-green-600">{resumo.nivelConfianca}%</p>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: `${resumo.nivelConfianca}%` }} />
                </div>
              </KpiCard>

              <KpiCard>
                <div className="flex justify-between items-start">
                  <Zap size={20} className="text-[#FF5722]" />
                  <InfoTip text="Driver operacional com maior impacto na economia gerada do período" />
                </div>
                <p className="text-[0.85rem] font-medium text-muted-foreground mt-3">Principal Alavanca</p>
                <p className="text-[1.8rem] font-semibold leading-none mt-1">{resumo.principalAlavanca.nome}</p>
                <p className="text-xs text-muted-foreground mt-2">{resumo.principalAlavanca.valor} · {resumo.principalAlavanca.participacao}</p>
              </KpiCard>

              <KpiCard>
                <div className="flex justify-between items-start">
                  <TrendingUp size={20} className="text-green-500" />
                  <InfoTip text="Regional ou área com maior score operacional no período" />
                </div>
                <p className="text-[0.85rem] font-medium text-muted-foreground mt-3">Melhor Operação</p>
                <p className="text-[1.8rem] font-semibold leading-none mt-1">{resumo.melhorOperacao.nome}</p>
                <p className="text-xs text-muted-foreground mt-2">Score {resumo.melhorOperacao.score} · Tendência de alta</p>
              </KpiCard>

              <KpiCard>
                <div className="flex justify-between items-start">
                  <AlertTriangle size={20} className="text-red-500" />
                  <InfoTip text="Regional ou área com menor score operacional e maior concentração de risco" />
                </div>
                <p className="text-[0.85rem] font-medium text-muted-foreground mt-3">Maior Risco</p>
                <p className="text-[1.8rem] font-semibold leading-none mt-1 text-red-600">{resumo.maiorRisco.nome}</p>
                <p className="text-xs text-muted-foreground mt-2">Score {resumo.maiorRisco.score} · {resumo.maiorRisco.indicador}</p>
              </KpiCard>
            </div>

            {/* Chart: Evolução Operacional */}
            <div className="bg-card border border-border/50 rounded-xl p-6">
              <h3 className="text-base font-semibold">Evolução Operacional dos Principais Vetores</h3>
              <p className="text-sm text-muted-foreground mb-4">Disciplina, absenteísmo e movimentações por competência</p>
              <ResponsiveContainer width="100%" height={280}>
                <ComposedChart data={evolucaoVetores}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                  <XAxis dataKey="competencia" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis yAxisId="left" domain={[75, 95]} fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v: number) => `${v}%`} />
                  <YAxis yAxisId="right" orientation="right" domain={[0, 10]} fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v: number) => `${v}%`} />
                  <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid #e5e7eb', fontSize: 13 }} />
                  <Legend verticalAlign="top" height={36} />
                  <Line yAxisId="left" type="monotone" dataKey="qualidadePonto" name="Qualidade do Ponto (%)" stroke="hsl(220, 80%, 50%)" strokeWidth={2} dot={{ r: 4 }} />
                  <Line yAxisId="right" type="monotone" dataKey="absenteismo" name="Absenteísmo (%)" stroke="hsl(355, 78%, 56%)" strokeWidth={2} strokeDasharray="5 5" dot={{ r: 4 }} />
                  <Line yAxisId="right" type="monotone" dataKey="pressaoOperacional" name="Pressão Operacional" stroke="hsl(44, 98%, 54%)" strokeWidth={2} strokeDasharray="2 2" dot={{ r: 4 }} />
                  <ReferenceLine yAxisId="left" y={85.7} stroke="#9ca3af" strokeDasharray="5 5" label={{ value: "Média", position: "right", fontSize: 11, fill: "#9ca3af" }} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>

            {/* Chart: Economia por Competência */}
            <div className="bg-card border border-border/50 rounded-xl p-6">
              <h3 className="text-base font-semibold">Economia Gerada por Competência</h3>
              <p className="text-sm text-muted-foreground mb-4">Valor capturado mês a mês ao longo do período</p>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={evolucaoEconomia}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                  <XAxis dataKey="competencia" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v: number) => `R$ ${(v / 1000).toFixed(0)}K`} />
                  <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid #e5e7eb', fontSize: 13 }} formatter={(v: number) => [`R$ ${(v / 1000).toFixed(0)}K`, 'Economia']} />
                  <Bar dataKey="valor" fill="#FF5722" radius={[4, 4, 0, 0]}>
                    <LabelList dataKey="valor" position="top" fontSize={10} formatter={(v: number) => `R$ ${(v / 1000).toFixed(0)}K`} />
                  </Bar>
                  <ReferenceLine y={resumo.economiaMedia} stroke="#9ca3af" strokeDasharray="5 5" label={{ value: "Média", position: "right", fontSize: 11, fill: "#9ca3af" }} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Feedback */}
            <div className="flex items-center justify-center gap-4 py-6 mt-4 border-t border-border">
              <span className="text-sm text-muted-foreground">Esta visualização foi útil?</span>
              <button className="hover:scale-125 transition-transform text-2xl" title="Muito útil">😊</button>
              <button className="hover:scale-125 transition-transform text-2xl" title="Razoável">😐</button>
              <button className="hover:scale-125 transition-transform text-2xl" title="Pouco útil">😕</button>
            </div>
          </div>

          {/* Sidebar: Insights */}
          <div className="w-[260px] shrink-0">
            <div className="bg-[#FFF8E1] rounded-xl p-5 sticky top-6">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-lg">💡</span>
                <h3 className="font-semibold text-sm">Insights da Operação</h3>
              </div>
              <p className="text-xs text-muted-foreground mb-4">Análise executiva do período</p>
              <div className="space-y-2">
                {resumo.insights.map((insight, i) => (
                  <div key={i} className="flex gap-3 p-3 rounded-lg bg-white/70">
                    <span className="shrink-0 mt-0.5 text-base">{insight.icone}</span>
                    <p className="text-[13px] leading-relaxed text-gray-700">{insight.texto}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <FilterPanel open={filterOpen} onClose={() => setFilterOpen(false)} />
    </div>
  );
}
