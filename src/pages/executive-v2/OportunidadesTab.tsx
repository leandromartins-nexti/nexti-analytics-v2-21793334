import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie, Legend } from "recharts";
import {
  getDriversMonetarios, getAllDriversMonetarios, getEconomiaBruta, getConfiancaBreakdown,
  formatCurrency, confidenceBadge, OportunidadeCategoria, drivers,
} from "@/lib/roiData";
import { Zap, Database, Settings, Puzzle, ArrowUpRight, TrendingUp } from "lucide-react";

const categoriaConfig: Record<OportunidadeCategoria, { label: string; icon: typeof Zap; color: string; bg: string }> = {
  quick_win: { label: "Quick Win", icon: Zap, color: "text-green-700", bg: "bg-green-50" },
  dependente_dados: { label: "Depende de Dados", icon: Database, color: "text-blue-700", bg: "bg-blue-50" },
  dependente_operacional: { label: "Mudança Operacional", icon: Settings, color: "text-yellow-700", bg: "bg-yellow-50" },
  dependente_modulo: { label: "Ativação de Módulo", icon: Puzzle, color: "text-purple-700", bg: "bg-purple-50" },
};

export default function OportunidadesTab() {
  const monetarios = getDriversMonetarios();
  const todosMonetarios = getAllDriversMonetarios();
  const ecoBruta = getEconomiaBruta();
  const conf = getConfiancaBreakdown();

  // Upgrade paths from all drivers
  const allUpgrades = drivers.flatMap(d => d.upgradePaths.map(up => ({ driver: d, ...up })));

  const potencialPorDriver = monetarios.map(d => {
    const potencial = d.confianca === "comprovado" ? d.ganhoBruto * 0.1 : d.confianca === "hibrido" ? d.ganhoBruto * 0.35 : d.ganhoBruto * 0.6;
    const categoria: OportunidadeCategoria = d.confianca === "referencial" ? "dependente_dados"
      : d.confianca === "hibrido" ? (d.tendencia < -10 ? "quick_win" : "dependente_operacional")
      : "quick_win";
    const esforco = categoria === "quick_win" ? 1 : categoria === "dependente_operacional" ? 2 : 3;
    const prazoEstimado = categoria === "quick_win" ? "1-2 meses" : categoria === "dependente_operacional" ? "3-6 meses" : "6-12 meses";
    return { ...d, potencialAdicional: Math.round(potencial), categoria, esforco, prazoEstimado };
  });

  // Inactive drivers as module activation opportunities
  const inativos = todosMonetarios.filter(d => d.status === "inativo");
  const potencialInativos = inativos.length > 0 ? 480000 : 0; // Estimated value for Benefits module

  const potencialTotal = potencialPorDriver.reduce((s, d) => s + d.potencialAdicional, 0) + potencialInativos;
  const maiorAlavanca = [...potencialPorDriver].sort((a, b) => b.potencialAdicional - a.potencialAdicional)[0];

  const quickWins = potencialPorDriver.filter(d => d.categoria === "quick_win");
  const estruturais = potencialPorDriver.filter(d => d.categoria !== "quick_win");

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
      fill: d.categoria === "quick_win" ? "#22c55e" : d.categoria === "dependente_dados" ? "#3b82f6" : d.categoria === "dependente_operacional" ? "#eab308" : "#a855f7",
    }));

  return (
    <div className="space-y-6">
      {/* Big Numbers */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "Potencial Adicional Total", value: formatCurrency(potencialTotal), color: "text-[#FF5722]" },
          { label: "Maior Alavanca", value: maiorAlavanca?.nome || "—", sub: formatCurrency(maiorAlavanca?.potencialAdicional || 0), color: "text-green-600" },
          { label: "Caminhos de Elevação", value: `${allUpgrades.length}`, sub: "ações identificadas", color: "text-blue-600" },
          { label: "Módulos Não Ativados", value: `${inativos.length}`, sub: inativos.length > 0 ? `~${formatCurrency(potencialInativos)}/ano` : "Todos ativos", color: "text-purple-600" },
        ].map((kpi, i) => (
          <div key={i} className="bg-white rounded-lg border border-gray-200 p-4 text-center">
            <p className="text-[10px] text-gray-500 font-medium uppercase">{kpi.label}</p>
            <p className={`text-lg font-bold mt-1 ${kpi.color} truncate`}>{kpi.value}</p>
            {kpi.sub && <p className="text-xs text-gray-400 mt-0.5">{kpi.sub}</p>}
          </div>
        ))}
      </div>

      {/* Upgrade Paths — Confidence Elevation */}
      {allUpgrades.length > 0 && (
        <div className="bg-white rounded-lg border border-gray-200 p-5">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-4 h-4 text-[#FF5722]" />
            <h3 className="text-sm font-semibold text-gray-800">Caminhos para Elevar Confiança</h3>
          </div>
          <p className="text-xs text-gray-500 mb-4">Ações que podem transformar drivers de Referencial → Híbrido → Comprovado, aumentando a defensabilidade do ROI.</p>
          <div className="space-y-3">
            {allUpgrades.map((up, i) => {
              const fromBadge = confidenceBadge(up.de);
              const toBadge = confidenceBadge(up.para);
              return (
                <div key={i} className="flex items-start gap-4 p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-1.5 shrink-0 mt-0.5">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${fromBadge.bg} ${fromBadge.color} border ${fromBadge.border}`}>{fromBadge.label}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#FF5722]" />
                    <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${toBadge.bg} ${toBadge.color} border ${toBadge.border}`}>{toBadge.label}</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-gray-700">{up.driver.nome}</p>
                    <p className="text-xs text-[#FF5722] font-medium mt-0.5">{up.acao}</p>
                    <p className="text-[10px] text-gray-500 mt-0.5">{up.detalhe}</p>
                    <div className="flex items-center gap-4 mt-1.5">
                      <span className="text-[10px] text-gray-400">Módulo: {up.driver.moduloNexti}</span>
                      <span className="text-[10px] text-gray-400">Prazo: {up.prazo}</span>
                      <span className={`text-[10px] font-medium ${up.esforco === "baixo" ? "text-green-600" : up.esforco === "medio" ? "text-yellow-600" : "text-red-600"}`}>Esforço: {up.esforco}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Quick Wins vs Estruturais */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-green-50 rounded-lg border border-green-200 p-5">
          <div className="flex items-center gap-2 mb-3">
            <Zap className="w-4 h-4 text-green-600" />
            <h3 className="text-sm font-semibold text-green-800">Quick Wins</h3>
            <span className="text-[10px] text-green-600 bg-green-100 px-2 py-0.5 rounded-full">{quickWins.length} oportunidades</span>
          </div>
          <div className="space-y-2">
            {quickWins.slice(0, 4).map(d => (
              <div key={d.id} className="flex items-center justify-between py-2 px-3 bg-white rounded border border-green-100">
                <div>
                  <p className="text-xs font-medium text-gray-700">{d.nome}</p>
                  <p className="text-[10px] text-gray-400">Prazo: {d.prazoEstimado}</p>
                </div>
                <span className="text-xs font-bold text-green-600">{formatCurrency(d.potencialAdicional)}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-blue-50 rounded-lg border border-blue-200 p-5">
          <div className="flex items-center gap-2 mb-3">
            <Database className="w-4 h-4 text-blue-600" />
            <h3 className="text-sm font-semibold text-blue-800">Oportunidades Estruturais</h3>
            <span className="text-[10px] text-blue-600 bg-blue-100 px-2 py-0.5 rounded-full">{estruturais.length + inativos.length} oportunidades</span>
          </div>
          <div className="space-y-2">
            {estruturais.slice(0, 3).map(d => {
              const cat = categoriaConfig[d.categoria];
              return (
                <div key={d.id} className="flex items-center justify-between py-2 px-3 bg-white rounded border border-blue-100">
                  <div>
                    <p className="text-xs font-medium text-gray-700">{d.nome}</p>
                    <span className={`text-[10px] ${cat.color} ${cat.bg} px-1.5 py-0.5 rounded`}>{cat.label}</span>
                  </div>
                  <span className="text-xs font-bold text-blue-600">{formatCurrency(d.potencialAdicional)}</span>
                </div>
              );
            })}
            {inativos.map(d => (
              <div key={d.id} className="flex items-center justify-between py-2 px-3 bg-white rounded border border-purple-100">
                <div>
                  <p className="text-xs font-medium text-gray-700">{d.nome}</p>
                  <span className="text-[10px] text-purple-700 bg-purple-50 px-1.5 py-0.5 rounded">Ativação de Módulo</span>
                </div>
                <span className="text-xs font-bold text-purple-600">~{formatCurrency(potencialInativos)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-5">
          <h3 className="text-sm font-semibold text-gray-800 mb-3">Valor Capturado vs Potencial</h3>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={capturadoVsPotencial} cx="50%" cy="50%" innerRadius={60} outerRadius={90} dataKey="value" label={({ value }) => `${(value / 1000000).toFixed(1)}M`} labelLine={false}>
                  <Cell fill="#22c55e" />
                  <Cell fill="#FF5722" />
                </Pie>
                <Legend verticalAlign="bottom" iconType="circle" wrapperStyle={{ fontSize: 11 }} />
                <Tooltip formatter={(v: number) => formatCurrency(v)} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-5">
          <h3 className="text-sm font-semibold text-gray-800 mb-3">Oportunidade por Driver (Impacto)</h3>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={oportunidadeData} layout="vertical" margin={{ left: 10, right: 20 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" tickFormatter={(v) => `R$ ${(v / 1000).toFixed(0)}k`} tick={{ fontSize: 10 }} />
                <YAxis type="category" dataKey="name" width={130} tick={{ fontSize: 10 }} />
                <Tooltip formatter={(v: number) => formatCurrency(v)} />
                <Bar dataKey="potencial" radius={[0, 4, 4, 0]} name="Potencial">
                  {oportunidadeData.map((d, i) => <Cell key={i} fill={d.fill} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Drivers com oportunidade de comprovação */}
      <div className="bg-white rounded-lg border border-gray-200 p-5">
        <h3 className="text-sm font-semibold text-gray-800 mb-4">Drivers com Oportunidade de Comprovação</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-gray-200">
                {["Driver", "Módulo", "Valor Atual", "Confiança", "Dados Disponíveis", "Prazo Est.", "Potencial", "Ação Sugerida"].map(h => (
                  <th key={h} className="text-left py-2 px-2 text-gray-500 font-medium uppercase text-[10px]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {potencialPorDriver.filter(d => d.confianca !== "comprovado").sort((a, b) => b.potencialAdicional - a.potencialAdicional).map(d => {
                const badge = confidenceBadge(d.confianca);
                const dadosDisp = [
                  d.dataAvailability.temModulo && "Módulo",
                  d.dataAvailability.temEventosReais && "Eventos",
                  d.dataAvailability.temValorFinanceiroReal && "Financeiro",
                  d.dataAvailability.temFolha && "Folha",
                ].filter(Boolean).join(", ") || "—";
                const acaoSugerida = d.upgradePaths.length > 0 ? d.upgradePaths[0].acao : d.confianca === "referencial" ? "Importar dados reais" : "Validar baseline";
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
                    <td className="py-2 px-2 text-gray-500 text-[10px]">{dadosDisp}</td>
                    <td className="py-2 px-2 text-gray-500">{d.prazoEstimado}</td>
                    <td className="py-2 px-2 font-bold text-[#FF5722]">{formatCurrency(d.potencialAdicional)}</td>
                    <td className="py-2 px-2 text-gray-600 text-[10px]">{acaoSugerida}</td>
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
