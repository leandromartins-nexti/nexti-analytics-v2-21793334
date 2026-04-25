/**
 * FeriasV2TabContent — nova aba de Férias V2.
 *
 * Implementa a especificação "Aba Férias V2" descrita em docs/spec, com:
 * - 6 big numbers (REAL)
 * - 10 elementos de análise (1-4 REAL, 5-10 MOCK)
 *
 * Esta aba existe EM PARALELO à aba Férias atual (não substitui).
 * Layout próprio para diferenciação visual durante comparação lado a lado.
 */
import { useMemo, useState } from "react";
import {
  ResponsiveContainer, ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid,
  Tooltip as RechartsTooltip, Legend, ReferenceLine, ScatterChart, Scatter,
  ZAxis, Cell, LineChart,
} from "recharts";
import {
  ALERTAS,
  BIG_NUMBERS,
  COMPOSICAO_COBERTURA,
  PLANEJAMENTO,
  PONTO_BATIDO,
  MAPA_OPERACOES,
  CASOS_RISCO,
  HEATMAP_POSTOS,
  CUSTO_COBERTURA,
  TENDENCIA_SCORE,
  COMPARATIVO_UNIDADES,
  HALL_GLORIA_VERGONHA,
} from "@/data/ferias-v2/ferias-v2-data";

// ════════════════════════════════════════════════════════════
// Helpers de formatação
// ════════════════════════════════════════════════════════════
const fmtMes = (iso: string) => {
  const [, m, y] = iso.split("-");
  const meses = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];
  return `${meses[parseInt(m, 10) - 1]}/${y.slice(-2)}`;
};

const fmtNum = (n: number) => n.toLocaleString("pt-BR");
const fmtPct = (n: number) => `${n.toFixed(1).replace(".", ",")}%`;
const fmtBRL = (n: number) => `R$ ${n.toLocaleString("pt-BR", { minimumFractionDigits: 1, maximumFractionDigits: 1 })}k`;

const corSeveridade = (sev: string) => {
  if (sev === "bom" || sev === "verde") return { bg: "bg-green-50", border: "border-green-200", text: "text-green-700", hex: "#22c55e" };
  if (sev === "atencao" || sev === "laranja") return { bg: "bg-orange-50", border: "border-orange-200", text: "text-orange-700", hex: "#f59e0b" };
  if (sev === "critico" || sev === "vermelho") return { bg: "bg-red-50", border: "border-red-200", text: "text-red-700", hex: "#ef4444" };
  if (sev === "amarelo") return { bg: "bg-yellow-50", border: "border-yellow-200", text: "text-yellow-700", hex: "#eab308" };
  return { bg: "bg-gray-50", border: "border-gray-200", text: "text-gray-700", hex: "#6b7280" };
};

const tagRiscoLabel: Record<string, { label: string; color: string }> = {
  ponto_batido: { label: "Ponto batido", color: "bg-red-100 text-red-700 border-red-200" },
  sem_cobertura: { label: "Sem cobertura", color: "bg-orange-100 text-orange-700 border-orange-200" },
  cobertura_com_he: { label: "HE em cobertura", color: "bg-yellow-100 text-yellow-700 border-yellow-200" },
  ultima_hora: { label: "Última hora", color: "bg-purple-100 text-purple-700 border-purple-200" },
  sobreposicao: { label: "Sobreposição", color: "bg-blue-100 text-blue-700 border-blue-200" },
};

// ════════════════════════════════════════════════════════════
// Subcomponente: Card wrapper padrão
// ════════════════════════════════════════════════════════════
function Card({ title, subtitle, children, className = "" }: { title: string; subtitle?: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-card border border-border/50 rounded-xl p-4 ${className}`}>
      <div className="mb-2">
        <h4 className="text-sm font-semibold">{title}</h4>
        {subtitle && <p className="text-[10px] text-muted-foreground mt-0.5">{subtitle}</p>}
      </div>
      {children}
    </div>
  );
}

// ════════════════════════════════════════════════════════════
// Big Numbers (topo)
// ════════════════════════════════════════════════════════════
function BigNumberCard({ label, value, unit, severidade, comentario }: {
  label: string;
  value: string | number;
  unit?: string;
  severidade: string;
  comentario?: string;
}) {
  const c = corSeveridade(severidade);
  return (
    <div className={`bg-card border ${c.border} rounded-xl p-4 hover:shadow-lg hover:-translate-y-0.5 transition-all flex flex-col`}>
      <p className="text-[10px] font-semibold text-muted-foreground tracking-wide uppercase mb-2">{label}</p>
      <p className="text-2xl font-bold text-foreground">
        {typeof value === "number" ? fmtNum(value) : value}
        {unit && <span className="text-base ml-1 text-muted-foreground">{unit}</span>}
      </p>
      {comentario && <p className={`text-[11px] mt-1 font-medium ${c.text}`}>{comentario}</p>}
    </div>
  );
}

// ════════════════════════════════════════════════════════════
// Componente principal
// ════════════════════════════════════════════════════════════
export default function FeriasV2TabContent() {
  const [tagFiltro, setTagFiltro] = useState<string | null>(null);

  // ── Big numbers
  const bn = BIG_NUMBERS;

  // ── 1. Composição da cobertura
  const composicaoData = useMemo(() => COMPOSICAO_COBERTURA.serie_mensal.map(d => ({
    mes: fmtMes(d.mes),
    "Ferista dedicado": d.ferista_dedicado_h,
    "Remanejo": d.remanejo_h,
    "Hora extra": d.overtime_h,
    "% HE": d.pct_he_sobre_cobertura,
  })), []);

  // ── 2. Planejamento
  const planejamentoData = useMemo(() => PLANEJAMENTO.serie_mensal.map(d => ({
    mes: fmtMes(d.mes),
    "Antecipada (>30d)": d.antecipada_mais_30d,
    "Razoável (16-30d)": d.razoavel_16_30d,
    "Apertada (8-15d)": d.apertada_8_15d,
    "Última hora (0-7d)": d.ultima_hora_0_7d,
    "% Última hora": d.pct_ultima_hora,
  })), []);

  // ── 3. Ponto batido
  const pontoBatidoData = useMemo(() => PONTO_BATIDO.serie_mensal.map(d => ({
    mes: fmtMes(d.mes),
    "Ponto batido": d.ferias_com_ponto_batido,
    "Sem cobertura": d.ferias_sem_cobertura_identificada,
    "Com HE relevante": d.ferias_equivalentes_com_he,
    "% Efetivo afetado": d.pct_efetivo_afetado_ponto_batido,
  })), []);

  // ── 5. Lista filtrada
  const casosFiltrados = useMemo(() => {
    if (!tagFiltro) return CASOS_RISCO.lista;
    return CASOS_RISCO.lista.filter(c => c.tags_risco.includes(tagFiltro));
  }, [tagFiltro]);

  // ── 7. Custo
  const custoData = useMemo(() => CUSTO_COBERTURA.serie_mensal.map(d => ({
    mes: fmtMes(d.mes),
    "Ferista dedicado": d.custo_ferista_dedicado,
    "Remanejo": d.custo_remanejo,
    "HE": d.custo_he,
    "Custo ideal": d.custo_ideal,
  })), []);

  // ── 8. Tendência score
  const tendenciaData = useMemo(() => TENDENCIA_SCORE.serie_mensal.map(d => ({
    mes: fmtMes(d.mes),
    Score: d.score,
  })), []);

  // ── Mapa: domain
  const mapaDomain = useMemo(() => {
    const headcounts = MAPA_OPERACOES.unidades.map(d => d.headcount);
    const max = Math.max(...headcounts) * 1.15;
    const xMax = Math.ceil(max / 50) * 50;
    return { xMin: 0, xMax, yMin: 0, yMax: 100 };
  }, []);

  return (
    <div className="flex flex-col w-full bg-gray-50 min-h-screen">
      <div className="flex-1 min-w-0 space-y-3 px-3 sm:px-6 py-4 pb-24">

        {/* Banner identificador */}
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl px-4 py-2.5 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-amber-900">Férias V2 — visualização paralela</p>
            <p className="text-[11px] text-amber-700 mt-0.5">
              Aba experimental construída a partir da spec V2. Dados marcados como REAL vêm da base; MOCK são estimativas plausíveis para validação visual.
            </p>
          </div>
          <span className="text-[10px] font-medium bg-amber-100 text-amber-800 border border-amber-300 px-2 py-1 rounded-full whitespace-nowrap">
            {bn.periodo.label}
          </span>
        </div>

        {/* ─────────── BIG NUMBERS ─────────── */}
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-3">
          <BigNumberCard
            label="Score Férias"
            value={bn.score_ferias.valor}
            severidade={bn.score_ferias.label_severidade}
            comentario={`${bn.score_ferias.delta_pp_vs_anterior > 0 ? "+" : ""}${bn.score_ferias.delta_pp_vs_anterior}pp`}
          />
          <BigNumberCard
            label="Volume de Férias"
            value={bn.volume_total_ferias.valor}
            severidade={bn.volume_total_ferias.label_severidade}
            comentario={bn.volume_total_ferias.comentario}
          />
          <BigNumberCard
            label="HE em Cobertura"
            value={bn.horas_cobertura_he_pct.valor.toFixed(2).replace(".", ",")}
            unit={bn.horas_cobertura_he_pct.unidade}
            severidade={bn.horas_cobertura_he_pct.label_severidade}
            comentario={bn.horas_cobertura_he_pct.comentario}
          />
          <BigNumberCard
            label="Antecedência Média"
            value={bn.antecedencia_media_dias.valor.toString().replace(".", ",")}
            unit={bn.antecedencia_media_dias.unidade}
            severidade={bn.antecedencia_media_dias.label_severidade}
            comentario={bn.antecedencia_media_dias.comentario}
          />
          <BigNumberCard
            label="Ponto Batido em Férias"
            value={bn.ferias_com_ponto_batido_pct.valor.toFixed(1).replace(".", ",")}
            unit={bn.ferias_com_ponto_batido_pct.unidade}
            severidade={bn.ferias_com_ponto_batido_pct.label_severidade}
            comentario={bn.ferias_com_ponto_batido_pct.comentario}
          />
          <BigNumberCard
            label="Sem Cobertura"
            value={bn.ferias_sem_cobertura_pct.valor.toFixed(1).replace(".", ",")}
            unit={bn.ferias_sem_cobertura_pct.unidade}
            severidade={bn.ferias_sem_cobertura_pct.label_severidade}
            comentario={bn.ferias_sem_cobertura_pct.comentario}
          />
        </div>

        {/* Alertas */}
        {ALERTAS.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            {ALERTAS.map((a, i) => {
              const c = corSeveridade(a.severidade);
              return (
                <div key={i} className={`${c.bg} ${c.border} border rounded-lg px-3 py-2`}>
                  <p className={`text-[11px] font-semibold ${c.text}`}>{a.titulo}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{a.descricao}</p>
                </div>
              );
            })}
          </div>
        )}

        {/* ─────────── 1. COMPOSIÇÃO DA COBERTURA ─────────── */}
        <Card title="1. Composição da Cobertura de Férias" subtitle="Como minhas férias estão sendo cobertas? · 12 meses · REAL">
          <ResponsiveContainer width="100%" height={300}>
            <ComposedChart data={composicaoData} margin={{ top: 10, right: 50, bottom: 5, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes" tick={{ fontSize: 10 }} />
              <YAxis yAxisId="left" tick={{ fontSize: 10 }} label={{ value: "Horas", angle: -90, position: "insideLeft", fontSize: 10 }} />
              <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 10 }} domain={[0, 10]} label={{ value: "% HE", angle: 90, position: "insideRight", fontSize: 10 }} />
              <RechartsTooltip />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Bar yAxisId="left" dataKey="Ferista dedicado" stackId="a" fill="#22c55e" />
              <Bar yAxisId="left" dataKey="Remanejo" stackId="a" fill="#3b82f6" />
              <Bar yAxisId="left" dataKey="Hora extra" stackId="a" fill="#ef4444" />
              <Line yAxisId="right" type="monotone" dataKey="% HE" stroke="#f59e0b" strokeWidth={2} dot={{ r: 3 }} />
              <ReferenceLine yAxisId="right" y={5} stroke="#22c55e" strokeDasharray="4 4" label={{ value: "Meta HE 5%", fontSize: 9, fill: "#22c55e", position: "right" }} />
            </ComposedChart>
          </ResponsiveContainer>
          <p className="text-[11px] text-muted-foreground mt-2">
            HE no período: <strong>{COMPOSICAO_COBERTURA.totais_periodo.pct_he_periodo}%</strong> · Sem cobertura: <strong>{COMPOSICAO_COBERTURA.totais_periodo.pct_sem_cobertura_periodo}%</strong> ({fmtNum(COMPOSICAO_COBERTURA.totais_periodo.ferias_sem_cobertura_total)} férias)
          </p>
        </Card>

        {/* ─────────── 2. DISCIPLINA DE PLANEJAMENTO ─────────── */}
        <Card title="2. Disciplina de Planejamento de Férias" subtitle="Estou programando com antecedência ou na correria? · REAL">
          <ResponsiveContainer width="100%" height={300}>
            <ComposedChart data={planejamentoData} margin={{ top: 10, right: 50, bottom: 5, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes" tick={{ fontSize: 10 }} />
              <YAxis yAxisId="left" tick={{ fontSize: 10 }} label={{ value: "Férias", angle: -90, position: "insideLeft", fontSize: 10 }} />
              <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 10 }} domain={[0, 70]} label={{ value: "% última hora", angle: 90, position: "insideRight", fontSize: 10 }} />
              <RechartsTooltip />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Bar yAxisId="left" dataKey="Antecipada (>30d)" stackId="a" fill="#22c55e" />
              <Bar yAxisId="left" dataKey="Razoável (16-30d)" stackId="a" fill="#84cc16" />
              <Bar yAxisId="left" dataKey="Apertada (8-15d)" stackId="a" fill="#f59e0b" />
              <Bar yAxisId="left" dataKey="Última hora (0-7d)" stackId="a" fill="#ef4444" />
              <Line yAxisId="right" type="monotone" dataKey="% Última hora" stroke="#7c3aed" strokeWidth={2} dot={{ r: 3 }} />
              <ReferenceLine yAxisId="right" y={PLANEJAMENTO.configuracao.meta_pct_ultima_hora} stroke="#22c55e" strokeDasharray="4 4" label={{ value: `Meta ${PLANEJAMENTO.configuracao.meta_pct_ultima_hora}%`, fontSize: 9, fill: "#22c55e", position: "right" }} />
            </ComposedChart>
          </ResponsiveContainer>
          <p className="text-[11px] text-muted-foreground mt-2">
            Última hora no período: <strong>{PLANEJAMENTO.totais_periodo.pct_ultima_hora_periodo}%</strong> · Antecedência média: <strong>{PLANEJAMENTO.totais_periodo.antecedencia_media_dias_periodo} dias</strong>
          </p>
        </Card>

        {/* ─────────── 3. PONTO BATIDO ─────────── */}
        <Card title="3. Ponto Batido em Férias" subtitle="Quanto passivo trabalhista estou gerando? · REAL">
          <ResponsiveContainer width="100%" height={300}>
            <ComposedChart data={pontoBatidoData} margin={{ top: 10, right: 50, bottom: 5, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes" tick={{ fontSize: 10 }} />
              <YAxis yAxisId="left" tick={{ fontSize: 10 }} label={{ value: "Férias afetadas", angle: -90, position: "insideLeft", fontSize: 10 }} />
              <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 10 }} domain={[0, 100]} label={{ value: "% afetado", angle: 90, position: "insideRight", fontSize: 10 }} />
              <RechartsTooltip />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Bar yAxisId="left" dataKey="Ponto batido" fill="#ef4444" />
              <Bar yAxisId="left" dataKey="Sem cobertura" fill="#f59e0b" />
              <Bar yAxisId="left" dataKey="Com HE relevante" fill="#a78bfa" />
              <Line yAxisId="right" type="monotone" dataKey="% Efetivo afetado" stroke="#dc2626" strokeWidth={2} dot={{ r: 3 }} />
              <ReferenceLine yAxisId="right" y={PONTO_BATIDO.configuracao.tolerancia_pct_efetivo_afetado} stroke="#22c55e" strokeDasharray="4 4" label={{ value: `Tolerância ${PONTO_BATIDO.configuracao.tolerancia_pct_efetivo_afetado}%`, fontSize: 9, fill: "#22c55e", position: "right" }} />
            </ComposedChart>
          </ResponsiveContainer>
          <p className="text-[11px] text-muted-foreground mt-2">
            <strong>{fmtNum(PONTO_BATIDO.totais_periodo.ponto_batido_ocorrencias_total)}</strong> ocorrências de batida em <strong>{fmtNum(PONTO_BATIDO.totais_periodo.ferias_com_ponto_batido_total)}</strong> férias ({PONTO_BATIDO.totais_periodo.pct_efetivo_afetado_periodo}% do efetivo afetado)
          </p>
        </Card>

        {/* Linha 4 + 8: Mapa lado a lado com Tendência do Score */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-3">
          {/* ─────────── 4. MAPA DE OPERAÇÕES ─────────── */}
          <Card title="4. Mapa de Operações em Férias" subtitle="Onde concentrar atenção? · REAL">
            <ResponsiveContainer width="100%" height={280}>
              <ScatterChart margin={{ top: 10, right: 30, bottom: 10, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" dataKey="headcount" name="Headcount" domain={[mapaDomain.xMin, mapaDomain.xMax]} tick={{ fontSize: 10 }} label={{ value: "Headcount", position: "insideBottom", offset: -5, fontSize: 10 }} />
                <YAxis type="number" dataKey="score_ferias" name="Score" domain={[0, 100]} tick={{ fontSize: 10 }} label={{ value: "Score Férias", angle: -90, position: "insideLeft", fontSize: 10 }} />
                <ZAxis range={[200, 200]} />
                <ReferenceLine y={MAPA_OPERACOES.limite_saudavel} stroke="#22c55e" strokeDasharray="4 4" label={{ value: "Saudável ≥70", fontSize: 9, fill: "#22c55e", position: "right" }} />
                <RechartsTooltip
                  content={({ active, payload }) => {
                    if (!active || !payload?.length) return null;
                    const d: any = payload[0].payload;
                    return (
                      <div className="bg-white border rounded-lg p-2.5 shadow-md text-xs space-y-1">
                        <p className="font-semibold">{d.nome_completo}</p>
                        <p>Headcount: <strong>{d.headcount}</strong></p>
                        <p>Score: <strong style={{ color: corSeveridade(d.severidade).hex }}>{d.score_ferias}</strong></p>
                      </div>
                    );
                  }}
                />
                <Scatter data={MAPA_OPERACOES.unidades}>
                  {MAPA_OPERACOES.unidades.map((u, i) => (
                    <Cell key={i} fill={corSeveridade(u.severidade).hex} />
                  ))}
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-4 text-[10px] mt-1">
              {MAPA_OPERACOES.unidades.map(u => (
                <span key={u.id} className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: corSeveridade(u.severidade).hex }} />
                  {u.id} · {u.score_ferias}
                </span>
              ))}
            </div>
          </Card>

          {/* ─────────── 8. TENDÊNCIA DO SCORE ─────────── */}
          <Card title="8. Tendência do Score (12m)" subtitle="Estou melhorando ou piorando? · MOCK">
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={tendenciaData} margin={{ top: 10, right: 30, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" tick={{ fontSize: 10 }} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 10 }} />
                <RechartsTooltip />
                <ReferenceLine y={70} stroke="#22c55e" strokeDasharray="4 4" label={{ value: "Saudável 70", fontSize: 9, fill: "#22c55e" }} />
                <Line type="monotone" dataKey="Score" stroke="#7c3aed" strokeWidth={2} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
            <div className="flex justify-around text-[11px] mt-1">
              <span>Atual: <strong>{TENDENCIA_SCORE.score_atual}</strong></span>
              <span>Anterior: <strong>{TENDENCIA_SCORE.score_anterior_12m}</strong></span>
              <span className={TENDENCIA_SCORE.delta_pp < 0 ? "text-red-600" : "text-green-600"}>
                Δ: <strong>{TENDENCIA_SCORE.delta_pp > 0 ? "+" : ""}{TENDENCIA_SCORE.delta_pp}pp</strong>
              </span>
            </div>
          </Card>
        </div>

        {/* ─────────── 5. LISTA NOMINAL DE CASOS EM RISCO ─────────── */}
        <Card title="5. Lista Nominal de Casos em Risco" subtitle={`Quais férias específicas precisam de atenção agora? · MOCK · ${CASOS_RISCO.total_em_risco} casos`}>
          <div className="flex gap-1 mb-3 flex-wrap">
            <button
              onClick={() => setTagFiltro(null)}
              className={`px-2 py-1 text-[10px] rounded-full border ${!tagFiltro ? "bg-foreground text-background border-foreground" : "bg-card border-border text-muted-foreground"}`}
            >
              Todos ({CASOS_RISCO.lista.length})
            </button>
            {Object.entries(tagRiscoLabel).map(([key, cfg]) => {
              const count = CASOS_RISCO.lista.filter(c => c.tags_risco.includes(key)).length;
              const ativo = tagFiltro === key;
              return (
                <button
                  key={key}
                  onClick={() => setTagFiltro(ativo ? null : key)}
                  className={`px-2 py-1 text-[10px] rounded-full border transition-all ${ativo ? cfg.color : "bg-card border-border text-muted-foreground"}`}
                >
                  {cfg.label} ({count})
                </button>
              );
            })}
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-border/50 text-left text-[10px] uppercase text-muted-foreground">
                  <th className="py-2 px-2">Colaborador</th>
                  <th className="py-2 px-2">Posto</th>
                  <th className="py-2 px-2">Período</th>
                  <th className="py-2 px-2">Dias</th>
                  <th className="py-2 px-2">Status</th>
                  <th className="py-2 px-2">Riscos</th>
                </tr>
              </thead>
              <tbody>
                {casosFiltrados.map(c => (
                  <tr key={c.id} className="border-b border-border/30 hover:bg-muted/40">
                    <td className="py-2 px-2 font-medium">{c.colaborador}</td>
                    <td className="py-2 px-2 text-muted-foreground">{c.posto}</td>
                    <td className="py-2 px-2 text-muted-foreground">{c.data_inicio} → {c.data_fim}</td>
                    <td className="py-2 px-2">{c.duracao_dias}</td>
                    <td className="py-2 px-2">
                      <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                        c.status === "em_curso" ? "bg-red-100 text-red-700" :
                        c.status === "iminente" ? "bg-orange-100 text-orange-700" :
                        "bg-blue-100 text-blue-700"
                      }`}>
                        {c.status === "em_curso" ? "Em curso" : c.status === "iminente" ? "Iminente" : "Futura"}
                      </span>
                    </td>
                    <td className="py-2 px-2">
                      <div className="flex gap-1 flex-wrap">
                        {c.tags_risco.map(t => (
                          <span key={t} className={`text-[9px] px-1.5 py-0.5 rounded border ${tagRiscoLabel[t]?.color || "bg-gray-100"}`}>
                            {tagRiscoLabel[t]?.label || t}
                          </span>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* ─────────── 6. HEATMAP DE POSTOS ─────────── */}
        <Card title="6. Heatmap de Postos por Mês" subtitle={`Quais postos têm problema crônico? · MOCK · ${HEATMAP_POSTOS.observacao}`}>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr>
                  <th className="text-left py-1 px-2 text-[10px] uppercase text-muted-foreground">Posto</th>
                  <th className="text-left py-1 px-2 text-[10px] uppercase text-muted-foreground">UN</th>
                  {HEATMAP_POSTOS.postos[0].celulas.map(c => (
                    <th key={c.mes} className="text-center py-1 px-1 text-[9px] text-muted-foreground">{fmtMes(c.mes)}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {HEATMAP_POSTOS.postos.map(p => (
                  <tr key={p.id} className="border-t border-border/30">
                    <td className="py-1 px-2 font-medium text-[11px]">{p.nome}</td>
                    <td className="py-1 px-2 text-[10px] text-muted-foreground">{p.unidade}</td>
                    {p.celulas.map(c => (
                      <td key={c.mes} className="py-1 px-1">
                        <div
                          className="w-8 h-8 rounded flex items-center justify-center mx-auto text-[9px] font-semibold"
                          style={{ backgroundColor: corSeveridade(c.intensidade).hex, color: "#fff", opacity: 0.85 }}
                          title={`${c.ferias_problema}/${c.ferias_total} férias com problema`}
                        >
                          {c.ferias_problema}/{c.ferias_total}
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex gap-3 text-[10px] mt-2 justify-center">
            {[
              { sev: "verde", label: "Sob controle" },
              { sev: "amarelo", label: "Alerta moderado" },
              { sev: "laranja", label: "Relevante" },
              { sev: "vermelho", label: "Crítico" },
            ].map(({ sev, label }) => (
              <span key={sev} className="flex items-center gap-1">
                <span className="w-3 h-3 rounded inline-block" style={{ backgroundColor: corSeveridade(sev).hex }} />
                {label}
              </span>
            ))}
          </div>
        </Card>

        {/* ─────────── 7. CUSTO DA COBERTURA ─────────── */}
        <Card title="7. Custo da Cobertura em R$" subtitle={`Quanto eu gasto pra cobrir férias? · MOCK · valores em milhares de R$`}>
          <ResponsiveContainer width="100%" height={300}>
            <ComposedChart data={custoData} margin={{ top: 10, right: 30, bottom: 5, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} label={{ value: "R$ mil", angle: -90, position: "insideLeft", fontSize: 10 }} />
              <RechartsTooltip formatter={(v: any) => fmtBRL(Number(v))} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Bar dataKey="Ferista dedicado" stackId="a" fill="#22c55e" />
              <Bar dataKey="Remanejo" stackId="a" fill="#3b82f6" />
              <Bar dataKey="HE" stackId="a" fill="#ef4444" />
              <Line type="monotone" dataKey="Custo ideal" stroke="#7c3aed" strokeWidth={2} strokeDasharray="4 4" dot={false} />
            </ComposedChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-3 gap-3 mt-3 text-[11px]">
            <div className="bg-muted/40 rounded p-2">
              <p className="text-muted-foreground text-[10px]">Custo total no período</p>
              <p className="font-bold text-base">{fmtBRL(CUSTO_COBERTURA.totais_periodo.custo_total_periodo)}</p>
            </div>
            <div className="bg-muted/40 rounded p-2">
              <p className="text-muted-foreground text-[10px]">Cenário 100% planejado</p>
              <p className="font-bold text-base">{fmtBRL(CUSTO_COBERTURA.totais_periodo.custo_ideal_100pct_planejado)}</p>
            </div>
            <div className="bg-green-50 border border-green-200 rounded p-2">
              <p className="text-green-700 text-[10px]">Economizável</p>
              <p className="font-bold text-base text-green-700">{fmtBRL(CUSTO_COBERTURA.totais_periodo.diferencial_economizavel)}</p>
            </div>
          </div>
          <p className="text-[10px] text-muted-foreground mt-2">
            Premissas: hora regular {`R$ ${CUSTO_COBERTURA.premissas.valor_hora_regular.toFixed(2)}`} · HE {`R$ ${CUSTO_COBERTURA.premissas.valor_hora_extra.toFixed(2)}`}.
            Adicional noturno e periculosidade não incluídos (estimativa conservadora).
          </p>
        </Card>

        {/* ─────────── 9. COMPARATIVO COMPONENTES POR UNIDADE ─────────── */}
        <Card title="9. Comparativo Componentes do Score por Unidade" subtitle="Onde focar esforço de melhoria por unidade? · MOCK">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {COMPARATIVO_UNIDADES.unidades.map(u => {
              const limites = COMPARATIVO_UNIDADES.configuracao.limites_saudaveis;
              const componentes = [
                { label: "HE em cobertura", valor: u.componentes.he_cobertura_pct, max: 10, limite: limites.he_cobertura_pct_maximo, sufixo: "%", invertido: true },
                { label: "Última hora", valor: u.componentes.ultima_hora_pct, max: 60, limite: limites.ultima_hora_pct_maximo, sufixo: "%", invertido: true },
                { label: "Ponto batido", valor: u.componentes.ponto_batido_pct, max: 100, limite: limites.ponto_batido_pct_maximo, sufixo: "%", invertido: true },
                { label: "Sem cobertura", valor: u.componentes.sem_cobertura_pct, max: 50, limite: limites.sem_cobertura_pct_maximo, sufixo: "%", invertido: true },
                { label: "Antecedência", valor: u.componentes.antecedencia_dias, max: 35, limite: limites.antecedencia_dias_minimo, sufixo: "d", invertido: false },
              ];
              const sev = u.score_geral >= 70 ? "verde" : u.score_geral >= 50 ? "laranja" : "vermelho";
              return (
                <div key={u.id} className={`border rounded-lg p-3 ${corSeveridade(sev).border}`}>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs font-semibold">{u.nome_completo}</p>
                    <span className="text-base font-bold" style={{ color: corSeveridade(sev).hex }}>{u.score_geral}</span>
                  </div>
                  <div className="space-y-2">
                    {componentes.map(c => {
                      const pct = (c.valor / c.max) * 100;
                      const ruim = c.invertido ? c.valor > c.limite : c.valor < c.limite;
                      return (
                        <div key={c.label}>
                          <div className="flex items-center justify-between text-[10px]">
                            <span className="text-muted-foreground">{c.label}</span>
                            <span className={`font-medium ${ruim ? "text-red-600" : "text-green-600"}`}>
                              {c.valor}{c.sufixo}
                            </span>
                          </div>
                          <div className="h-1.5 bg-muted/50 rounded-full overflow-hidden mt-0.5">
                            <div className="h-full rounded-full" style={{ width: `${Math.min(pct, 100)}%`, backgroundColor: ruim ? "#ef4444" : "#22c55e" }} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* ─────────── 10. HALL DA GLÓRIA / VERGONHA ─────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Card title="10a. Hall da Glória" subtitle="Top 5 postos modelo a estudar e replicar · MOCK" className="border-green-200">
            <div className="space-y-2">
              {HALL_GLORIA_VERGONHA.hall_da_gloria.map(item => (
                <div key={item.posicao} className="flex items-start gap-3 p-2 bg-green-50 border border-green-100 rounded">
                  <span className="text-lg font-bold text-green-700 w-6 text-center">{item.posicao}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-semibold">{item.posto_nome}</p>
                      <span className="text-xs font-bold text-green-700">{item.score}</span>
                    </div>
                    <p className="text-[10px] text-muted-foreground">{item.unidade} · {item.ferias_periodo} férias</p>
                    <p className="text-[10px] text-green-700 mt-0.5">{item.virtude_principal}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card title="10b. Hall da Vergonha" subtitle="Top 5 postos a auditar imediatamente · MOCK" className="border-red-200">
            <div className="space-y-2">
              {HALL_GLORIA_VERGONHA.hall_da_vergonha.map(item => (
                <div key={item.posicao} className="flex items-start gap-3 p-2 bg-red-50 border border-red-100 rounded">
                  <span className="text-lg font-bold text-red-700 w-6 text-center">{item.posicao}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-semibold">{item.posto_nome}</p>
                      <span className="text-xs font-bold text-red-700">{item.score}</span>
                    </div>
                    <p className="text-[10px] text-muted-foreground">{item.unidade} · {item.ferias_periodo} férias</p>
                    <p className="text-[10px] text-red-700 mt-0.5">{item.problema_principal}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <p className="text-[10px] text-muted-foreground text-center pt-4 pb-2">
          Spec V2 · Dados REAL: big numbers + elementos 1-4 · Dados MOCK: elementos 5-10
        </p>
      </div>
    </div>
  );
}
