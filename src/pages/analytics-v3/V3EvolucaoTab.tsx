import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, LineChart, Line } from "recharts";
import { getEvolucaoConsolidada, formatCurrencyV3, getV3KPIs, ownershipV3 } from "@/lib/analyticsV3Data";

export default function V3EvolucaoTab() {
  const evolucao = getEvolucaoConsolidada();
  const kpis = getV3KPIs();

  const paybackData = evolucao.map((e, i) => {
    const custoAcumulado = ownershipV3.custoMensal * (i + 1);
    const valorAcumulado = evolucao.slice(0, i + 1).reduce((s, x) => s + x.valorCapturado, 0);
    return { mes: e.mes, custoAcumulado, valorAcumulado };
  });

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-bold text-gray-800">Evolução da Operação</h2>
      <p className="text-sm text-gray-500">abr/2025 – mar/2026 · Evolução mensal dos principais indicadores</p>

      {/* Valor capturado por competência */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h3 className="font-semibold text-gray-700 mb-4">Valor Capturado por Competência</h3>
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={evolucao}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="mes" fontSize={11} />
            <YAxis tickFormatter={v => formatCurrencyV3(v)} fontSize={11} />
            <Tooltip formatter={(v: number) => formatCurrencyV3(v)} />
            <Area type="monotone" dataKey="custoEvitado" stackId="1" fill="#3b82f6" fillOpacity={0.3} stroke="#3b82f6" name="Custo Evitado" />
            <Area type="monotone" dataKey="perdaEvitada" stackId="1" fill="#8b5cf6" fillOpacity={0.3} stroke="#8b5cf6" name="Perda Evitada" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Composição por confiança */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h3 className="font-semibold text-gray-700 mb-4">Evolução: Comprovado vs Híbrido vs Referencial</h3>
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={evolucao}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="mes" fontSize={11} />
            <YAxis tickFormatter={v => formatCurrencyV3(v)} fontSize={11} />
            <Tooltip formatter={(v: number) => formatCurrencyV3(v)} />
            <Area type="monotone" dataKey="comprovado" stackId="1" fill="#16a34a" fillOpacity={0.4} stroke="#16a34a" name="Comprovado" />
            <Area type="monotone" dataKey="hibrido" stackId="1" fill="#ca8a04" fillOpacity={0.3} stroke="#ca8a04" name="Híbrido" />
            <Area type="monotone" dataKey="referencial" stackId="1" fill="#9333ea" fillOpacity={0.2} stroke="#9333ea" name="Referencial" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* % Comprovado */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h3 className="font-semibold text-gray-700 mb-4">Evolução do % Comprovado</h3>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={evolucao}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="mes" fontSize={11} />
            <YAxis domain={[0, 100]} fontSize={11} tickFormatter={v => `${v}%`} />
            <Tooltip formatter={(v: number) => `${v}%`} />
            <Line type="monotone" dataKey="pctComprovado" stroke="#16a34a" strokeWidth={2} dot name="% Comprovado" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Payback */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h3 className="font-semibold text-gray-700 mb-4">Curva de Payback</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={paybackData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="mes" fontSize={11} />
            <YAxis tickFormatter={v => formatCurrencyV3(v)} fontSize={11} />
            <Tooltip formatter={(v: number) => formatCurrencyV3(v)} />
            <Line type="monotone" dataKey="custoAcumulado" stroke="#ef4444" strokeWidth={2} strokeDasharray="5 5" name="Investimento Acumulado" />
            <Line type="monotone" dataKey="valorAcumulado" stroke="#16a34a" strokeWidth={2} name="Valor Acumulado" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
