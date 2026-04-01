import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { operacoes, formatCurrency, capturaScoreClass } from "@/lib/roiData";

export default function RoiOperacaoTab() {
  const [filterTipo, setFilterTipo] = useState<string>("todos");
  const filtered = filterTipo === "todos" ? operacoes : operacoes.filter(o => o.tipo === filterTipo);
  const sorted = [...filtered].sort((a, b) => b.economiaLiquida - a.economiaLiquida);

  const best = sorted[0];
  const worst = sorted[sorted.length - 1];
  const bestROI = [...filtered].sort((a, b) => b.roiTotal - a.roiTotal)[0];
  const worstTrend = [...filtered].sort((a, b) => a.tendencia - b.tendencia)[0];

  const rankData = sorted.map(o => ({
    name: o.nome.length > 20 ? o.nome.slice(0, 18) + "…" : o.nome,
    value: o.economiaLiquida,
    score: o.scoreCaptura,
  }));

  return (
    <div className="space-y-6">
      {/* Filter */}
      <div className="flex gap-2">
        {["todos", "regional", "contrato", "unidade"].map(t => (
          <button key={t} onClick={() => setFilterTipo(t)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${filterTipo === t ? "bg-[#FF5722] text-white border-[#FF5722]" : "bg-white text-gray-600 border-gray-300 hover:border-gray-400"}`}>
            {t === "todos" ? "Todos" : t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {/* Big Numbers */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "Melhor Operação", value: best?.nome || "—", sub: best ? formatCurrency(best.economiaLiquida) : "", color: "text-green-600" },
          { label: "Pior Operação", value: worst?.nome || "—", sub: worst ? formatCurrency(worst.economiaLiquida) : "", color: "text-red-500" },
          { label: "Maior ROI", value: bestROI?.nome || "—", sub: bestROI ? `${bestROI.roiTotal.toFixed(1)}x` : "", color: "text-[#FF5722]" },
          { label: "Maior Queda", value: worstTrend?.nome || "—", sub: worstTrend ? `${worstTrend.tendencia.toFixed(1)}%` : "", color: "text-red-500" },
        ].map((kpi, i) => (
          <div key={i} className="bg-white rounded-lg border border-gray-200 p-4 text-center">
            <p className="text-[10px] text-gray-500 font-medium uppercase">{kpi.label}</p>
            <p className={`text-sm font-bold mt-1 ${kpi.color} truncate`}>{kpi.value}</p>
            {kpi.sub && <p className="text-xs text-gray-400 mt-0.5">{kpi.sub}</p>}
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="bg-white rounded-lg border border-gray-200 p-5">
        <h3 className="text-sm font-semibold text-gray-800 mb-3">Ranking por Economia Líquida</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={rankData} layout="vertical" margin={{ left: 10, right: 20 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} />
              <XAxis type="number" tickFormatter={(v) => `R$ ${(v / 1000000).toFixed(1)}M`} tick={{ fontSize: 10 }} />
              <YAxis type="category" dataKey="name" width={140} tick={{ fontSize: 10 }} />
              <Tooltip formatter={(v: number) => formatCurrency(v)} />
              <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                {rankData.map((d, i) => <Cell key={i} fill={d.score >= 80 ? "#22c55e" : d.score >= 60 ? "#eab308" : "#ef4444"} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border border-gray-200 p-5">
        <h3 className="text-sm font-semibold text-gray-800 mb-4">Comparativo por Operação</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-gray-200">
                {["Operação", "Tipo", "Economia Bruta", "Ownership", "Economia Líquida", "ROI", "Drivers Principais", "% Comprov.", "Tendência", "Score"].map(h => (
                  <th key={h} className="text-left py-2 px-2 text-gray-500 font-medium uppercase text-[10px]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sorted.map(op => {
                const sc = capturaScoreClass(op.scoreCaptura);
                return (
                  <tr key={op.nome} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-2 px-2 font-medium text-gray-700">{op.nome}</td>
                    <td className="py-2 px-2 text-gray-500 capitalize">{op.tipo}</td>
                    <td className="py-2 px-2 text-green-600 font-medium">{formatCurrency(op.economiaBruta)}</td>
                    <td className="py-2 px-2">{formatCurrency(op.ownershipAtribuido)}</td>
                    <td className="py-2 px-2 text-green-600 font-bold">{formatCurrency(op.economiaLiquida)}</td>
                    <td className="py-2 px-2 font-bold text-[#FF5722]">{op.roiTotal.toFixed(1)}x</td>
                    <td className="py-2 px-2 text-gray-500">{op.driversPrincipais.join(", ")}</td>
                    <td className="py-2 px-2">{op.pctComprovado}%</td>
                    <td className={`py-2 px-2 font-medium ${op.tendencia >= 0 ? "text-green-600" : "text-red-500"}`}>{op.tendencia > 0 ? "+" : ""}{op.tendencia}%</td>
                    <td className="py-2 px-2">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold ${sc.bg} ${sc.color}`}>{op.scoreCaptura} – {sc.label}</span>
                    </td>
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
