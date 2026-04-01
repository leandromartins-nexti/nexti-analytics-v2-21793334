import { BookOpen, Shield, Eye, Calculator, ExternalLink, Settings } from "lucide-react";
import { drivers, ownership, confidenceBadge, formatCurrency, getDriversIntangiveis } from "@/lib/roiData";
import { useNavigate } from "react-router-dom";

export default function MetodologiaTab() {
  const navigate = useNavigate();
  const intangiveis = getDriversIntangiveis();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-gray-600" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-gray-800">Metodologia e Governança do ROI</h2>
            <p className="text-xs text-gray-500">Transparência dos cálculos e critérios de classificação</p>
          </div>
        </div>
        <button
          onClick={() => navigate("/roi-config")}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#FF5722] text-white text-xs font-medium hover:bg-[#E64A19] transition-colors"
        >
          <Settings className="w-3.5 h-3.5" /> Abrir Configurações de ROI
        </button>
      </div>

      {/* O que entra no ROI */}
      <div className="bg-white rounded-lg border border-gray-200 p-5">
        <div className="flex items-center gap-2 mb-4">
          <Calculator className="w-5 h-5 text-green-600" />
          <h3 className="text-sm font-semibold text-gray-800">O que entra no ROI monetário</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-gray-600">
          <div className="space-y-2">
            <p>✅ <strong>Ganhos financeiros mensuráveis</strong> — reduções de custo, economia com processos, eliminação de desperdícios e ganhos de eficiência com valor monetário direto ou estimável.</p>
            <p>✅ <strong>Drivers com baseline definido</strong> — cada driver possui uma referência (histórico real, benchmark ou Base Case) comparada ao resultado atual.</p>
            <p>✅ <strong>Custo unitário atribuído</strong> — todo ganho é convertido em valor financeiro utilizando custo unitário informado pelo cliente ou estimado por premissa ajustável.</p>
          </div>
          <div className="space-y-2">
            <p>❌ <strong>Ganhos intangíveis</strong> — melhoria de SLA, governança, conformidade e satisfação são exibidos separadamente e não compõem o ROI monetário total.</p>
            <p>❌ <strong>Projeções futuras</strong> — o ROI reflete valor já capturado no período, não projeções ou estimativas de ganhos futuros.</p>
            <p>❌ <strong>Valores sem baseline</strong> — drivers sem referência de comparação não geram cálculo de ganho.</p>
          </div>
        </div>
      </div>

      {/* Classificação automática de confiança */}
      <div className="bg-white rounded-lg border border-gray-200 p-5">
        <div className="flex items-center gap-2 mb-4">
          <Shield className="w-5 h-5 text-[#FF5722]" />
          <h3 className="text-sm font-semibold text-gray-800">Classificação Automática de Confiança</h3>
        </div>
        <p className="text-xs text-gray-500 mb-4">A confiança de cada driver é determinada automaticamente pela disponibilidade real de dados no banco e data lake da Nexti.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { level: "Comprovado", color: "border-green-300 bg-green-50", dot: "bg-green-500", desc: "A Nexti possui dado operacional real E dado financeiro real do cliente. Baseline e período atual comprovados com rastreabilidade total.", criteria: ["Módulo ativo + eventos reais", "Valor financeiro real (folha, financeiro)", "Baseline real confiável"] },
            { level: "Híbrido", color: "border-yellow-300 bg-yellow-50", dot: "bg-yellow-500", desc: "A Nexti possui o evento operacional real, mas monetiza com custo médio ou parâmetro configurado. Volume real + custo estimado.", criteria: ["Módulo ativo + eventos reais", "Sem valor financeiro detalhado", "Monetização por custo médio"] },
            { level: "Referencial", color: "border-gray-300 bg-gray-50", dot: "bg-gray-400", desc: "A Nexti não possui módulo, eventos ou dados suficientes. Cálculo baseado em Base Case, benchmark ou premissas ajustáveis.", criteria: ["Módulo ausente ou sem dados", "Benchmark ou Base Case", "Premissas configuráveis"] },
          ].map((c, i) => (
            <div key={i} className={`rounded-lg border-2 ${c.color} p-4`}>
              <div className="flex items-center gap-2 mb-2">
                <span className={`w-3 h-3 rounded-full ${c.dot}`} />
                <span className="text-sm font-semibold text-gray-800">{c.level}</span>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed mb-3">{c.desc}</p>
              <ul className="space-y-1">
                {c.criteria.map((cr, j) => (
                  <li key={j} className="text-[10px] text-gray-500 flex items-center gap-1.5">
                    <span className={`w-1 h-1 rounded-full ${c.dot}`} /> {cr}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Baseline hierarchy */}
      <div className="bg-white rounded-lg border border-gray-200 p-5">
        <div className="flex items-center gap-2 mb-4">
          <Eye className="w-5 h-5 text-blue-600" />
          <h3 className="text-sm font-semibold text-gray-800">Hierarquia de Prioridade do Baseline</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          {[
            { num: "1", title: "Histórico real", desc: "Dados reais do cliente antes da ativação do módulo (prioridade máxima)" },
            { num: "2", title: "Média em janela", desc: "Média do cliente em janela anterior válida, quando histórico completo não está disponível" },
            { num: "3", title: "Benchmark interno", desc: "Benchmark por perfil semelhante de operação no ecossistema Nexti" },
            { num: "4", title: "Base Case Nexti", desc: "Premissa padrão baseada em cases anteriores (menor nível de confiança)" },
          ].map((b, i) => (
            <div key={i} className="border border-gray-200 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-6 h-6 rounded-full bg-[#FF5722] text-white text-xs font-bold flex items-center justify-center">{b.num}</span>
                <span className="text-xs font-semibold text-gray-700">{b.title}</span>
              </div>
              <p className="text-[10px] text-gray-500">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Drivers current classification summary */}
      <div className="bg-white rounded-lg border border-gray-200 p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-gray-800">Classificação Atual por Driver</h3>
          <span className="text-[10px] text-gray-400">Determinado automaticamente por disponibilidade de dados</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-gray-200">
                {["Driver", "Módulo", "Confiança", "Módulo Ativo", "Eventos Reais", "Valor Financeiro", "Baseline Real", "Folha"].map(h => (
                  <th key={h} className="text-left py-2 px-2 text-gray-500 font-medium uppercase text-[10px]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {drivers.filter(d => d.categoria === "monetario").map(d => {
                const badge = confidenceBadge(d.confianca);
                const da = d.dataAvailability;
                const checkOrX = (v: boolean) => v ? "✅" : "❌";
                return (
                  <tr key={d.id} className="border-b border-gray-100">
                    <td className="py-2 px-2 font-medium text-gray-700">{d.nome}</td>
                    <td className="py-2 px-2 text-gray-500">{d.moduloNexti}</td>
                    <td className="py-2 px-2">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold ${badge.bg} ${badge.color} border ${badge.border}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${badge.dot}`} /> {badge.label}
                      </span>
                    </td>
                    <td className="py-2 px-2 text-center">{checkOrX(da.temModulo)}</td>
                    <td className="py-2 px-2 text-center">{checkOrX(da.temEventosReais)}</td>
                    <td className="py-2 px-2 text-center">{checkOrX(da.temValorFinanceiroReal)}</td>
                    <td className="py-2 px-2 text-center">{checkOrX(da.temBaselineReal)}</td>
                    <td className="py-2 px-2 text-center">{checkOrX(da.temFolha)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Ownership + Intangíveis */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-5">
          <h3 className="text-sm font-semibold text-gray-800 mb-3">Ownership Nexti</h3>
          <p className="text-xs text-gray-600 leading-relaxed">O ownership representa o custo total do investimento na solução Nexti. A economia líquida é calculada subtraindo o ownership da economia bruta.</p>
          <div className="mt-3 p-3 bg-gray-50 rounded text-xs space-y-1">
            <p className="font-mono text-[#FF5722]">economia_líquida = economia_bruta - ownership_total</p>
            <p className="font-mono text-[#FF5722]">ROI = economia_bruta / ownership_total</p>
            <p className="font-mono text-gray-500 mt-2">Ownership mensal = {formatCurrency(ownership.custoContrato)}</p>
            <p className="font-mono text-gray-500">Ownership anual = {formatCurrency(ownership.ownershipTotal)}</p>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-5">
          <h3 className="text-sm font-semibold text-gray-800 mb-3">Ganhos Intangíveis</h3>
          <p className="text-xs text-gray-600 leading-relaxed mb-3">Ganhos intangíveis não entram no ROI monetário, mas demonstram benefícios qualitativos da solução.</p>
          <div className="space-y-2">
            {intangiveis.map(d => (
              <div key={d.id} className="flex items-center justify-between py-1.5 border-b border-gray-100 last:border-0">
                <span className="text-xs text-gray-600">{d.nome}</span>
                <span className="text-xs font-medium text-gray-700">{d.baseline} → {d.atual} {d.unidadeMedida}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
