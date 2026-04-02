import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { operacoesV3, formatCurrencyV3, V3Operacao } from "@/lib/analyticsV3Data";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

type ViewMode = "absoluto" | "por_colaborador" | "por_100";

export default function V3ValorOperacaoTab() {
  const [viewMode, setViewMode] = useState<ViewMode>("absoluto");
  const [filterTipo, setFilterTipo] = useState("todos");

  const getValue = (op: V3Operacao, field: "valorCapturado" | "custoEvitado" | "perdaEvitada") => {
    const v = op[field];
    if (viewMode === "por_colaborador") return Math.round(v / op.colaboradores);
    if (viewMode === "por_100") return Math.round((v / op.colaboradores) * 100);
    return v;
  };

  const sorted = [...operacoesV3].sort((a, b) => getValue(b, "valorCapturado") - getValue(a, "valorCapturado"));

  const chartData = sorted.map(op => ({
    nome: op.nome,
    valor: getValue(op, "valorCapturado"),
    fill: op.scoreOperacao >= 80 ? "#16a34a" : op.scoreOperacao >= 70 ? "#ca8a04" : "#ef4444",
  }));

  const scoreClass = (s: number) => s >= 85 ? "text-green-600 bg-green-50" : s >= 70 ? "text-yellow-600 bg-yellow-50" : "text-red-600 bg-red-50";

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-800">Valor por Operação</h2>
        <div className="flex gap-2">
          {(["absoluto", "por_colaborador", "por_100"] as ViewMode[]).map(m => (
            <button key={m} onClick={() => setViewMode(m)} className={`px-3 py-1.5 text-xs rounded-full border ${viewMode === m ? "bg-[#FF5722] text-white border-[#FF5722]" : "text-gray-600 border-gray-300"}`}>
              {m === "absoluto" ? "Absoluto" : m === "por_colaborador" ? "Por Colaborador" : "Por 100 Colab."}
            </button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={chartData} layout="vertical" margin={{ left: 100 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" tickFormatter={v => formatCurrencyV3(v)} fontSize={11} />
            <YAxis type="category" dataKey="nome" fontSize={11} width={95} />
            <Tooltip formatter={(v: number) => formatCurrencyV3(v)} />
            <Bar dataKey="valor" radius={[0, 4, 4, 0]} name="Valor Capturado" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="text-left px-4 py-3 font-semibold text-gray-600">Operação</th>
              <th className="text-right px-3 py-3 font-semibold text-gray-600">Valor Capturado</th>
              <th className="text-right px-3 py-3 font-semibold text-gray-600">Custo Evitado</th>
              <th className="text-right px-3 py-3 font-semibold text-gray-600">Perda Evitada</th>
              <th className="text-center px-3 py-3 font-semibold text-gray-600">% Comprovado</th>
              <th className="text-center px-3 py-3 font-semibold text-gray-600">Score</th>
              <th className="text-center px-3 py-3 font-semibold text-gray-600">Tend.</th>
              <th className="text-right px-3 py-3 font-semibold text-gray-600">Colab.</th>
              <th className="text-left px-3 py-3 font-semibold text-gray-600">Drivers Principais</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map(op => (
              <tr key={op.nome} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-gray-800">{op.nome}</td>
                <td className="px-3 py-3 text-right font-semibold">{formatCurrencyV3(getValue(op, "valorCapturado"))}</td>
                <td className="px-3 py-3 text-right text-blue-600">{formatCurrencyV3(getValue(op, "custoEvitado"))}</td>
                <td className="px-3 py-3 text-right text-purple-600">{formatCurrencyV3(getValue(op, "perdaEvitada"))}</td>
                <td className="px-3 py-3 text-center">{op.pctComprovado}%</td>
                <td className="px-3 py-3 text-center">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${scoreClass(op.scoreOperacao)}`}>{op.scoreOperacao}</span>
                </td>
                <td className="px-3 py-3 text-center">
                  {op.tendencia === "up" ? <TrendingUp className="w-4 h-4 text-green-500 mx-auto" /> : op.tendencia === "down" ? <TrendingDown className="w-4 h-4 text-red-500 mx-auto" /> : <Minus className="w-4 h-4 text-gray-400 mx-auto" />}
                </td>
                <td className="px-3 py-3 text-right text-gray-600">{op.colaboradores.toLocaleString()}</td>
                <td className="px-3 py-3 text-left text-xs text-gray-500">{op.driversPrincipais.join(", ")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
