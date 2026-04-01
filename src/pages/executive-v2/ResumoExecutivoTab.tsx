import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import {
  getEconomiaBruta, getEconomiaLiquida,
  getConfiancaBreakdown, getDriversMonetarios, trendROI,
  formatCurrency, generateROIInsights, drivers, operacoes,
  confidenceBadge,
} from "@/lib/roiData";
import { TrendingUp, DollarSign, ShieldCheck, BarChart3 } from "lucide-react";

const COLORS_CONF = ["#22c55e", "#eab308", "#9ca3af"];

export default function ResumoExecutivoTab() {
  const eco = getEconomiaBruta();
  const liq = getEconomiaLiquida();
  const conf = getConfiancaBreakdown();
  const monetarios = getDriversMonetarios();
  const driversAtivos = drivers.filter(d => d.status === "ativo").length;
  const insights = generateROIInsights();

  const confDonut = [
    { name: "Comprovado", value: conf.comprovado },
    { name: "Híbrido", value: conf.hibrido },
    { name: "Referencial", value: conf.referencial },
  ];

  const waterfallData = [...monetarios]
    .sort((a, b) => b.ganhoBruto - a.ganhoBruto)
    .slice(0, 8)
    .map(d => ({
      name: d.nome.length > 20 ? d.nome.slice(0, 18) + "…" : d.nome,
      value: d.ganhoBruto,
      confianca: d.confianca,
      fill: d.confianca === "comprovado" ? "#22c55e" : d.confianca === "hibrido" ? "#eab308" : "#9ca3af",
    }));

  const topOps = [...operacoes].sort((a, b) => b.economiaLiquida - a.economiaLiquida).slice(0, 5);

  // Evolução do % comprovado no período
  const pctInicio = trendROI[0]?.pctComprovado || 0;
  const pctFim = trendROI[trendROI.length - 1]?.pctComprovado || 0;

  return (
    <div className="space-y-6">
      {/* Hero Banner — Valor Capturado na Operação */}
      <div className="bg-gradient-to-r from-emerald-600 to-emerald-500 rounded-xl p-6 text-white">
        <div className="flex items-center gap-2 mb-1">
          <TrendingUp className="w-5 h-5 opacity-90" />
          <p className="text-sm font-medium opacity-90 uppercase tracking-wide">Valor Capturado na Operação</p>
        </div>
        <p className="text-xs opacity-75 mb-4">Período: abr/2025 – mar/2026 · Base: 8.000 colaboradores</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <p className="text-xs opacity-80">Economia Bruta</p>
            <p className="text-3xl font-bold mt-1">{formatCurrency(eco)}</p>
          </div>
          <div>
            <p className="text-xs opacity-80">Economia Líquida</p>
            <p className="text-3xl font-bold mt-1">{formatCurrency(liq)}</p>
          </div>
          <div>
            <p className="text-xs opacity-80">Valor Comprovado</p>
            <p className="text-3xl font-bold mt-1">{formatCurrency(conf["comprovadoR$"])}</p>
          </div>
          <div>
            <p className="text-xs opacity-80">% Comprovado</p>
            <p className="text-3xl font-bold mt-1">{conf.comprovado.toFixed(0)}%</p>
          </div>
        </div>
      </div>

      {/* KPIs secundários — foco operacional */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {[
          { label: "Economia Bruta", value: formatCurrency(eco), icon: DollarSign, color: "text-green-600" },
          { label: "Economia Líquida", value: formatCurrency(liq), icon: DollarSign, color: "text-green-600" },
          { label: "Valor Comprovado", value: formatCurrency(conf["comprovadoR$"]), icon: ShieldCheck, color: "text-green-600" },
          { label: "Valor Híbrido", value: formatCurrency(conf["hibridoR$"]), icon: ShieldCheck, color: "text-yellow-600" },
          { label: "Drivers Ativos", value: `${driversAtivos}`, icon: BarChart3, color: "text-gray-700" },
          { label: "Módulos com Valor", value: `${new Set(monetarios.map(d => d.moduloNexti)).size}`, icon: BarChart3, color: "text-gray-700" },
        ].map((kpi, i) => (
          <div key={i} className="bg-white rounded-lg border border-gray-200 p-3 text-center">
            <p className="text-[10px] text-gray-500 font-medium uppercase">{kpi.label}</p>
            <p className={`text-lg font-bold mt-1 ${kpi.color}`}>{kpi.value}</p>
          </div>
        ))}
      </div>

      {/* Qualidade e Maturidade da Comprovação */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white rounded-lg border-2 border-green-200 p-4">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
            <p className="text-[10px] text-gray-500 font-medium uppercase">Valor Comprovado</p>
          </div>
          <p className="text-xl font-bold text-green-600">{formatCurrency(conf["comprovadoR$"])}</p>
          <p className="text-xs text-gray-400 mt-0.5">{conf.comprovado.toFixed(0)}% do total — dado real + custo real</p>
        </div>
        <div className="bg-white rounded-lg border-2 border-yellow-200 p-4">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
            <p className="text-[10px] text-gray-500 font-medium uppercase">Valor Híbrido</p>
          </div>
          <p className="text-xl font-bold text-yellow-600">{formatCurrency(conf["hibridoR$"])}</p>
          <p className="text-xs text-gray-400 mt-0.5">{conf.hibrido.toFixed(0)}% do total — dado real + premissa ajustável</p>
        </div>
        <div className="bg-white rounded-lg border-2 border-gray-200 p-4">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-gray-400" />
            <p className="text-[10px] text-gray-500 font-medium uppercase">Valor Referencial</p>
          </div>
          <p className="text-xl font-bold text-gray-600">{formatCurrency(conf["referencialR$"])}</p>
          <p className="text-xs text-gray-400 mt-0.5">{conf.referencial.toFixed(0)}% do total — benchmark / Base Case</p>
        </div>
      </div>

      {/* Evolução da comprovação */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex items-center justify-between mb-1">
          <p className="text-xs font-semibold text-gray-700">Evolução da Comprovação no Período</p>
          <p className="text-xs text-gray-500">{pctInicio}% → {pctFim}%</p>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-3">
          <div className="bg-green-500 h-3 rounded-full transition-all" style={{ width: `${pctFim}%` }} />
        </div>
        <p className="text-[10px] text-gray-400 mt-1">A maturidade de comprovação cresceu +{pctFim - pctInicio}pp no período, fortalecendo a defensabilidade do valor capturado.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Waterfall – Top Drivers */}
        <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-gray-800">Composição do Valor por Driver</h3>
            <div className="flex items-center gap-3 text-[10px] text-gray-500">
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500" /> Comprovado</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-yellow-500" /> Híbrido</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-gray-400" /> Referencial</span>
            </div>
          </div>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={waterfallData} layout="vertical" margin={{ left: 10, right: 20 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" tickFormatter={(v) => `R$ ${(v / 1000).toFixed(0)}k`} tick={{ fontSize: 10 }} />
                <YAxis type="category" dataKey="name" width={130} tick={{ fontSize: 10 }} />
                <Tooltip formatter={(v: number) => formatCurrency(v)} />
                <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                  {waterfallData.map((d, i) => <Cell key={i} fill={d.fill} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Confidence Donut */}
        <div className="bg-white rounded-lg border border-gray-200 p-5">
          <h3 className="text-sm font-semibold text-gray-800 mb-3">Maturidade do Valor Capturado</h3>
          <div className="h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={confDonut} cx="50%" cy="50%" innerRadius={55} outerRadius={80} dataKey="value" label={({ value }) => `${value.toFixed(0)}%`} labelLine={false}>
                  {confDonut.map((_, i) => <Cell key={i} fill={COLORS_CONF[i]} />)}
                </Pie>
                <Legend verticalAlign="bottom" iconType="circle" wrapperStyle={{ fontSize: 11 }} />
                <Tooltip formatter={(v: number) => `${v.toFixed(1)}%`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <p className="text-[10px] text-gray-400 text-center mt-2">Quanto maior o % comprovado, mais defensável o valor</p>
        </div>
      </div>

      {/* Evolution charts — valor capturado */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-5">
          <h3 className="text-sm font-semibold text-gray-800 mb-3">Evolução Mensal da Economia</h3>
          <div className="h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendROI}>
                <defs>
                  <linearGradient id="gradEcoBruta" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="mes" tick={{ fontSize: 10 }} />
                <YAxis tickFormatter={(v) => `R$ ${(v / 1000).toFixed(0)}k`} tick={{ fontSize: 10 }} />
                <Tooltip formatter={(v: number) => formatCurrency(v)} />
                <Area type="monotone" dataKey="economiaBruta" stroke="#22c55e" fill="url(#gradEcoBruta)" name="Economia Bruta" />
                <Area type="monotone" dataKey="economiaLiquida" stroke="#16a34a" fill="none" strokeDasharray="5 5" name="Economia Líquida" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-5">
          <h3 className="text-sm font-semibold text-gray-800 mb-3">Valor Acumulado no Período</h3>
          <div className="h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendROI}>
                <defs>
                  <linearGradient id="gradAcum" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="mes" tick={{ fontSize: 10 }} />
                <YAxis tickFormatter={(v) => `R$ ${(v / 1000000).toFixed(1)}M`} tick={{ fontSize: 10 }} />
                <Tooltip formatter={(v: number) => formatCurrency(v)} />
                <Area type="monotone" dataKey="economiaAcumulada" stroke="#22c55e" fill="url(#gradAcum)" name="Acumulada" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Tables + Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Top Drivers */}
        <div className="bg-white rounded-lg border border-gray-200 p-5">
          <h3 className="text-sm font-semibold text-gray-800 mb-3">Top Drivers por Contribuição</h3>
          <div className="space-y-2 max-h-[280px] overflow-y-auto">
            {[...monetarios].sort((a, b) => b.ganhoBruto - a.ganhoBruto).slice(0, 6).map((d, i) => {
              const badge = confidenceBadge(d.confianca);
              return (
                <div key={d.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-gray-400 w-4">{i + 1}</span>
                    <div>
                      <p className="text-xs font-medium text-gray-700">{d.nome}</p>
                      <div className="flex items-center gap-1 mt-0.5">
                        <span className={`w-1.5 h-1.5 rounded-full ${badge.dot}`} />
                        <p className="text-[10px] text-gray-400">{badge.label}</p>
                      </div>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-green-600">{formatCurrency(d.ganhoBruto)}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Top Operações */}
        <div className="bg-white rounded-lg border border-gray-200 p-5">
          <h3 className="text-sm font-semibold text-gray-800 mb-3">Top Operações por Valor</h3>
          <div className="space-y-2 max-h-[280px] overflow-y-auto">
            {topOps.map((op, i) => (
              <div key={op.nome} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-gray-400 w-4">{i + 1}</span>
                  <div>
                    <p className="text-xs font-medium text-gray-700">{op.nome}</p>
                    <span className="text-[10px] text-gray-400">{op.pctComprovado}% comprovado</span>
                  </div>
                </div>
                <span className="text-xs font-bold text-green-600">{formatCurrency(op.economiaLiquida)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Insights */}
        <div className="bg-white rounded-lg border border-gray-200 p-5">
          <h3 className="text-sm font-semibold text-gray-800 mb-3">💡 Narrativa Executiva</h3>
          <div className="space-y-2">
            {insights.map((ins, i) => {
              const cfg = ins.severity === "critical"
                ? { dot: "bg-red-500", bg: "bg-red-50", border: "border-red-200" }
                : ins.severity === "warning"
                ? { dot: "bg-yellow-500", bg: "bg-yellow-50", border: "border-yellow-200" }
                : { dot: "bg-blue-500", bg: "bg-blue-50", border: "border-blue-200" };
              return (
                <div key={i} className={`flex items-start gap-2 p-2.5 rounded-lg border ${cfg.bg} ${cfg.border}`}>
                  <div className={`w-2 h-2 rounded-full mt-1 shrink-0 ${cfg.dot}`} />
                  <p className="text-xs text-gray-700 leading-relaxed">{ins.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
