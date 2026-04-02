import { oportunidadesV3, getPotencialAdicional, formatCurrencyV3, driversV3, confiancaBadgeV3 } from "@/lib/analyticsV3Data";
import { Zap, Clock, TrendingUp, ArrowRight } from "lucide-react";

export default function V3OportunidadesTab() {
  const potencial = getPotencialAdicional();
  const quickWins = oportunidadesV3.filter(o => o.tipo === "quick_win");
  const estruturais = oportunidadesV3.filter(o => o.tipo === "estrutural");
  const driversComUpgrade = driversV3.filter(d => d.upgradePaths && d.upgradePaths.length > 0);

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-bold text-gray-800">Oportunidades</h2>

      {/* Potencial */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-6 text-white">
        <p className="text-sm text-orange-100">Potencial Adicional Identificado</p>
        <p className="text-3xl font-bold mt-1">{formatCurrencyV3(potencial)}</p>
        <p className="text-sm text-orange-200 mt-2">{oportunidadesV3.length} oportunidades mapeadas · {quickWins.length} quick wins</p>
      </div>

      {/* Quick Wins */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <div className="flex items-center gap-2 mb-4">
          <Zap className="w-5 h-5 text-yellow-500" />
          <h3 className="font-semibold text-gray-800">Quick Wins</h3>
        </div>
        <div className="space-y-3">
          {quickWins.map((o, i) => (
            <OportunidadeCard key={i} op={o} />
          ))}
        </div>
      </div>

      {/* Estruturais */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-blue-500" />
          <h3 className="font-semibold text-gray-800">Oportunidades Estruturais</h3>
        </div>
        <div className="space-y-3">
          {estruturais.map((o, i) => (
            <OportunidadeCard key={i} op={o} />
          ))}
        </div>
      </div>

      {/* Elevação de confiança */}
      {driversComUpgrade.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h3 className="font-semibold text-gray-800 mb-4">Caminhos de Elevação de Confiança</h3>
          <div className="space-y-3">
            {driversComUpgrade.map(d => d.upgradePaths!.map((up, i) => {
              const badgeDe = confiancaBadgeV3(up.de);
              const badgePara = confiancaBadgeV3(up.para);
              return (
                <div key={`${d.id}-${i}`} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800">{d.nome}</p>
                    <p className="text-xs text-gray-500 mt-1">{up.acao}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: badgeDe.bg, color: badgeDe.color }}>{badgeDe.label}</span>
                    <ArrowRight className="w-4 h-4 text-gray-400" />
                    <span className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: badgePara.bg, color: badgePara.color }}>{badgePara.label}</span>
                  </div>
                </div>
              );
            }))}
          </div>
        </div>
      )}
    </div>
  );
}

function OportunidadeCard({ op }: { op: typeof oportunidadesV3[0] }) {
  const esforcoColor = op.esforco === "baixo" ? "text-green-600 bg-green-50" : op.esforco === "medio" ? "text-yellow-600 bg-yellow-50" : "text-red-600 bg-red-50";
  return (
    <div className="border border-gray-200 rounded-lg p-4">
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm font-medium text-gray-800">{op.acao}</p>
        {op.impactoEstimado > 0 && <span className="text-sm font-bold text-green-600">{formatCurrencyV3(op.impactoEstimado)}</span>}
      </div>
      <p className="text-xs text-gray-500 mb-3">{op.detalhe}</p>
      <div className="flex items-center gap-3 text-xs">
        <span className="text-gray-500">Driver: {op.driver}</span>
        <span className={`px-2 py-0.5 rounded-full ${esforcoColor}`}>Esforço: {op.esforco}</span>
        <span className="text-gray-400 flex items-center gap-1"><Clock className="w-3 h-3" />{op.prazoEstimado}</span>
      </div>
    </div>
  );
}
