import { useState } from "react";
import { Settings, Save, RotateCcw } from "lucide-react";
import { premissas, drivers, ownership, confidenceBadge, formatCurrency } from "@/lib/roiData";

export default function MetodologiaTab() {
  const [localPremissas, setLocalPremissas] = useState({ ...premissas });
  const [localOwnership, setLocalOwnership] = useState({ ...ownership });

  const handlePremissaChange = (key: string, value: string) => {
    setLocalPremissas(prev => ({ ...prev, [key]: parseFloat(value) || 0 }));
  };

  const handleReset = () => {
    setLocalPremissas({ ...premissas });
    setLocalOwnership({ ...ownership });
  };

  const premissaFields = [
    { key: "colaboradores", label: "Colaboradores", suffix: "" },
    { key: "salarioMedio", label: "Salário Médio", suffix: "R$" },
    { key: "encargos", label: "Encargos", suffix: "x" },
    { key: "beneficios", label: "Benefícios", suffix: "R$" },
    { key: "multiplicadorHE", label: "Multiplicador HE", suffix: "x" },
    { key: "adicionalNoturno", label: "Adicional Noturno", suffix: "%" },
    { key: "custoHoraAdmin", label: "Custo Hora Admin", suffix: "R$" },
    { key: "custoMedioDisputa", label: "Custo Médio Disputa", suffix: "R$" },
    { key: "custoUnitarioDoc", label: "Custo Unitário Doc.", suffix: "R$" },
    { key: "turnover", label: "Turnover", suffix: "%" },
    { key: "genteReceita", label: "Gente % Receita", suffix: "%" },
    { key: "custoUnitarioNexti", label: "Custo Unitário Nexti", suffix: "R$/col" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
            <Settings className="w-5 h-5 text-gray-600" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-gray-800">Metodologia e Configurações</h2>
            <p className="text-xs text-gray-500">Premissas, custos e parâmetros de cálculo do ROI</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={handleReset} className="flex items-center gap-1.5 px-3 py-1.5 rounded border border-gray-300 text-xs font-medium text-gray-600 hover:bg-gray-50">
            <RotateCcw className="w-3.5 h-3.5" /> Resetar
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#FF5722] text-white text-xs font-medium hover:bg-[#E64A19]">
            <Save className="w-3.5 h-3.5" /> Salvar
          </button>
        </div>
      </div>

      {/* Dados da Empresa */}
      <div className="bg-white rounded-lg border border-gray-200 p-5">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded bg-gray-100 flex items-center justify-center text-sm">📊</div>
          <div>
            <h3 className="text-sm font-semibold text-gray-800">Dados da Empresa</h3>
            <p className="text-[10px] text-gray-500">Parâmetros base para cálculo</p>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {premissaFields.map(f => (
            <div key={f.key}>
              <label className="text-[10px] text-gray-500 font-medium uppercase block mb-1">{f.label}</label>
              <div className="relative">
                <input
                  type="number"
                  value={(localPremissas as any)[f.key]}
                  onChange={(e) => handlePremissaChange(f.key, e.target.value)}
                  className="w-full border border-gray-200 rounded px-3 py-2 text-sm font-medium text-gray-700 text-right focus:outline-none focus:border-[#FF5722] focus:ring-1 focus:ring-[#FF5722]/20"
                />
                {f.suffix && <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-gray-400">{f.suffix}</span>}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contrato Nexti */}
      <div className="bg-white rounded-lg border border-gray-200 p-5">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded bg-gray-100 flex items-center justify-center text-sm">📋</div>
          <div>
            <h3 className="text-sm font-semibold text-gray-800">Contrato Nexti</h3>
            <p className="text-[10px] text-gray-500">Custos de ownership</p>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { key: "custoContrato", label: "Custo Contrato", sub: "/colaborador/mês" },
            { key: "custosAdicionais", label: "Custos Adicionais", sub: "Novos custos" },
            { key: "custosReduzidos", label: "Custos Reduzidos", sub: "Cancelamentos" },
            { key: "ownershipTotal", label: "Ownership Total", sub: "Total" },
          ].map(f => (
            <div key={f.key}>
              <label className="text-[10px] text-gray-500 font-medium uppercase block mb-1">{f.label}</label>
              <input
                type="number"
                value={(localOwnership as any)[f.key]}
                onChange={(e) => setLocalOwnership(prev => ({ ...prev, [f.key]: parseFloat(e.target.value) || 0 }))}
                className="w-full border border-gray-200 rounded px-3 py-2 text-sm font-medium text-gray-700 text-right focus:outline-none focus:border-[#FF5722] focus:ring-1 focus:ring-[#FF5722]/20"
              />
              <p className="text-[10px] text-gray-400 mt-0.5">{f.sub}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Driver Config Table */}
      <div className="bg-white rounded-lg border border-gray-200 p-5">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded bg-gray-100 flex items-center justify-center text-sm">⚙️</div>
          <div>
            <h3 className="text-sm font-semibold text-gray-800">Configuração de Drivers</h3>
            <p className="text-[10px] text-gray-500">Fonte, baseline e metodologia por driver</p>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-gray-200">
                {["Driver", "Módulo", "Status", "Fonte Baseline", "Fonte Atual", "Custo Unit.", "Unidade", "Confiança", "Fator %"].map(h => (
                  <th key={h} className="text-left py-2 px-2 text-gray-500 font-medium uppercase text-[10px]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {drivers.map(d => {
                const badge = confidenceBadge(d.confianca);
                return (
                  <tr key={d.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-2 px-2 font-medium text-gray-700">{d.nome}</td>
                    <td className="py-2 px-2 text-gray-500">{d.moduloNexti}</td>
                    <td className="py-2 px-2">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold ${d.status === "ativo" ? "bg-green-50 text-green-600" : "bg-gray-100 text-gray-500"}`}>
                        {d.status}
                      </span>
                    </td>
                    <td className="py-2 px-2 text-gray-500">{d.fonteBaseline}</td>
                    <td className="py-2 px-2 text-gray-500">{d.fonteAtual}</td>
                    <td className="py-2 px-2">{formatCurrency(d.custoUnitario)}</td>
                    <td className="py-2 px-2 text-gray-500">{d.unidadeMedida}</td>
                    <td className="py-2 px-2">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold ${badge.bg} ${badge.color} border ${badge.border}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${badge.dot}`} /> {badge.label}
                      </span>
                    </td>
                    <td className="py-2 px-2">
                      <input type="number" defaultValue={d.fatorReducao} className="w-16 border border-gray-200 rounded px-2 py-1 text-xs text-right focus:outline-none focus:border-[#FF5722]" />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Methodology Notes */}
      <div className="bg-white rounded-lg border border-gray-200 p-5">
        <h3 className="text-sm font-semibold text-gray-800 mb-3">📖 Notas Metodológicas</h3>
        <div className="space-y-3 text-xs text-gray-600 leading-relaxed">
          <p><strong>Baseline:</strong> O sistema prioriza dados históricos reais do cliente antes da ativação de cada módulo. Quando indisponível, utiliza benchmark interno ou Base Cases de referência.</p>
          <p><strong>Janela de comparação:</strong> Baseline de 3 meses pré-ativação, com exclusão de período de ramp-up (primeiros 60 dias).</p>
          <p><strong>Níveis de confiança:</strong> Comprovado (dado real + custo real), Híbrido (volume real + custo estimado), Referencial (Base Case ou premissa genérica).</p>
          <p><strong>Intangíveis:</strong> Ganhos não monetários são exibidos separadamente e não compõem o ROI monetário total.</p>
          <p><strong>Ganhos negativos:</strong> Deteriorações são exibidas sem mascaramento, permitindo análise real da operação.</p>
        </div>
      </div>
    </div>
  );
}
