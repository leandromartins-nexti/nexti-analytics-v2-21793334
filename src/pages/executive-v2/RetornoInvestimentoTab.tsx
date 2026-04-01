import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, LineChart, Line } from "recharts";
import {
  getEconomiaBruta, getEconomiaLiquida, getROITotal, getPaybackMeses,
  getConfiancaBreakdown, getDriversMonetarios, ownership, trendROI,
  formatCurrency, drivers,
} from "@/lib/roiData";
import { Award, TrendingUp, Clock, DollarSign } from "lucide-react";

export default function RetornoInvestimentoTab() {
  const eco = getEconomiaBruta();
  const liq = getEconomiaLiquida();
  const roi = getROITotal();
  const payback = getPaybackMeses();
  const conf = getConfiancaBreakdown();
  const monetarios = getDriversMonetarios();

  const roiComprovado = ownership.ownershipTotal > 0 ? conf["comprovadoR$"] / ownership.ownershipTotal : 0;
  const coberturaInvestimento = eco > 0 ? ((eco / ownership.ownershipTotal) * 100) : 0;

  // Contribuição por módulo
  const moduloMap = new Map<string, number>();
  monetarios.forEach(d => {
    const cur = moduloMap.get(d.moduloNexti) || 0;
    moduloMap.set(d.moduloNexti, cur + d.ganhoBruto);
  });
  const moduloData = [...moduloMap.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([name, value]) => ({ name: name.length > 18 ? name.slice(0, 16) + "…" : name, value }));

  const COLORS = ["#22c55e", "#16a34a", "#15803d", "#166534", "#14532d", "#0d9488"];

  // Payback chart
  const ownershipMensal = ownership.ownershipTotal / 12;
  const paybackData = trendROI.map((t, i) => ({
    mes: t.mes,
    economiaAcumulada: t.economiaAcumulada,
    custoAcumulado: (i + 1) * ownershipMensal,
  }));

  // ROI mensal evolution
  const roiEvolution = trendROI.map(t => ({
    mes: t.mes,
    roiTotal: t.roiTotal,
    roiComprovado: +((t.valorComprovado / ownershipMensal)).toFixed(1),
  }));

  // Valor vs Investimento
  const valorVsInvestimento = [
    { name: "Valor Capturado", value: eco },
    { name: "Investimento Nexti", value: ownership.ownershipTotal },
  ];

  return (
    <div className="space-y-6">
      {/* Contextual intro */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <p className="text-xs text-gray-600 leading-relaxed">
          Este painel conecta o <strong>valor operacional capturado</strong> ao investimento realizado na plataforma Nexti.
          O retorno apresentado aqui é uma <strong>consequência direta</strong> da evolução operacional, da redução de custos
          e da maturidade de comprovação demonstradas nas abas anteriores.
        </p>
      </div>

      {/* Hero — ROI */}
      <div className="bg-gradient-to-r from-[#FF5722] to-[#FF7043] rounded-xl p-6 text-white">
        <div className="flex items-center gap-2 mb-1">
          <Award className="w-5 h-5 opacity-90" />
          <p className="text-sm font-medium opacity-90 uppercase tracking-wide">Retorno do Investimento</p>
        </div>
        <p className="text-xs opacity-75 mb-4">Como o valor gerado na operação se relaciona com o investimento na Nexti</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <p className="text-xs opacity-80">ROI Total</p>
            <p className="text-4xl font-bold mt-1">{roi.toFixed(1)}x</p>
          </div>
          <div>
            <p className="text-xs opacity-80">ROI Comprovado</p>
            <p className="text-4xl font-bold mt-1">{roiComprovado.toFixed(1)}x</p>
          </div>
          <div>
            <p className="text-xs opacity-80">Payback</p>
            <p className="text-4xl font-bold mt-1">{payback.toFixed(1)}<span className="text-lg ml-1">meses</span></p>
          </div>
          <div>
            <p className="text-xs opacity-80">Cobertura do Investimento</p>
            <p className="text-4xl font-bold mt-1">{coberturaInvestimento.toFixed(0)}%</p>
          </div>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "Ownership Anual Nexti", value: formatCurrency(ownership.ownershipTotal), icon: DollarSign, color: "text-gray-700" },
          { label: "Ownership Mensal", value: formatCurrency(ownershipMensal), icon: Clock, color: "text-gray-700" },
          { label: "Economia Líquida Total", value: formatCurrency(liq), icon: TrendingUp, color: "text-green-600" },
          { label: "Economia Líquida Comprovada", value: formatCurrency(conf["comprovadoR$"] - ownership.ownershipTotal > 0 ? conf["comprovadoR$"] - ownership.ownershipTotal : 0), icon: TrendingUp, color: "text-green-600" },
        ].map((kpi, i) => (
          <div key={i} className="bg-white rounded-lg border border-gray-200 p-4 text-center">
            <p className="text-[10px] text-gray-500 font-medium uppercase">{kpi.label}</p>
            <p className={`text-lg font-bold mt-1 ${kpi.color}`}>{kpi.value}</p>
          </div>
        ))}
      </div>

      {/* Charts row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Valor Capturado vs Investimento */}
        <div className="bg-white rounded-lg border border-gray-200 p-5">
          <h3 className="text-sm font-semibold text-gray-800 mb-3">Valor Capturado vs Investimento</h3>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={valorVsInvestimento} margin={{ top: 10, right: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                <YAxis tickFormatter={(v) => `R$ ${(v / 1000000).toFixed(1)}M`} tick={{ fontSize: 10 }} />
                <Tooltip formatter={(v: number) => formatCurrency(v)} />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  <Cell fill="#22c55e" />
                  <Cell fill="#FF5722" />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Curva de Payback */}
        <div className="bg-white rounded-lg border border-gray-200 p-5">
          <h3 className="text-sm font-semibold text-gray-800 mb-3">Curva de Payback</h3>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={paybackData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="mes" tick={{ fontSize: 10 }} />
                <YAxis tickFormatter={(v) => `R$ ${(v / 1000000).toFixed(1)}M`} tick={{ fontSize: 10 }} />
                <Tooltip formatter={(v: number) => formatCurrency(v)} />
                <Line type="monotone" dataKey="economiaAcumulada" stroke="#22c55e" strokeWidth={2} name="Economia Acumulada" dot={false} />
                <Line type="monotone" dataKey="custoAcumulado" stroke="#FF5722" strokeWidth={2} strokeDasharray="5 5" name="Custo Acumulado Nexti" dot={false} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Charts row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* ROI Total vs ROI Comprovado */}
        <div className="bg-white rounded-lg border border-gray-200 p-5">
          <h3 className="text-sm font-semibold text-gray-800 mb-3">Evolução Mensal do Retorno</h3>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={roiEvolution}>
                <defs>
                  <linearGradient id="gradRoiRet" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FF5722" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#FF5722" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="mes" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip />
                <Area type="monotone" dataKey="roiTotal" stroke="#FF5722" fill="url(#gradRoiRet)" name="ROI Total (x)" />
                <Area type="monotone" dataKey="roiComprovado" stroke="#22c55e" fill="none" strokeDasharray="5 5" name="ROI Comprovado (x)" />
                <Legend wrapperStyle={{ fontSize: 11 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Contribuição por Módulo */}
        <div className="bg-white rounded-lg border border-gray-200 p-5">
          <h3 className="text-sm font-semibold text-gray-800 mb-3">Contribuição por Módulo para o Retorno</h3>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={moduloData} cx="50%" cy="50%" innerRadius={55} outerRadius={90} dataKey="value" label={({ name, value }) => `${(value / 1000000).toFixed(1)}M`} labelLine={false}>
                  {moduloData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Legend verticalAlign="bottom" iconType="circle" wrapperStyle={{ fontSize: 10 }} />
                <Tooltip formatter={(v: number) => formatCurrency(v)} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Closing narrative */}
      <div className="bg-white rounded-lg border border-gray-200 p-5">
        <h3 className="text-sm font-semibold text-gray-800 mb-3">Síntese do Retorno</h3>
        <div className="space-y-2">
          {[
            { text: `A operação gerou ${formatCurrency(eco)} em economia bruta no período, resultado da evolução operacional e captura de valor em ${monetarios.length} drivers ativos.` },
            { text: `Desse valor, ${formatCurrency(conf["comprovadoR$"])} (${conf.comprovado.toFixed(0)}%) é sustentado por dados reais, conferindo alta defensabilidade à análise.` },
            { text: `O investimento de ${formatCurrency(ownership.ownershipTotal)} na plataforma Nexti foi recuperado em ${payback.toFixed(1)} meses, gerando um retorno de ${roi.toFixed(1)}x sobre o período.` },
            { text: `O ROI comprovado (excluindo valores híbridos e referenciais) é de ${roiComprovado.toFixed(1)}x, demonstrando que o retorno se sustenta mesmo em cenário conservador.` },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-2 p-2.5 rounded-lg bg-gray-50 border border-gray-100">
              <div className="w-2 h-2 rounded-full mt-1 shrink-0 bg-[#FF5722]" />
              <p className="text-xs text-gray-700 leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
