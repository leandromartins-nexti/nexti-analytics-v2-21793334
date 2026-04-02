import { useNavigate } from "react-router-dom";
import { driversV3, confiancaBadgeV3, formatCurrencyV3, ownershipV3, configV3 } from "@/lib/analyticsV3Data";
import { Settings, CheckCircle2, XCircle } from "lucide-react";

export default function V3MetodologiaTab() {
  const navigate = useNavigate();
  const monetarios = driversV3.filter(d => d.categoria === "monetario");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-800">Metodologia e Governança</h2>
        <button onClick={() => navigate("/roi-config-v3")} className="bg-[#FF5722] text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-[#E64A19]">
          <Settings className="w-4 h-4" /> Configurações de ROI
        </button>
      </div>

      {/* Parâmetros da empresa */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h3 className="font-semibold text-gray-700 mb-4">Parâmetros da Empresa</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <Info label="Empresa" value={configV3.empresa.nome} />
          <Info label="Colaboradores" value={configV3.empresa.colaboradores.toLocaleString()} />
          <Info label="Salário Médio" value={formatCurrencyV3(configV3.empresa.salarioMedio)} />
          <Info label="Encargos" value={`${configV3.empresa.encargos}%`} />
          <Info label="Ownership Mensal" value={formatCurrencyV3(ownershipV3.custoMensal)} />
          <Info label="Ownership Anual" value={formatCurrencyV3(ownershipV3.custoAnual)} />
          <Info label="Custo Admin/Hora" value={formatCurrencyV3(configV3.empresa.custoAdminHora)} />
          <Info label="Custo Médio Processo" value={formatCurrencyV3(configV3.empresa.custoMedioProcesso)} />
        </div>
      </div>

      {/* Regras de confiança */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h3 className="font-semibold text-gray-700 mb-4">Regras de Confiança</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { tipo: "comprovado" as const, desc: "Evento operacional real + valor monetário real do cliente" },
            { tipo: "hibrido" as const, desc: "Evento operacional real + monetização por custo médio configurado" },
            { tipo: "referencial" as const, desc: "Benchmark, base case ou parâmetro configurado como referência" },
          ].map(r => {
            const badge = confiancaBadgeV3(r.tipo);
            return (
              <div key={r.tipo} className="p-4 rounded-lg border" style={{ borderColor: badge.color + "40", backgroundColor: badge.bg }}>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ color: badge.color, backgroundColor: badge.bg, border: `1px solid ${badge.color}` }}>{badge.label}</span>
                <p className="text-sm text-gray-600 mt-2">{r.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Hierarquia de baseline */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h3 className="font-semibold text-gray-700 mb-4">Hierarquia de Baseline</h3>
        <div className="space-y-2">
          {[
            "1. Histórico real do cliente no Nexti",
            "2. Competência anterior válida",
            "3. Janela histórica anterior válida",
            "4. Benchmark configurado",
            "5. Base case (apenas como fallback)",
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3 text-sm text-gray-600 py-1">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${i < 3 ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>{i + 1}</div>
              <span>{item.substring(3)}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Drivers e disponibilidade */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h3 className="font-semibold text-gray-700 mb-4">Drivers e Disponibilidade de Dados</h3>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="text-left px-4 py-3 font-semibold text-gray-600">Driver</th>
              <th className="text-left px-3 py-3 font-semibold text-gray-600">Módulo</th>
              <th className="text-center px-3 py-3 font-semibold text-gray-600">Confiança</th>
              <th className="text-center px-3 py-3 font-semibold text-gray-600">Evento Real</th>
              <th className="text-center px-3 py-3 font-semibold text-gray-600">Valor Monetário Real</th>
              <th className="text-left px-3 py-3 font-semibold text-gray-600">Fonte Baseline</th>
            </tr>
          </thead>
          <tbody>
            {monetarios.map(d => {
              const badge = confiancaBadgeV3(d.confianca);
              const temEventoReal = d.confianca !== "referencial";
              const temValorReal = d.confianca === "comprovado";
              return (
                <tr key={d.id} className="border-b border-gray-100">
                  <td className="px-4 py-3 font-medium text-gray-800">{d.nome}</td>
                  <td className="px-3 py-3 text-gray-500">{d.modulo}</td>
                  <td className="px-3 py-3 text-center">
                    <span className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: badge.bg, color: badge.color }}>{badge.label}</span>
                  </td>
                  <td className="px-3 py-3 text-center">
                    {temEventoReal ? <CheckCircle2 className="w-4 h-4 text-green-500 mx-auto" /> : <XCircle className="w-4 h-4 text-red-400 mx-auto" />}
                  </td>
                  <td className="px-3 py-3 text-center">
                    {temValorReal ? <CheckCircle2 className="w-4 h-4 text-green-500 mx-auto" /> : <XCircle className="w-4 h-4 text-red-400 mx-auto" />}
                  </td>
                  <td className="px-3 py-3 text-xs text-gray-500">{d.fonteBaseline}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Ganhos intangíveis */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h3 className="font-semibold text-gray-700 mb-4">Ganhos Intangíveis (fora da monetização principal)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            "Redução de retrabalho operacional",
            "Melhoria na experiência do colaborador",
            "Conformidade regulatória (eSocial)",
            "Visibilidade e governança em tempo real",
            "Redução de riscos de imagem e reputação",
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2 text-sm text-gray-600 p-3 bg-gray-50 rounded-lg">
              <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-gray-500">{label}</p>
      <p className="font-semibold text-gray-800">{value}</p>
    </div>
  );
}
