import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line, Legend } from "recharts";
import { absenteismoV3, formatNumberV3 } from "@/lib/analyticsV3Data";
import { TrendingUp, TrendingDown, Minus, AlertTriangle } from "lucide-react";

export default function V3AbsenteismoTab() {
  const d = absenteismoV3;

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-bold text-gray-800">Absenteísmo Executivo</h2>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        <KPI label="Taxa Global" value={`${d.taxaGlobal}%`} color={d.taxaGlobal > 5 ? "text-red-600" : "text-green-600"} />
        <KPI label="Horas Totais de Ausência" value={formatNumberV3(d.horasTotaisAusencia)} color="text-gray-800" />
        <KPI label="% Não Planejadas" value={`${d.pctNaoPlanejadas}%`} color="text-orange-600" />
        <KPI label="% Cobertas" value={`${d.pctCobertas}%`} color="text-blue-600" />
        <KPI label="Regional Crítica" value={d.regionalCritica} color="text-red-600" icon={<AlertTriangle className="w-4 h-4 text-red-500" />} />
        <KPI label="Tendência" value={d.tendencia === "up" ? "Melhorando" : d.tendencia === "down" ? "Piorando" : "Estável"} color={d.tendencia === "up" ? "text-green-600" : d.tendencia === "down" ? "text-red-600" : "text-gray-600"} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Distribuição por tipo */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h3 className="font-semibold text-gray-700 mb-4">Distribuição por Tipo</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={d.distribuicaoTipo} dataKey="horas" nameKey="tipo" cx="50%" cy="50%" outerRadius={90} label={({ tipo, pct }) => `${tipo} ${pct}%`} fontSize={11}>
                {d.distribuicaoTipo.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip formatter={(v: number) => `${formatNumberV3(v)} horas`} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Evolução mensal */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h3 className="font-semibold text-gray-700 mb-4">Evolução Mensal</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={d.evolucaoMensal}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes" fontSize={11} />
              <YAxis fontSize={11} tickFormatter={v => `${v}%`} />
              <Tooltip />
              <Legend fontSize={11} />
              <Line type="monotone" dataKey="taxa" stroke="#FF5722" strokeWidth={2} name="Taxa %" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Comparativo por estrutura */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h3 className="font-semibold text-gray-700 mb-4">Comparativo por Regional</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-left px-4 py-3 font-semibold text-gray-600">Regional</th>
                <th className="text-right px-3 py-3 font-semibold text-gray-600">Taxa %</th>
                <th className="text-right px-3 py-3 font-semibold text-gray-600">Horas</th>
                <th className="text-right px-3 py-3 font-semibold text-gray-600">Horas/100 Colab.</th>
                <th className="text-center px-3 py-3 font-semibold text-gray-600">Tendência</th>
              </tr>
            </thead>
            <tbody>
              {d.porEstrutura.map(e => (
                <tr key={e.nome} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-800">{e.nome}</td>
                  <td className={`px-3 py-3 text-right font-semibold ${e.taxa > 5.5 ? "text-red-600" : "text-green-600"}`}>{e.taxa}%</td>
                  <td className="px-3 py-3 text-right text-gray-600">{formatNumberV3(e.horas)}</td>
                  <td className="px-3 py-3 text-right text-gray-600">{e.horasPor100}</td>
                  <td className="px-3 py-3 text-center">
                    {e.tendencia === "up" ? <TrendingUp className="w-4 h-4 text-green-500 mx-auto" /> : e.tendencia === "down" ? <TrendingDown className="w-4 h-4 text-red-500 mx-auto" /> : <Minus className="w-4 h-4 text-gray-400 mx-auto" />}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function KPI({ label, value, color, icon }: { label: string; value: string; color: string; icon?: React.ReactNode }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4">
      <div className="flex items-center justify-between mb-1">
        <p className="text-xs text-gray-500">{label}</p>
        {icon}
      </div>
      <p className={`text-lg font-bold ${color}`}>{value}</p>
    </div>
  );
}
