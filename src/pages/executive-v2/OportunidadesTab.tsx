import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie, Legend } from "recharts";
import {
  getDriversMonetarios, getEconomiaBruta, getConfiancaBreakdown,
  formatCurrency, confidenceBadge, drivers,
} from "@/lib/roiData";

export default function OportunidadesTab() {
  const monetarios = getDriversMonetarios();
  const ecoBruta = getEconomiaBruta();
  const conf = getConfiancaBreakdown();

  // Simulated potential values per driver
  const potencialPorDriver = monetarios.map(d => {
    const potencial = d.confianca === "comprovado" ? d.ganhoBruto * 0.1 : d.confianca === "hibrido" ? d.ganhoBruto * 0.35 : d.ganhoBruto * 0.6;
    return { ...d, potencialAdicional: Math.round(potencial) };
  });

  const potencialTotal = potencialPorDriver.reduce((s, d) => s + d.potencialAdicional, 0);
  const maiorAlavanca = [...potencialPorDriver].sort((a, b) => b.potencialAdicional - a.potencialAdicional)[0];
  const semComprovacao = monetarios.filter(d => d.confianca === "referencial").length;
  const valorReferencial = monetarios.filter(d => d.confianca === "referencial").reduce((s, d) => s + d.ganhoBruto, 0);

  const capturadoVsPotencial = [
    { name: "Valor Capturado", value: ecoBruta },
    { name: "Potencial Adicional", value: potencialTotal },
  ];

  const oportunidadeData = [...potencialPorDriver]
    .sort((a, b) => b.potencialAdicional - a.potencialAdicional)
    .slice(0, 8)
    .map(d => ({
      name: d.nome.length > 18 ? d.nome.slice(0, 16) + "…" : d.nome,
      potencial: d.potencialAdicional,
      capturado: d.ganhoBruto,
      confianca: d.confianca,
    }));

  // Simulation scenarios
  const scenarios = [
    { label: "Redução de 20% no absenteísmo", economia: Math.round(ecoBruta * 0.08) },
    { label: "Eliminação de HE irregulares", economia: Math.round(ecoBruta * 0.12) },
    { label: "Melhoria de cobertura planejada", economia: Math.round(ecoBruta * 0.05) },
    { label: "Digitalização completa de documentos", economia: Math.round(ecoBruta * 0.03) },
    { label: "Otimização de quadro em 5%", economia: Math.round(ecoBruta * 0.15) },
  ];

  return (
    <div className="space-y-6">
      {/* Big Numbers */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "Potencial Adicional", value: formatCurrency(potencialTotal), color: "text-[#FF5722]" },
          { label: "Maior Alavanca", value: maiorAlavanca?.nome || "—", sub: formatCurrency(maiorAlavanca?.potencialAdicional || 0), color: "text-green-600" },
          { label: "Drivers sem Comprovação", value: `${semComprovacao}`, color: "text-yellow-600" },
          { label: "Valor sob Referência", value: formatCurrency(valorReferencial), color: "text-gray-600" },
        ].map((kpi, i) => (
          <div key={i} className="bg-white rounded-lg border border-gray-200 p-4 text-center">
            <p className="text-[10px] text-gray-500 font-medium uppercase">{kpi.label}</p>
            <p className={`text-lg font-bold mt-1 ${kpi.color} truncate`}>{kpi.value}</p>
            {kpi.sub && <p className="text-xs text-gray-400 mt-0.5">{kpi.sub}</p>}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Capturado vs Potencial */}
        <div className="bg-white rounded-lg border border-gray-200 p-5">
          <h3 className="text-sm font-semibold text-gray-800 mb-3">Valor Capturado vs Potencial</h3>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={capturadoVsPotencial} cx="50%" cy="50%" innerRadius={60} outerRadius={90} dataKey="value" label={({ name, value }) => `${(value / 1000000).toFixed(1)}M`} labelLine={false}>
                  <Cell fill="#22c55e" />
                  <Cell fill="#FF5722" />
                </Pie>
                <Legend verticalAlign="bottom" iconType="circle" wrapperStyle={{ fontSize: 11 }} />
                <Tooltip formatter={(v: number) => formatCurrency(v)} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Oportunidade por Driver */}
        <div className="bg-white rounded-lg border border-gray-200 p-5">
          <h3 className="text-sm font-semibold text-gray-800 mb-3">Oportunidade Adicional por Driver</h3>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={oportunidadeData} layout="vertical" margin={{ left: 10, right: 20 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" tickFormatter={(v) => `R$ ${(v / 1000).toFixed(0)}k`} tick={{ fontSize: 10 }} />
                <YAxis type="category" dataKey="name" width={130} tick={{ fontSize: 10 }} />
                <Tooltip formatter={(v: number) => formatCurrency(v)} />
                <Bar dataKey="potencial" fill="#FF5722" radius={[0, 4, 4, 0]} name="Potencial" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Simulation Scenarios */}
      <div className="bg-white rounded-lg border border-gray-200 p-5">
        <h3 className="text-sm font-semibold text-gray-800 mb-4">🎯 Simulação de Cenários</h3>
        <div className="space-y-3">
          {scenarios.map((s, i) => (
            <div key={i} className="flex items-center justify-between py-3 px-4 border border-gray-100 rounded-lg hover:bg-gray-50">
              <div>
                <p className="text-sm font-medium text-gray-700">{s.label}</p>
                <p className="text-[10px] text-gray-400">Impacto estimado no período</p>
              </div>
              <span className="text-sm font-bold text-green-600">{formatCurrency(s.economia)}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Table: Drivers sem medição real */}
      <div className="bg-white rounded-lg border border-gray-200 p-5">
        <h3 className="text-sm font-semibold text-gray-800 mb-4">Drivers com Oportunidade de Comprovação</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-gray-200">
                {["Driver", "Módulo", "Valor Atual", "Confiança", "Potencial Adicional", "Ação Sugerida"].map(h => (
                  <th key={h} className="text-left py-2 px-2 text-gray-500 font-medium uppercase text-[10px]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {potencialPorDriver.filter(d => d.confianca !== "comprovado").sort((a, b) => b.potencialAdicional - a.potencialAdicional).map(d => {
                const badge = confidenceBadge(d.confianca);
                return (
                  <tr key={d.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-2 px-2 font-medium text-gray-700">{d.nome}</td>
                    <td className="py-2 px-2 text-gray-500">{d.moduloNexti}</td>
                    <td className="py-2 px-2 text-green-600 font-medium">{formatCurrency(d.ganhoBruto)}</td>
                    <td className="py-2 px-2">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold ${badge.bg} ${badge.color} border ${badge.border}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${badge.dot}`} /> {badge.label}
                      </span>
                    </td>
                    <td className="py-2 px-2 font-bold text-[#FF5722]">{formatCurrency(d.potencialAdicional)}</td>
                    <td className="py-2 px-2 text-gray-500">{d.confianca === "referencial" ? "Importar dados reais" : "Validar baseline"}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
