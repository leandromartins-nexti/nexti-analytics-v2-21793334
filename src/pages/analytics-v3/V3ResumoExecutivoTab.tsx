import { TrendingUp, TrendingDown, ShieldAlert, CheckCircle2, AlertTriangle, Lightbulb, ArrowUpRight, ArrowDownRight, Minus } from "lucide-react";
import { getV3KPIs, formatCurrencyV3, generateV3Insights, absenteismoV3, coberturaRiscoV3, driversV3 } from "@/lib/analyticsV3Data";

export default function V3ResumoExecutivoTab() {
  const kpis = getV3KPIs();
  const insights = generateV3Insights();
  const topDriver = driversV3.filter(d => d.categoria === "monetario" && d.ativo).sort((a, b) => b.valorMonetizado - a.valorMonetizado)[0];

  return (
    <div className="space-y-6">
      {/* Headline */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl p-6 text-white">
        <p className="text-sm text-gray-300 mb-1">Valor Capturado na Operação</p>
        <h1 className="text-4xl font-bold">{formatCurrencyV3(kpis.valorCapturado)}</h1>
        <p className="text-sm text-gray-400 mt-2">abr/2025 – mar/2026 · Orsegups · 8.000 colaboradores</p>
      </div>

      {/* KPIs Grid */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <KPICard label="Custo Evitado" value={formatCurrencyV3(kpis.custoEvitado)} color="text-blue-600" />
        <KPICard label="Perda Evitada" value={formatCurrencyV3(kpis.perdaEvitada)} color="text-purple-600" />
        <KPICard label="Valor Comprovado" value={formatCurrencyV3(kpis.comprovado)} color="text-green-600" sub={`${kpis.pctComprovado}% do total`} />
        <KPICard label="Valor Híbrido" value={formatCurrencyV3(kpis.hibrido)} color="text-yellow-600" />
        <KPICard label="Valor Referencial" value={formatCurrencyV3(kpis.referencial)} color="text-purple-500" />
      </div>

      {/* Second row */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <KPICard label="% Comprovado" value={`${kpis.pctComprovado}%`} color="text-green-600" icon={<CheckCircle2 className="w-4 h-4 text-green-500" />} />
        <KPICard label="Melhor Operação" value={kpis.melhorOperacao} color="text-gray-800" icon={<TrendingUp className="w-4 h-4 text-green-500" />} />
        <KPICard label="Maior Risco" value={kpis.maiorRisco} color="text-gray-800" icon={<ShieldAlert className="w-4 h-4 text-red-500" />} />
        <KPICard label="Drivers Ativos" value={String(kpis.driversAtivos)} color="text-gray-800" />
        <KPICard label="Score Cobertura" value={`${coberturaRiscoV3.scoreEficiencia}`} color={coberturaRiscoV3.scoreEficiencia >= 70 ? "text-yellow-600" : "text-red-600"} icon={<AlertTriangle className="w-4 h-4 text-yellow-500" />} />
      </div>

      {/* Destaques */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-5 h-5 text-green-600" />
            <h3 className="font-semibold text-gray-800">Principal Driver</h3>
          </div>
          <p className="text-lg font-bold text-gray-900">{topDriver.nome}</p>
          <p className="text-sm text-gray-500 mt-1">
            {formatCurrencyV3(topDriver.valorMonetizado)} · {topDriver.participacao}% do valor · Confiança: {topDriver.confianca}
          </p>
          <p className="text-xs text-gray-400 mt-2">
            Delta operacional: {topDriver.deltaOperacional > 0 ? "+" : ""}{topDriver.deltaOperacional}% vs competência anterior
          </p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center gap-2 mb-3">
            <ShieldAlert className="w-5 h-5 text-red-500" />
            <h3 className="font-semibold text-gray-800">Principal Preocupação</h3>
          </div>
          <p className="text-lg font-bold text-gray-900">Regional BA</p>
          <p className="text-sm text-gray-500 mt-1">
            Score de cobertura: 58 · Absenteísmo: {absenteismoV3.porEstrutura.find(e => e.nome === "Regional BA")?.taxa}% · Tendência de piora
          </p>
          <p className="text-xs text-gray-400 mt-2">
            Maior taxa de absenteísmo e menor score de eficiência operacional
          </p>
        </div>
      </div>

      {/* Narrativa Executiva */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <div className="flex items-center gap-2 mb-4">
          <Lightbulb className="w-5 h-5 text-[#FF5722]" />
          <h3 className="font-semibold text-gray-800">Insights da Operação</h3>
        </div>
        <div className="space-y-3">
          {insights.map((insight, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-[#FF5722] mt-2 shrink-0" />
              <p className="text-sm text-gray-600">{insight}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function KPICard({ label, value, color, sub, icon }: { label: string; value: string; color: string; sub?: string; icon?: React.ReactNode }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4">
      <div className="flex items-center justify-between mb-1">
        <p className="text-xs text-gray-500">{label}</p>
        {icon}
      </div>
      <p className={`text-xl font-bold ${color}`}>{value}</p>
      {sub && <p className="text-xs text-gray-400 mt-1">{sub}</p>}
    </div>
  );
}
