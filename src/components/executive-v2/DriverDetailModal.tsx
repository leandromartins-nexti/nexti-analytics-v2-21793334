import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ROIDriver, confidenceBadge, formatCurrency, formatNumber, hierarquiaBaselineLabel } from "@/lib/roiData";
import { ShieldCheck, Blend, BookOpen, TrendingUp, TrendingDown, ArrowUpRight, MapPin } from "lucide-react";

interface Props {
  driver: ROIDriver | null;
  open: boolean;
  onClose: () => void;
}

function RastreabilidadeBadge({ nivel }: { nivel: "alto" | "medio" | "baixo" }) {
  const cfg = nivel === "alto"
    ? { label: "Alto", color: "text-green-700 bg-green-50 border-green-200" }
    : nivel === "medio"
    ? { label: "Médio", color: "text-yellow-700 bg-yellow-50 border-yellow-200" }
    : { label: "Baixo", color: "text-red-700 bg-red-50 border-red-200" };
  return <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold border ${cfg.color}`}>{cfg.label}</span>;
}

function MetricRow({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div>
      <span className="text-[10px] text-gray-400 font-medium uppercase">{label}</span>
      <p className="text-sm font-semibold text-gray-800 mt-0.5">{value}</p>
      {sub && <p className="text-[10px] text-gray-400">{sub}</p>}
    </div>
  );
}

export default function DriverDetailModal({ driver: d, open, onClose }: Props) {
  if (!d) return null;

  const badge = confidenceBadge(d.confianca);
  const md = d.modalData;
  const isMonetario = d.categoria === "monetario";
  const ConfIcon = d.confianca === "comprovado" ? ShieldCheck : d.confianca === "hibrido" ? Blend : BookOpen;

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${badge.bg}`}>
              <ConfIcon className={`w-5 h-5 ${badge.color}`} />
            </div>
            <div className="flex-1">
              <DialogTitle className="text-base font-bold text-gray-800">{d.nome}</DialogTitle>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-gray-500">{d.moduloNexti}</span>
                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold ${badge.bg} ${badge.color} border ${badge.border}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${badge.dot}`} /> {badge.label}
                </span>
              </div>
            </div>
          </div>
        </DialogHeader>

        {/* Core metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 p-4 bg-gray-50 rounded-lg">
          <MetricRow label="Fonte do Baseline" value={d.fonteBaseline} />
          <MetricRow label="Fonte do Dado Atual" value={d.fonteAtual} />
          <MetricRow label="Janela Baseline" value={d.janelaBaseline} />
          <MetricRow label="Janela Atual" value={d.janelaAtual} />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-3 p-4 bg-gray-50 rounded-lg">
          <MetricRow label="Hierarquia do Baseline" value={hierarquiaBaselineLabel(d.hierarquiaBaseline)} />
          <MetricRow label="Unidade de Medida" value={d.unidadeMedida} />
          <MetricRow label="Rastreabilidade" value="" />
          <div>
            <span className="text-[10px] text-gray-400 font-medium uppercase">Rastreabilidade</span>
            <div className="mt-1"><RastreabilidadeBadge nivel={md.nivelRastreabilidade} /></div>
          </div>
          <MetricRow label="Tendência" value={`${d.tendencia > 0 ? "+" : ""}${d.tendencia}%`} />
        </div>

        {isMonetario && (
          <>
            {/* Quantitative detail */}
            <div className="mt-4">
              <h4 className="text-xs font-semibold text-gray-700 uppercase mb-3">Detalhamento Quantitativo</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                <div className="border border-gray-200 rounded-lg p-3 text-center">
                  <p className="text-[10px] text-gray-400 uppercase">Colaboradores Impactados</p>
                  <p className="text-lg font-bold text-gray-800">{formatNumber(md.colaboradoresImpactados)}</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-3 text-center">
                  <p className="text-[10px] text-gray-400 uppercase">{d.unidadeMedida} Baseline</p>
                  <p className="text-lg font-bold text-gray-800">{formatNumber(md.totalEventosBaseline)}</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-3 text-center">
                  <p className="text-[10px] text-gray-400 uppercase">{d.unidadeMedida} Atual</p>
                  <p className="text-lg font-bold text-gray-800">{formatNumber(md.totalEventosAtual)}</p>
                </div>
                <div className="border border-green-200 bg-green-50 rounded-lg p-3 text-center">
                  <p className="text-[10px] text-green-600 uppercase">Valor Baseline</p>
                  <p className="text-lg font-bold text-green-700">{formatCurrency(md.valorMonetarioBaseline)}</p>
                </div>
                <div className="border border-green-200 bg-green-50 rounded-lg p-3 text-center">
                  <p className="text-[10px] text-green-600 uppercase">Valor Atual</p>
                  <p className="text-lg font-bold text-green-700">{formatCurrency(md.valorMonetarioAtual)}</p>
                </div>
                <div className="border border-[#FF5722]/30 bg-orange-50 rounded-lg p-3 text-center">
                  <p className="text-[10px] text-[#FF5722] uppercase">Delta Capturado</p>
                  <p className="text-xl font-bold text-[#FF5722]">{formatCurrency(md.deltaCapturado)}</p>
                </div>
              </div>
              <div className="mt-2 text-xs text-gray-500 text-center">
                Média por colaborador impactado: <strong>{formatCurrency(md.mediaPorColaborador)}</strong>
              </div>
            </div>

            {/* Confidence-specific sections */}
            {d.confianca === "hibrido" && md.parametrosMedios && (
              <div className="mt-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <h4 className="text-xs font-semibold text-yellow-800 uppercase mb-2">Parâmetros Estimados Utilizados</h4>
                <ul className="space-y-1">
                  {md.parametrosMedios.map((p, i) => (
                    <li key={i} className="text-xs text-yellow-700 flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 mt-1.5 shrink-0" /> {p}
                    </li>
                  ))}
                </ul>
                {md.custoMedioAplicado && <p className="text-xs text-yellow-700 mt-2">Custo médio aplicado: <strong>{md.custoMedioAplicado}</strong></p>}
                {md.fatorAjusteAplicado && <p className="text-xs text-yellow-700">Fator de ajuste: <strong>{md.fatorAjusteAplicado}</strong></p>}
                <p className="text-[10px] text-yellow-600 mt-2 italic">⚠ A monetização é estimada sobre volume real de dados</p>
              </div>
            )}

            {d.confianca === "referencial" && (
              <div className="mt-4 p-4 bg-gray-100 rounded-lg border border-gray-300">
                <h4 className="text-xs font-semibold text-gray-700 uppercase mb-2">Referências e Benchmarks Utilizados</h4>
                {md.benchmarkUsado && <p className="text-xs text-gray-600">Benchmark: <strong>{md.benchmarkUsado}</strong></p>}
                {md.baseCaseUsado && <p className="text-xs text-gray-600 mt-1">Base Case: <strong>{md.baseCaseUsado}</strong></p>}
                {md.volumeEstimado && <p className="text-xs text-gray-600 mt-1">Volume estimado: <strong>{md.volumeEstimado}</strong></p>}
                {md.comoElevar && md.comoElevar.length > 0 && (
                  <div className="mt-3">
                    <p className="text-xs font-semibold text-gray-700 mb-1">Como elevar para Híbrido ou Comprovado:</p>
                    <ul className="space-y-1">
                      {md.comoElevar.map((item, i) => (
                        <li key={i} className="text-xs text-gray-600 flex items-start gap-2">
                          <ArrowUpRight className="w-3 h-3 text-[#FF5722] mt-0.5 shrink-0" /> {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <p className="text-[10px] text-gray-500 mt-2 italic">⚠ Cálculo referencial — valor depende de premissas configuráveis</p>
              </div>
            )}
          </>
        )}

        {/* Formula */}
        <div className="mt-4 p-3 bg-white rounded-lg border border-gray-200">
          <span className="text-[10px] text-gray-400 font-medium uppercase">Fórmula do Cálculo</span>
          <p className="font-mono text-xs text-[#FF5722] mt-1">{d.formulaResumo}</p>
        </div>

        {d.observacaoMetodologica && (
          <div className="mt-2 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <span className="text-[10px] text-blue-400 font-medium uppercase">Observação Metodológica</span>
            <p className="text-xs text-gray-600 mt-1">{d.observacaoMetodologica}</p>
          </div>
        )}

        {/* Ranking by unit */}
        {isMonetario && md.rankingUnidades && md.rankingUnidades.length > 0 && (
          <div className="mt-4">
            <h4 className="text-xs font-semibold text-gray-700 uppercase mb-2 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" /> Ranking por Unidade/Área
            </h4>
            <div className="space-y-1.5">
              {md.rankingUnidades.sort((a, b) => b.valor - a.valor).map((u, i) => {
                const maxVal = md.rankingUnidades![0]?.valor || 1;
                const pct = (u.valor / (md.rankingUnidades!.sort((a, b) => b.valor - a.valor)[0]?.valor || 1)) * 100;
                return (
                  <div key={i} className="flex items-center gap-3">
                    <span className="text-xs font-bold text-gray-400 w-5">{i + 1}</span>
                    <span className="text-xs text-gray-700 w-40 truncate">{u.nome}</span>
                    <div className="flex-1 bg-gray-100 rounded-full h-2">
                      <div className="bg-[#FF5722] rounded-full h-2" style={{ width: `${pct}%` }} />
                    </div>
                    <span className="text-xs font-semibold text-gray-700 w-24 text-right">{formatCurrency(u.valor)}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Upgrade paths */}
        {d.upgradePaths.length > 0 && (
          <div className="mt-4 p-4 bg-orange-50 rounded-lg border border-orange-200">
            <h4 className="text-xs font-semibold text-[#FF5722] uppercase mb-2">Caminho para Elevar Confiança</h4>
            <div className="space-y-2">
              {d.upgradePaths.map((up, i) => (
                <div key={i} className="flex items-start gap-3 p-3 bg-white rounded border border-orange-100">
                  <div className="flex items-center gap-1 shrink-0">
                    <span className={`px-1.5 py-0.5 rounded text-[10px] font-semibold ${confidenceBadge(up.de).bg} ${confidenceBadge(up.de).color}`}>{confidenceBadge(up.de).label}</span>
                    <TrendingUp className="w-3 h-3 text-[#FF5722]" />
                    <span className={`px-1.5 py-0.5 rounded text-[10px] font-semibold ${confidenceBadge(up.para).bg} ${confidenceBadge(up.para).color}`}>{confidenceBadge(up.para).label}</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-gray-700">{up.acao}</p>
                    <p className="text-[10px] text-gray-500 mt-0.5">{up.detalhe}</p>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-[10px] text-gray-400">Prazo: {up.prazo}</span>
                      <span className={`text-[10px] ${up.esforco === "baixo" ? "text-green-600" : up.esforco === "medio" ? "text-yellow-600" : "text-red-600"}`}>Esforço: {up.esforco}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
