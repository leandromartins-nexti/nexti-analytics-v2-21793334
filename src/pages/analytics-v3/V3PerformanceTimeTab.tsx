import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, PieChart, Pie, Cell, LineChart, Line, Legend } from "recharts";
import { performanceTimeV3, formatNumberV3 } from "@/lib/analyticsV3Data";

export default function V3PerformanceTimeTab() {
  const d = performanceTimeV3;

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-bold text-gray-800">Performance do Time Operacional</h2>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <KPI label="Total de Ações" value={formatNumberV3(d.totalAcoes)} color="text-gray-800" />
        <KPI label="Usuários Ativos" value={String(d.usuariosAtivos)} color="text-blue-600" />
        <KPI label="Média/Usuário" value={String(d.mediaAcoesPorUsuario)} color="text-gray-800" />
        <KPI label="Ações/100 Colab." value={String(d.acoesPor100Colaboradores)} color="text-gray-800" />
        <KPI label="Score Eficiência" value={String(d.scoreEficiencia)} color={d.scoreEficiencia >= 75 ? "text-green-600" : "text-yellow-600"} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Mix por tipo */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h3 className="font-semibold text-gray-700 mb-4">Mix por Tipo de Ação</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={d.tiposAcao} dataKey="quantidade" nameKey="tipo" cx="50%" cy="50%" outerRadius={90} label={({ tipo, pct }) => `${pct}%`} fontSize={10}>
                {d.tiposAcao.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-3 space-y-1">
            {d.tiposAcao.map(t => (
              <div key={t.tipo} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: t.color }} />
                  <span className="text-gray-600">{t.tipo}</span>
                </div>
                <span className="text-gray-500">{formatNumberV3(t.quantidade)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Evolução mensal */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h3 className="font-semibold text-gray-700 mb-4">Evolução Mensal</h3>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={d.evolucaoMensal}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes" fontSize={11} />
              <YAxis fontSize={11} />
              <Tooltip />
              <Legend fontSize={11} />
              <Line type="monotone" dataKey="acoes" stroke="#FF5722" strokeWidth={2} name="Ações" />
              <Line type="monotone" dataKey="usuarios" stroke="#3b82f6" strokeWidth={2} name="Usuários" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Comparativo por estrutura */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h3 className="font-semibold text-gray-700 mb-4">Comparativo por Regional</h3>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="text-left px-4 py-3 font-semibold text-gray-600">Regional</th>
              <th className="text-right px-3 py-3 font-semibold text-gray-600">Ações</th>
              <th className="text-right px-3 py-3 font-semibold text-gray-600">Usuários</th>
              <th className="text-right px-3 py-3 font-semibold text-gray-600">Média/Usuário</th>
              <th className="text-right px-3 py-3 font-semibold text-gray-600">Ações/100</th>
              <th className="text-center px-3 py-3 font-semibold text-gray-600">Score</th>
            </tr>
          </thead>
          <tbody>
            {d.porEstrutura.map(e => (
              <tr key={e.nome} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-gray-800">{e.nome}</td>
                <td className="px-3 py-3 text-right text-gray-600">{formatNumberV3(e.acoes)}</td>
                <td className="px-3 py-3 text-right text-gray-600">{e.usuarios}</td>
                <td className="px-3 py-3 text-right text-gray-600">{e.mediaPorUsuario}</td>
                <td className="px-3 py-3 text-right text-gray-600">{e.acoesPor100}</td>
                <td className="px-3 py-3 text-center">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${e.score >= 75 ? "bg-green-50 text-green-600" : e.score >= 65 ? "bg-yellow-50 text-yellow-600" : "bg-red-50 text-red-600"}`}>{e.score}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Top usuários */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h3 className="font-semibold text-gray-700 mb-4">Top 10 Usuários Operacionais</h3>
        <div className="space-y-2">
          {d.topUsuarios.map((u, i) => (
            <div key={i} className="flex items-center justify-between py-2 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-gray-400 w-5">{i + 1}</span>
                <div>
                  <p className="text-sm font-medium text-gray-800">{u.nome}</p>
                  <p className="text-xs text-gray-500">{u.cargo} · {u.estrutura}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-gray-800">{u.acoes} ações</p>
                <p className="text-xs text-gray-400">{u.tipos.join(", ")}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function KPI({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4">
      <p className="text-xs text-gray-500 mb-1">{label}</p>
      <p className={`text-lg font-bold ${color}`}>{value}</p>
    </div>
  );
}
