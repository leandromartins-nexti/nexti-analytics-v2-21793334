import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight, Save, RotateCcw, Building2, Layers, Settings, Heart } from "lucide-react";
import { premissas, ownership, drivers, confidenceBadge, formatCurrency, PremissasROI, ROIOwnership } from "@/lib/roiData";

const sections = [
  { id: "empresa", label: "Dados da Empresa", icon: Building2 },
  { id: "baseline", label: "Configuração de Baseline", icon: Layers },
  { id: "drivers", label: "Configuração por Driver", icon: Settings },
  { id: "beneficios", label: "Benefícios (Referencial)", icon: Heart },
];

const premissaFields: { key: keyof PremissasROI; label: string; suffix: string }[] = [
  { key: "colaboradores", label: "Colaboradores", suffix: "" },
  { key: "dispositivos", label: "Dispositivos HAAS", suffix: "" },
  { key: "salarioMedio", label: "Salário Médio", suffix: "R$" },
  { key: "encargos", label: "Multiplicador Encargos", suffix: "x" },
  { key: "beneficios", label: "Benefícios/col", suffix: "R$" },
  { key: "multiplicadorHE", label: "Multiplicador HE", suffix: "x" },
  { key: "adicionalNoturno", label: "Adicional Noturno", suffix: "%" },
  { key: "custoHoraAdmin", label: "Custo Hora Admin", suffix: "R$" },
  { key: "custoMedioDisputa", label: "Custo Médio Disputa", suffix: "R$" },
  { key: "custoUnitarioDoc", label: "Custo Unitário Doc.", suffix: "R$" },
  { key: "turnover", label: "Turnover", suffix: "%" },
  { key: "custoUnitarioNexti", label: "Custo/col/mês Nexti", suffix: "R$" },
  { key: "custoUnitarioDispositivo", label: "Custo/dispositivo/mês", suffix: "R$" },
];

const beneficioFields: { key: keyof PremissasROI; label: string; suffix: string }[] = [
  { key: "custoMedioVT", label: "Custo Médio VT/col", suffix: "R$" },
  { key: "custoMedioVR", label: "Custo Médio VR/col", suffix: "R$" },
  { key: "percentualElegivel", label: "% Elegível", suffix: "%" },
  { key: "diasUteis", label: "Dias Úteis/mês", suffix: "" },
  { key: "ticketMedioBeneficio", label: "Ticket Médio", suffix: "R$" },
];

export default function ROIConfig() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("empresa");
  const [localPremissas, setLocalPremissas] = useState<PremissasROI>({ ...premissas });
  const [localOwnership, setLocalOwnership] = useState<ROIOwnership>({ ...ownership });

  const handlePremissaChange = (key: string, value: string) => {
    setLocalPremissas(prev => ({ ...prev, [key]: parseFloat(value) || 0 }));
  };

  const handleReset = () => {
    setLocalPremissas({ ...premissas });
    setLocalOwnership({ ...ownership });
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <header className="border-b border-gray-200 px-6 py-3 bg-gray-100">
        <div className="flex items-center gap-2 text-sm">
          <span className="text-[#FF5722] font-medium cursor-pointer hover:underline" onClick={() => navigate("/nexti-analytics")}>Home</span>
          <ChevronRight className="h-3.5 w-3.5 text-gray-400" />
          <span className="text-[#FF5722] font-medium cursor-pointer hover:underline" onClick={() => navigate("/executive-v2")}>Executive V2</span>
          <ChevronRight className="h-3.5 w-3.5 text-gray-400" />
          <span className="text-gray-700 font-semibold">Configurações de ROI</span>
        </div>
      </header>

      <div className="px-6 py-4 flex-1">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-lg font-bold text-gray-800">Centro de Configuração de ROI</h1>
            <p className="text-xs text-gray-500">Gerencie premissas, baselines e parâmetros de cada driver. As alterações refletem automaticamente no dashboard.</p>
          </div>
          <div className="flex gap-2">
            <button onClick={handleReset} className="flex items-center gap-1.5 px-3 py-1.5 rounded border border-gray-300 text-xs font-medium text-gray-600 hover:bg-gray-50">
              <RotateCcw className="w-3.5 h-3.5" /> Resetar
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#FF5722] text-white text-xs font-medium hover:bg-[#E64A19]">
              <Save className="w-3.5 h-3.5" /> Salvar Configurações
            </button>
          </div>
        </div>

        {/* Section tabs */}
        <div className="flex gap-2 mb-6">
          {sections.map(s => {
            const Icon = s.icon;
            return (
              <button key={s.id} onClick={() => setActiveSection(s.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition-colors ${activeSection === s.id ? "bg-[#FF5722] text-white" : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"}`}>
                <Icon className="w-3.5 h-3.5" /> {s.label}
              </button>
            );
          })}
        </div>

        {activeSection === "empresa" && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg border border-gray-200 p-5">
              <h3 className="text-sm font-semibold text-gray-800 mb-1">Parâmetros Gerais da Empresa</h3>
              <p className="text-[10px] text-gray-500 mb-4">Referência: 8.000 colaboradores (Orsegups)</p>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {premissaFields.map(f => (
                  <div key={f.key}>
                    <label className="text-[10px] text-gray-500 font-medium uppercase block mb-1">{f.label}</label>
                    <div className="relative">
                      <input type="number" value={localPremissas[f.key]}
                        onChange={(e) => handlePremissaChange(f.key, e.target.value)}
                        className="w-full border border-gray-200 rounded px-3 py-2 text-sm font-medium text-gray-700 text-right focus:outline-none focus:border-[#FF5722] focus:ring-1 focus:ring-[#FF5722]/20" />
                      {f.suffix && <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-gray-400">{f.suffix}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-5">
              <h3 className="text-sm font-semibold text-gray-800 mb-1">Contrato Nexti (Ownership)</h3>
              <p className="text-[10px] text-gray-500 mb-4">R$ 10/col/mês + R$ 50/dispositivo/mês = R$ 130.000/mês</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { key: "custoContrato", label: "Ownership Mensal", sub: "R$ 80k (col) + R$ 50k (HAAS)" },
                  { key: "custosAdicionais", label: "Custos Adicionais", sub: "Serviços extras" },
                  { key: "custosReduzidos", label: "Custos Reduzidos", sub: "Descontos/cancelamentos" },
                  { key: "ownershipTotal", label: "Ownership Anual", sub: "Total anualizado" },
                ].map(f => (
                  <div key={f.key}>
                    <label className="text-[10px] text-gray-500 font-medium uppercase block mb-1">{f.label}</label>
                    <input type="number" value={(localOwnership as any)[f.key]}
                      onChange={(e) => setLocalOwnership(prev => ({ ...prev, [f.key]: parseFloat(e.target.value) || 0 }))}
                      className="w-full border border-gray-200 rounded px-3 py-2 text-sm font-medium text-gray-700 text-right focus:outline-none focus:border-[#FF5722] focus:ring-1 focus:ring-[#FF5722]/20" />
                    <p className="text-[10px] text-gray-400 mt-0.5">{f.sub}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeSection === "baseline" && (
          <div className="bg-white rounded-lg border border-gray-200 p-5">
            <h3 className="text-sm font-semibold text-gray-800 mb-1">Configuração de Baseline por Driver</h3>
            <p className="text-[10px] text-gray-500 mb-4">Defina hierarquia, fonte, janela e parâmetros de referência</p>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-gray-200">
                    {["Driver", "Hierarquia", "Fonte Preferencial", "Janela Baseline", "Janela Comparação", "Fator Redução %", "Custo Unitário", "Benchmark Alt."].map(h => (
                      <th key={h} className="text-left py-2 px-2 text-gray-500 font-medium uppercase text-[10px]">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {drivers.filter(d => d.categoria === "monetario").map(d => (
                    <tr key={d.id} className="border-b border-gray-100">
                      <td className="py-2 px-2 font-medium text-gray-700">{d.nome}</td>
                      <td className="py-2 px-2">
                        <select defaultValue={d.hierarquiaBaseline} className="border border-gray-200 rounded px-2 py-1 text-xs focus:outline-none focus:border-[#FF5722]">
                          <option value="historico_real">Histórico real</option>
                          <option value="media_janela">Média em janela</option>
                          <option value="benchmark_interno">Benchmark interno</option>
                          <option value="base_case">Base Case</option>
                        </select>
                      </td>
                      <td className="py-2 px-2"><input type="text" defaultValue={d.fonteBaseline} className="border border-gray-200 rounded px-2 py-1 text-xs w-32 focus:outline-none focus:border-[#FF5722]" /></td>
                      <td className="py-2 px-2"><input type="text" defaultValue={d.janelaBaseline} className="border border-gray-200 rounded px-2 py-1 text-xs w-28 focus:outline-none focus:border-[#FF5722]" /></td>
                      <td className="py-2 px-2"><input type="text" defaultValue={d.janelaAtual} className="border border-gray-200 rounded px-2 py-1 text-xs w-28 focus:outline-none focus:border-[#FF5722]" /></td>
                      <td className="py-2 px-2"><input type="number" defaultValue={d.fatorReducao} className="border border-gray-200 rounded px-2 py-1 text-xs w-16 text-right focus:outline-none focus:border-[#FF5722]" /></td>
                      <td className="py-2 px-2"><input type="number" defaultValue={d.custoUnitario} className="border border-gray-200 rounded px-2 py-1 text-xs w-20 text-right focus:outline-none focus:border-[#FF5722]" /></td>
                      <td className="py-2 px-2"><input type="text" defaultValue="" placeholder="—" className="border border-gray-200 rounded px-2 py-1 text-xs w-28 focus:outline-none focus:border-[#FF5722]" /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeSection === "drivers" && (
          <div className="bg-white rounded-lg border border-gray-200 p-5">
            <h3 className="text-sm font-semibold text-gray-800 mb-1">Ficha de Configuração por Driver</h3>
            <p className="text-[10px] text-gray-500 mb-4">Status, módulo, fontes, unidade, tipo de monetização e regras</p>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-gray-200">
                    {["Driver", "Módulo", "Categoria", "Status", "Fonte Baseline", "Fonte Atual", "Unidade", "Custo Unit.", "Confiança", "Observações"].map(h => (
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
                        <td className="py-2 px-2"><input type="text" defaultValue={d.moduloNexti} className="border border-gray-200 rounded px-2 py-1 text-xs w-32 focus:outline-none focus:border-[#FF5722]" /></td>
                        <td className="py-2 px-2">
                          <span className={`text-[10px] font-medium px-2 py-0.5 rounded ${d.categoria === "monetario" ? "bg-green-50 text-green-600" : "bg-purple-50 text-purple-600"}`}>
                            {d.categoria === "monetario" ? "Monetário" : "Intangível"}
                          </span>
                        </td>
                        <td className="py-2 px-2">
                          <select defaultValue={d.status} className="border border-gray-200 rounded px-2 py-1 text-xs focus:outline-none focus:border-[#FF5722]">
                            <option value="ativo">Ativo</option>
                            <option value="inativo">Inativo</option>
                          </select>
                        </td>
                        <td className="py-2 px-2"><input type="text" defaultValue={d.fonteBaseline} className="border border-gray-200 rounded px-2 py-1 text-xs w-32 focus:outline-none focus:border-[#FF5722]" /></td>
                        <td className="py-2 px-2"><input type="text" defaultValue={d.fonteAtual} className="border border-gray-200 rounded px-2 py-1 text-xs w-28 focus:outline-none focus:border-[#FF5722]" /></td>
                        <td className="py-2 px-2"><input type="text" defaultValue={d.unidadeMedida} className="border border-gray-200 rounded px-2 py-1 text-xs w-20 focus:outline-none focus:border-[#FF5722]" /></td>
                        <td className="py-2 px-2"><input type="number" defaultValue={d.custoUnitario} className="border border-gray-200 rounded px-2 py-1 text-xs w-20 text-right focus:outline-none focus:border-[#FF5722]" /></td>
                        <td className="py-2 px-2">
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold ${badge.bg} ${badge.color} border ${badge.border}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${badge.dot}`} /> {badge.label}
                          </span>
                        </td>
                        <td className="py-2 px-2"><input type="text" defaultValue="" placeholder="—" className="border border-gray-200 rounded px-2 py-1 text-xs w-32 focus:outline-none focus:border-[#FF5722]" /></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeSection === "beneficios" && (
          <div className="space-y-6">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-xs text-yellow-800"><strong>⚠ Módulo de Benefícios não ativado.</strong> Os parâmetros abaixo alimentam o cálculo referencial do driver "Pagamento de Benefícios". O dashboard apenas exibe o resultado — edite os valores aqui.</p>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-5">
              <h3 className="text-sm font-semibold text-gray-800 mb-1">Parâmetros Referenciais de Benefícios</h3>
              <p className="text-[10px] text-gray-500 mb-4">Esses valores são usados no cálculo referencial quando o módulo não está ativado</p>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {beneficioFields.map(f => (
                  <div key={f.key}>
                    <label className="text-[10px] text-gray-500 font-medium uppercase block mb-1">{f.label}</label>
                    <div className="relative">
                      <input type="number" value={localPremissas[f.key]}
                        onChange={(e) => handlePremissaChange(f.key, e.target.value)}
                        className="w-full border border-gray-200 rounded px-3 py-2 text-sm font-medium text-gray-700 text-right focus:outline-none focus:border-[#FF5722] focus:ring-1 focus:ring-[#FF5722]/20" />
                      {f.suffix && <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-gray-400">{f.suffix}</span>}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3 bg-gray-50 rounded text-xs">
                <p className="text-gray-600">Economia potencial estimada (referencial):</p>
                <p className="font-mono text-[#FF5722] mt-1">
                  potencial = ({localPremissas.custoMedioVT} + {localPremissas.custoMedioVR}) × {localPremissas.colaboradores} × {(localPremissas.percentualElegivel * 100).toFixed(0)}% × fator_economia
                </p>
                <p className="text-gray-500 mt-1">Estimativa: {formatCurrency((localPremissas.custoMedioVT + localPremissas.custoMedioVR) * localPremissas.colaboradores * localPremissas.percentualElegivel * 0.08)} a {formatCurrency((localPremissas.custoMedioVT + localPremissas.custoMedioVR) * localPremissas.colaboradores * localPremissas.percentualElegivel * 0.12)}/ano</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
