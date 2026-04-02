import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, ScatterChart, Scatter, ZAxis, CartesianGrid } from "recharts";
import { driversV3, formatCurrencyV3, formatNumberV3, confiancaBadgeV3, V3Driver } from "@/lib/analyticsV3Data";
import { TrendingUp, TrendingDown, Minus, X } from "lucide-react";

export default function V3DriversValorTab() {
  const [selectedDriver, setSelectedDriver] = useState<V3Driver | null>(null);
  const monetarios = driversV3.filter(d => d.categoria === "monetario" && d.ativo);

  const paretoData = [...monetarios].sort((a, b) => b.valorMonetizado - a.valorMonetizado).map(d => ({
    nome: d.nome.length > 22 ? d.nome.substring(0, 20) + "…" : d.nome,
    valor: d.valorMonetizado,
    fill: d.confianca === "comprovado" ? "#16a34a" : d.confianca === "hibrido" ? "#ca8a04" : "#9333ea",
  }));

  const TendIcon = ({ t }: { t: string }) => {
    if (t === "up") return <TrendingUp className="w-4 h-4 text-green-500" />;
    if (t === "down") return <TrendingDown className="w-4 h-4 text-red-500" />;
    return <Minus className="w-4 h-4 text-gray-400" />;
  };

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-bold text-gray-800">Drivers de Valor</h2>

      {/* Tabela */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="text-left px-4 py-3 font-semibold text-gray-600">Driver</th>
              <th className="text-left px-3 py-3 font-semibold text-gray-600">Módulo</th>
              <th className="text-right px-3 py-3 font-semibold text-gray-600">Comp. Ant.</th>
              <th className="text-right px-3 py-3 font-semibold text-gray-600">Atual</th>
              <th className="text-right px-3 py-3 font-semibold text-gray-600">Delta</th>
              <th className="text-right px-3 py-3 font-semibold text-gray-600">Valor</th>
              <th className="text-center px-3 py-3 font-semibold text-gray-600">Tipo</th>
              <th className="text-center px-3 py-3 font-semibold text-gray-600">Confiança</th>
              <th className="text-center px-3 py-3 font-semibold text-gray-600">Tend.</th>
              <th className="text-right px-3 py-3 font-semibold text-gray-600">Part. %</th>
            </tr>
          </thead>
          <tbody>
            {monetarios.map(d => {
              const badge = confiancaBadgeV3(d.confianca);
              return (
                <tr key={d.id} onClick={() => setSelectedDriver(d)} className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors">
                  <td className="px-4 py-3 font-medium text-gray-800">{d.nome}</td>
                  <td className="px-3 py-3 text-gray-500">{d.modulo}</td>
                  <td className="px-3 py-3 text-right text-gray-600">{formatNumberV3(d.competenciaAnterior)}</td>
                  <td className="px-3 py-3 text-right text-gray-600">{formatNumberV3(d.atual)}</td>
                  <td className="px-3 py-3 text-right">
                    <span className={d.deltaOperacional < 0 ? "text-green-600" : d.deltaOperacional > 0 ? "text-red-600" : "text-gray-500"}>
                      {d.deltaOperacional > 0 ? "+" : ""}{d.deltaOperacional}%
                    </span>
                  </td>
                  <td className="px-3 py-3 text-right font-semibold text-gray-800">{formatCurrencyV3(d.valorMonetizado)}</td>
                  <td className="px-3 py-3 text-center">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${d.tipoValor === "custo_evitado" ? "bg-blue-50 text-blue-700" : "bg-purple-50 text-purple-700"}`}>
                      {d.tipoValor === "custo_evitado" ? "Custo Evitado" : "Perda Evitada"}
                    </span>
                  </td>
                  <td className="px-3 py-3 text-center">
                    <span className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: badge.bg, color: badge.color }}>{badge.label}</span>
                  </td>
                  <td className="px-3 py-3 text-center"><TendIcon t={d.tendencia} /></td>
                  <td className="px-3 py-3 text-right text-gray-600">{d.participacao}%</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pareto */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h3 className="font-semibold text-gray-800 mb-4">Contribuição por Driver</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={paretoData} layout="vertical" margin={{ left: 160 }}>
            <XAxis type="number" tickFormatter={(v) => formatCurrencyV3(v)} fontSize={11} />
            <YAxis type="category" dataKey="nome" fontSize={11} width={155} />
            <Tooltip formatter={(v: number) => formatCurrencyV3(v)} />
            <Bar dataKey="valor" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Modal */}
      {selectedDriver && (
        <DriverModal driver={selectedDriver} onClose={() => setSelectedDriver(null)} />
      )}
    </div>
  );
}

function DriverModal({ driver, onClose }: { driver: V3Driver; onClose: () => void }) {
  const badge = confiancaBadgeV3(driver.confianca);
  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[85vh] overflow-y-auto p-6" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-800">{driver.nome}</h2>
            <p className="text-sm text-gray-500">{driver.modulo} · {driver.unidade}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg"><X className="w-5 h-5" /></button>
        </div>

        {/* Bloco 1: Evolução */}
        <Section title="Evolução Operacional">
          <div className="grid grid-cols-4 gap-3 mb-4">
            <MiniKPI label="Comp. Anterior" value={formatNumberV3(driver.competenciaAnterior)} />
            <MiniKPI label="Atual" value={formatNumberV3(driver.atual)} />
            <MiniKPI label="Delta" value={`${driver.deltaOperacional > 0 ? "+" : ""}${driver.deltaOperacional}%`} />
            <MiniKPI label="Valor" value={formatCurrencyV3(driver.valorMonetizado)} />
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={driver.evolucaoMensal}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes" fontSize={10} />
              <YAxis fontSize={10} />
              <Tooltip />
              <Bar dataKey="baseline" fill="#d1d5db" name="Baseline" />
              <Bar dataKey="atual" fill="#FF5722" name="Atual" />
            </BarChart>
          </ResponsiveContainer>
        </Section>

        {/* Bloco 2: Conversão Financeira */}
        <Section title="Conversão Financeira">
          <p className="text-sm text-gray-600 mb-2">
            <span className="font-medium">Fórmula:</span> <code className="bg-gray-100 px-2 py-0.5 rounded text-xs">{driver.formulaResumo}</code>
          </p>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: badge.bg, color: badge.color }}>{badge.label}</span>
            <span className="text-xs text-gray-500">{driver.tipoValor === "custo_evitado" ? "Custo Evitado" : "Perda Evitada"}</span>
          </div>
        </Section>

        {/* Bloco 3: Metodologia */}
        <Section title="Metodologia">
          <div className="text-sm space-y-1 text-gray-600">
            <p><span className="font-medium">Fonte baseline:</span> {driver.fonteBaseline}</p>
            <p><span className="font-medium">Fonte atual:</span> {driver.fonteAtual}</p>
            <p><span className="font-medium">Janela:</span> {driver.janelaComparacao}</p>
            <p><span className="font-medium">Obs:</span> {driver.observacoes}</p>
          </div>
        </Section>

        {/* Bloco 4: Drill-down */}
        <Section title="Drill-down por Operação">
          <div className="space-y-2">
            {driver.porOperacao.map((op, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-gray-100">
                <div>
                  <p className="text-sm font-medium text-gray-800">{op.nome}</p>
                  <p className="text-xs text-gray-500">{op.colaboradores} colaboradores</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-800">{formatCurrencyV3(op.valor)}</p>
                  <p className="text-xs text-green-600">Delta: {op.delta}%</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {driver.upgradePaths && driver.upgradePaths.length > 0 && (
          <Section title="Caminho de Elevação">
            {driver.upgradePaths.map((up, i) => (
              <div key={i} className="bg-orange-50 border border-orange-200 rounded-lg p-3 text-sm">
                <p className="font-medium text-gray-800">{up.acao}</p>
                <p className="text-xs text-gray-500 mt-1">{up.de} → {up.para} · {up.impacto}</p>
              </div>
            ))}
          </Section>
        )}
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-6">
      <h3 className="font-semibold text-gray-700 mb-3 text-sm border-b border-gray-200 pb-2">{title}</h3>
      {children}
    </div>
  );
}

function MiniKPI({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-gray-50 rounded-lg p-3 text-center">
      <p className="text-xs text-gray-500">{label}</p>
      <p className="text-sm font-bold text-gray-800">{value}</p>
    </div>
  );
}
