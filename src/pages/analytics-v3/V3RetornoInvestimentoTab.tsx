import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend, BarChart, Bar } from "recharts";
import { getV3KPIs, formatCurrencyV3, ownershipV3, getEvolucaoConsolidada, mesesPeriodo } from "@/lib/analyticsV3Data";

export default function V3RetornoInvestimentoTab() {
  const kpis = getV3KPIs();
  const evolucao = getEvolucaoConsolidada();

  const roiTotal = kpis.valorCapturado / ownershipV3.custoAnual;
  const roiComprovado = kpis.comprovado / ownershipV3.custoAnual;

  // Payback
  const paybackData = evolucao.map((e, i) => {
    const custoAcumulado = ownershipV3.custoMensal * (i + 1);
    const valorAcumulado = evolucao.slice(0, i + 1).reduce((s, x) => s + x.valorCapturado, 0);
    return { mes: e.mes, custoAcumulado, valorAcumulado };
  });
  const paybackMes = paybackData.findIndex(d => d.valorAcumulado >= d.custoAcumulado);

  // ROI mensal
  const roiMensal = evolucao.map((e) => ({
    mes: e.mes,
    retorno: Math.round((e.valorCapturado / ownershipV3.custoMensal) * 100) / 100,
  }));

  // Cobertura
  const cobertura = Math.round((kpis.valorCapturado / ownershipV3.custoAnual) * 100);

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-bold text-gray-800">Retorno do Investimento</h2>
      <p className="text-sm text-gray-500">Esta aba é consequência da evolução da operação — não o início da conversa.</p>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KPI label="Ownership Mensal" value={formatCurrencyV3(ownershipV3.custoMensal)} />
        <KPI label="Ownership Anual" value={formatCurrencyV3(ownershipV3.custoAnual)} />
        <KPI label="Valor Capturado Acum." value={formatCurrencyV3(kpis.valorCapturado)} color="text-green-600" />
        <KPI label="Valor Comprovado Acum." value={formatCurrencyV3(kpis.comprovado)} color="text-green-600" />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl border border-green-200 p-4">
          <p className="text-xs text-green-700">ROI Total</p>
          <p className="text-3xl font-bold text-green-700">{roiTotal.toFixed(1)}x</p>
        </div>
        <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl border border-green-200 p-4">
          <p className="text-xs text-green-700">ROI Comprovado</p>
          <p className="text-3xl font-bold text-green-700">{roiComprovado.toFixed(1)}x</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-xs text-gray-500">Payback</p>
          <p className="text-3xl font-bold text-gray-800">{paybackMes >= 0 ? `${paybackMes + 1} meses` : "> 12 meses"}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-xs text-gray-500">Cobertura do Investimento</p>
          <p className="text-3xl font-bold text-gray-800">{cobertura}%</p>
        </div>
      </div>

      {/* Valor vs Investimento */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h3 className="font-semibold text-gray-700 mb-4">Valor Capturado vs Investimento Acumulado</h3>
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={paybackData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="mes" fontSize={11} />
            <YAxis tickFormatter={v => formatCurrencyV3(v)} fontSize={11} />
            <Tooltip formatter={(v: number) => formatCurrencyV3(v)} />
            <Legend />
            <Line type="monotone" dataKey="custoAcumulado" stroke="#ef4444" strokeWidth={2} strokeDasharray="5 5" name="Investimento" />
            <Line type="monotone" dataKey="valorAcumulado" stroke="#16a34a" strokeWidth={2} name="Valor Capturado" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* ROI mensal */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h3 className="font-semibold text-gray-700 mb-4">Retorno Mensal (x ownership)</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={roiMensal}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="mes" fontSize={11} />
            <YAxis fontSize={11} tickFormatter={v => `${v}x`} />
            <Tooltip formatter={(v: number) => `${v}x`} />
            <Bar dataKey="retorno" fill="#FF5722" radius={[4, 4, 0, 0]} name="Retorno" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* ROI total vs comprovado */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h3 className="font-semibold text-gray-700 mb-4">ROI Total vs ROI Comprovado</h3>
        <div className="grid grid-cols-2 gap-6">
          <div className="text-center">
            <p className="text-sm text-gray-500 mb-2">ROI Total</p>
            <div className="relative w-32 h-32 mx-auto">
              <svg viewBox="0 0 120 120" className="w-full h-full">
                <circle cx="60" cy="60" r="50" fill="none" stroke="#e5e7eb" strokeWidth="10" />
                <circle cx="60" cy="60" r="50" fill="none" stroke="#16a34a" strokeWidth="10"
                  strokeDasharray={`${Math.min(roiTotal / 5 * 314, 314)} 314`}
                  strokeDashoffset="0" transform="rotate(-90 60 60)" strokeLinecap="round" />
                <text x="60" y="60" textAnchor="middle" dominantBaseline="central" className="text-lg font-bold" fill="#16a34a">{roiTotal.toFixed(1)}x</text>
              </svg>
            </div>
            <p className="text-xs text-gray-400 mt-2">Inclui todos os tipos de valor</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-500 mb-2">ROI Comprovado</p>
            <div className="relative w-32 h-32 mx-auto">
              <svg viewBox="0 0 120 120" className="w-full h-full">
                <circle cx="60" cy="60" r="50" fill="none" stroke="#e5e7eb" strokeWidth="10" />
                <circle cx="60" cy="60" r="50" fill="none" stroke="#3b82f6" strokeWidth="10"
                  strokeDasharray={`${Math.min(roiComprovado / 5 * 314, 314)} 314`}
                  strokeDashoffset="0" transform="rotate(-90 60 60)" strokeLinecap="round" />
                <text x="60" y="60" textAnchor="middle" dominantBaseline="central" className="text-lg font-bold" fill="#3b82f6">{roiComprovado.toFixed(1)}x</text>
              </svg>
            </div>
            <p className="text-xs text-gray-400 mt-2">Apenas valor comprovado</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function KPI({ label, value, color = "text-gray-800" }: { label: string; value: string; color?: string }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4">
      <p className="text-xs text-gray-500 mb-1">{label}</p>
      <p className={`text-lg font-bold ${color}`}>{value}</p>
    </div>
  );
}
