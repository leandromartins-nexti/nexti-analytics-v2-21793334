import {
  ResponsiveContainer, AreaChart, Area, LineChart, Line, BarChart, Bar, Cell,
  ReferenceArea, ReferenceLine,
} from "recharts";
import { getLineColor, getScoreColor, getScoreBg } from "@/components/analytics/IndicatorTable";

interface EvoPoint { competencia: string; valor: number; }
interface CardData {
  label: string;
  evolucao: EvoPoint[];
  score: number;
  variacao: string;
  corVariacao: string;
  perPointColors?: boolean;
}

interface Props { cards: CardData[]; }

// ── Helpers ───────────────────────────────────────────────────
function lastNAvg(evo: EvoPoint[], n = 3) {
  const last = evo.slice(-n);
  if (!last.length) return 0;
  return Math.round(last.reduce((s, p) => s + p.valor, 0) / last.length);
}

// ── Variants — cada uma renderiza UMA cell de "Histórico 12m" ──
const VARIANTS: {
  id: number;
  nome: string;
  descricao: string;
  render: (card: CardData, idPrefix: string) => JSX.Element;
}[] = [
  // 1 — Linha + bracket inferior nos últimos 3 meses + label score à direita
  {
    id: 1,
    nome: "Linha + bracket inferior",
    descricao: "Sparkline simples com colchete embaixo dos 3 últimos e label do score ao lado",
    render: (card, p) => {
      const score = lastNAvg(card.evolucao);
      const color = getLineColor(score);
      const widthPct = (3 / card.evolucao.length) * 100;
      return (
        <div className="flex items-center gap-2 h-[36px]">
          <div className="flex-1 h-full relative">
            <ResponsiveContainer width="100%" height={36}>
              <LineChart data={card.evolucao} margin={{ top: 2, right: 0, bottom: 6, left: 0 }}>
                <Line type="monotone" dataKey="valor" stroke={getLineColor(card.score)} strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
            <div
              className="absolute bottom-0 border-b-2 border-l-2 border-r-2 rounded-b-sm pointer-events-none"
              style={{ right: 0, width: `${widthPct}%`, height: 6, borderColor: color }}
            />
          </div>
          <span className="text-[11px] font-bold px-2 py-0.5 rounded text-white shadow-sm" style={{ backgroundColor: color }}>
            {score}
          </span>
        </div>
      );
    },
  },
  // 2 — ReferenceArea do recharts + ponto grande no final
  {
    id: 2,
    nome: "ReferenceArea (sombra cinza)",
    descricao: "Área cinza neutra cobrindo os 3 meses, sem distrair da linha",
    render: (card, p) => {
      const score = lastNAvg(card.evolucao);
      const color = getLineColor(score);
      const startMonth = card.evolucao[card.evolucao.length - 3]?.competencia;
      const endMonth = card.evolucao[card.evolucao.length - 1]?.competencia;
      return (
        <div className="h-[36px] relative">
          <ResponsiveContainer width="100%" height={36}>
            <LineChart data={card.evolucao} margin={{ top: 2, right: 0, bottom: 0, left: 0 }}>
              <ReferenceArea x1={startMonth} x2={endMonth} fill="#64748b" fillOpacity={0.12} />
              <Line type="monotone" dataKey="valor" stroke={getLineColor(card.score)} strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
          <span
            className="absolute top-0 text-[10px] font-bold px-1.5 rounded text-white"
            style={{ right: `${(1.5 / card.evolucao.length) * 100}%`, transform: 'translateX(50%)', backgroundColor: color }}
          >
            {score}
          </span>
        </div>
      );
    },
  },
  // 3 — Barras: 9 cinzas + 3 coloridas (highlight por cor, não por box)
  {
    id: 3,
    nome: "Barras destacadas por cor",
    descricao: "9 meses cinza claro + 3 meses coloridos pelo score",
    render: (card, p) => {
      const score = lastNAvg(card.evolucao);
      const color = getLineColor(score);
      return (
        <div className="flex items-center gap-2 h-[36px]">
          <div className="flex-1 h-full">
            <ResponsiveContainer width="100%" height={36}>
              <BarChart data={card.evolucao} barGap={1}>
                <Bar dataKey="valor" radius={[2, 2, 0, 0]}>
                  {card.evolucao.map((pt, i) => {
                    const isLast3 = i >= card.evolucao.length - 3;
                    return <Cell key={i} fill={isLast3 ? color : "#cbd5e1"} />;
                  })}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <span className="text-[11px] font-bold px-2 py-0.5 rounded" style={{ backgroundColor: `${color}20`, color }}>
            {score}
          </span>
        </div>
      );
    },
  },
  // 4 — Sparkline + "card de score" ao lado direito (separado, fora do gráfico)
  {
    id: 4,
    nome: "Sparkline + card lateral",
    descricao: "Gráfico full + cartão do score colado à direita (sem overlay)",
    render: (card, p) => {
      const score = lastNAvg(card.evolucao);
      const color = getLineColor(score);
      const gradId = `${p}-grad-4`;
      return (
        <div className="flex items-stretch gap-2 h-[36px]">
          <div className="flex-1 h-full">
            <ResponsiveContainer width="100%" height={36}>
              <AreaChart data={card.evolucao}>
                <defs>
                  <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="0">
                    {card.evolucao.map((pt, i) => {
                      const pct = (i / (card.evolucao.length - 1)) * 100;
                      return <stop key={i} offset={`${pct}%`} stopColor={getLineColor(pt.valor)} stopOpacity={0.4} />;
                    })}
                  </linearGradient>
                </defs>
                <Area type="monotone" dataKey="valor" stroke={getLineColor(card.score)} strokeWidth={2} fill={`url(#${gradId})`} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div
            className="flex flex-col items-center justify-center px-2 rounded border-2"
            style={{ borderColor: color, backgroundColor: `${color}10`, minWidth: 42 }}
          >
            <span className="text-[7px] font-medium uppercase leading-none" style={{ color }}>3M</span>
            <span className="text-[12px] font-bold leading-tight" style={{ color }}>{score}</span>
          </div>
        </div>
      );
    },
  },
  // 5 — Heatmap 12 quadrados, últimos 3 com borda + "etiqueta" do score sobre eles
  {
    id: 5,
    nome: "Heatmap com borda nos 3",
    descricao: "12 quadrados pontuados; últimos 3 ganham contorno e etiqueta",
    render: (card, p) => {
      const score = lastNAvg(card.evolucao);
      const color = getLineColor(score);
      return (
        <div className="relative h-[36px] flex items-center">
          <div className="flex items-center gap-[2px] w-full h-[20px]">
            {card.evolucao.map((pt, i) => {
              const isLast3 = i >= card.evolucao.length - 3;
              return (
                <div
                  key={i}
                  className="flex-1 h-full rounded-[2px]"
                  style={{
                    backgroundColor: getLineColor(pt.valor),
                    opacity: isLast3 ? 1 : 0.45,
                    outline: isLast3 ? `1.5px solid ${color}` : "none",
                    outlineOffset: isLast3 ? -1 : 0,
                  }}
                  title={`${pt.competencia}: ${pt.valor}`}
                />
              );
            })}
          </div>
          <span
            className="absolute -top-[2px] text-[10px] font-bold px-1.5 py-[1px] rounded text-white shadow-sm"
            style={{ right: `${(1.5 / card.evolucao.length) * 100}%`, transform: 'translateX(50%)', backgroundColor: color }}
          >
            {score}
          </span>
        </div>
      );
    },
  },
  // 6 — Linha cinza + sobreposição colorida apenas nos últimos 3 + dot no último
  {
    id: 6,
    nome: "Linha dupla (passado vs atual)",
    descricao: "Histórico cinza + segmento colorido nos 3 meses recentes",
    render: (card, p) => {
      const score = lastNAvg(card.evolucao);
      const color = getLineColor(score);
      const dataLast3 = card.evolucao.map((pt, i) => ({
        ...pt,
        valorRecente: i >= card.evolucao.length - 3 ? pt.valor : null,
      }));
      return (
        <div className="flex items-center gap-2 h-[36px]">
          <div className="flex-1 h-full">
            <ResponsiveContainer width="100%" height={36}>
              <LineChart data={dataLast3} margin={{ top: 2, right: 2, bottom: 0, left: 0 }}>
                <Line type="monotone" dataKey="valor" stroke="#cbd5e1" strokeWidth={1.5} dot={false} />
                <Line
                  type="monotone"
                  dataKey="valorRecente"
                  stroke={color}
                  strokeWidth={2.5}
                  dot={(props: any) => {
                    if (props.value == null) return <g key={props.index} />;
                    const isLast = props.index === card.evolucao.length - 1;
                    return <circle key={props.index} cx={props.cx} cy={props.cy} r={isLast ? 4 : 2.5} fill={color} stroke="white" strokeWidth={1.5} />;
                  }}
                  connectNulls={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <span className="text-[11px] font-bold px-2 py-0.5 rounded text-white" style={{ backgroundColor: color }}>
            {score}
          </span>
        </div>
      );
    },
  },
  // 7 — Pílulas mensais (12 círculos coloridos), último maior com score dentro
  {
    id: 7,
    nome: "Círculos mensais",
    descricao: "12 círculos pequenos; o último é grande e mostra o score",
    render: (card, p) => {
      const score = lastNAvg(card.evolucao);
      const color = getLineColor(score);
      return (
        <div className="flex items-center gap-1 h-[36px]">
          {card.evolucao.map((pt, i) => {
            const isLast3 = i >= card.evolucao.length - 3;
            const isLast = i === card.evolucao.length - 1;
            if (isLast) {
              return (
                <div
                  key={i}
                  className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold text-white shadow-sm shrink-0 ml-0.5"
                  style={{ backgroundColor: color }}
                  title={`Score 3M: ${score}`}
                >
                  {score}
                </div>
              );
            }
            return (
              <div
                key={i}
                className="flex-1 rounded-full"
                style={{
                  height: isLast3 ? 12 : 6,
                  backgroundColor: getLineColor(pt.valor),
                  opacity: isLast3 ? 0.9 : 0.4,
                }}
                title={`${pt.competencia}: ${pt.valor}`}
              />
            );
          })}
        </div>
      );
    },
  },
  // 8 — Área completa + linha vertical separadora aos -3 + score à direita
  {
    id: 8,
    nome: "Linha divisória + score",
    descricao: "Área cheia com divisor vertical pontilhado marcando o início dos 3 meses",
    render: (card, p) => {
      const score = lastNAvg(card.evolucao);
      const color = getLineColor(score);
      const gradId = `${p}-grad-8`;
      const dividerMonth = card.evolucao[card.evolucao.length - 3]?.competencia;
      return (
        <div className="flex items-center gap-2 h-[36px]">
          <div className="flex-1 h-full">
            <ResponsiveContainer width="100%" height={36}>
              <AreaChart data={card.evolucao}>
                <defs>
                  <linearGradient id={gradId} x1="0" y1="1" x2="0" y2="0">
                    <stop offset="0%" stopColor={color} stopOpacity={0.05} />
                    <stop offset="100%" stopColor={color} stopOpacity={0.4} />
                  </linearGradient>
                </defs>
                <ReferenceLine x={dividerMonth} stroke="#64748b" strokeDasharray="2 2" strokeWidth={1} />
                <Area type="monotone" dataKey="valor" stroke={color} strokeWidth={2} fill={`url(#${gradId})`} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-col items-end leading-none">
            <span className="text-[7px] uppercase text-muted-foreground">3M</span>
            <span className="text-[14px] font-bold" style={{ color }}>{score}</span>
          </div>
        </div>
      );
    },
  },
  // 9 — "Lupa" — área inteira em cinza, últimos 3 meses ampliados em destaque colorido
  {
    id: 9,
    nome: "Foco com glow",
    descricao: "Histórico cinza + retângulo dos 3 meses com sombra/glow + score flutuante",
    render: (card, p) => {
      const score = lastNAvg(card.evolucao);
      const color = getLineColor(score);
      const widthPct = (3 / card.evolucao.length) * 100;
      return (
        <div className="relative h-[36px]">
          <ResponsiveContainer width="100%" height={36}>
            <AreaChart data={card.evolucao}>
              <Area type="monotone" dataKey="valor" stroke="#94a3b8" strokeWidth={1.5} fill="#cbd5e1" fillOpacity={0.3} />
            </AreaChart>
          </ResponsiveContainer>
          <div
            className="absolute top-0 bottom-0 rounded pointer-events-none"
            style={{
              right: 0,
              width: `${widthPct}%`,
              backgroundColor: `${color}25`,
              boxShadow: `0 0 0 1.5px ${color}, 0 0 8px ${color}55`,
            }}
          />
          <div
            className="absolute top-1/2 -translate-y-1/2 px-1.5 py-0.5 rounded text-white text-[11px] font-bold shadow-md"
            style={{ right: `${widthPct / 2}%`, transform: 'translate(50%, -50%)', backgroundColor: color }}
          >
            {score}
          </div>
        </div>
      );
    },
  },
  // 10 — Tabela com 12 mini-quadrados + score em "tag" estilo nota fiscal
  {
    id: 10,
    nome: "Mini-quadrados + tag",
    descricao: "12 quadrados sólidos coloridos; tag à direita com score grande",
    render: (card, p) => {
      const score = lastNAvg(card.evolucao);
      const color = getLineColor(score);
      return (
        <div className="flex items-center gap-2 h-[36px]">
          <div className="flex items-center gap-[3px] flex-1 h-[18px]">
            {card.evolucao.map((pt, i) => {
              const isLast3 = i >= card.evolucao.length - 3;
              return (
                <div
                  key={i}
                  className="flex-1 h-full rounded-sm"
                  style={{
                    backgroundColor: getLineColor(pt.valor),
                    opacity: isLast3 ? 1 : 0.35,
                    transform: isLast3 ? 'scaleY(1.4)' : 'scaleY(1)',
                  }}
                  title={`${pt.competencia}: ${pt.valor}`}
                />
              );
            })}
          </div>
          <div
            className="flex items-center gap-1 px-2 py-0.5 rounded-full"
            style={{ backgroundColor: `${color}18`, border: `1px solid ${color}` }}
          >
            <span className="text-[8px] uppercase font-medium" style={{ color }}>Score</span>
            <span className="text-[12px] font-bold" style={{ color }}>{score}</span>
          </div>
        </div>
      );
    },
  },
];

export default function IndicatorTableVariants({ cards }: Props) {
  return (
    <div className="space-y-4 mt-4">
      <div className="px-2">
        <p className="text-xs font-semibold text-foreground">🧪 10 variações da tabela de indicadores</p>
        <p className="text-[10px] text-muted-foreground mt-0.5">
          Cada tabela completa replica os 2 indicadores destacando os últimos 3 meses (que compõem o score) de forma diferente
        </p>
      </div>

      {VARIANTS.map((v) => (
        <div key={v.id} className="bg-card border border-border/50 rounded-xl">
          {/* Variant header */}
          <div className="flex items-center justify-between gap-3 px-4 py-2 border-b border-border/40 bg-muted/20 rounded-t-xl">
            <div className="flex items-center gap-2 min-w-0">
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-foreground/10 text-foreground">#{v.id}</span>
              <span className="text-sm font-semibold text-foreground">{v.nome}</span>
            </div>
            <span className="text-[10px] text-muted-foreground italic truncate">{v.descricao}</span>
          </div>

          {/* Header row */}
          <div className="flex items-center gap-4 px-4 py-2 border-b border-border/40 text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
            <div className="w-2" />
            <span className="min-w-[140px]">Indicador</span>
            <div className="flex-1 min-w-[120px] text-center">Histórico 12m</div>
            <span className="min-w-[65px] text-center">Variação</span>
            <span className="min-w-[45px] text-center">Score</span>
          </div>

          {/* Data rows */}
          <div className="divide-y divide-border/40">
            {cards.map((card) => (
              <div key={card.label} className="flex items-center gap-4 px-4 py-2.5 hover:bg-muted/30 transition-colors">
                <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: getLineColor(card.score) }} />
                <span className="text-sm font-medium text-foreground min-w-[140px] truncate">{card.label}</span>
                <div className="flex-1 min-w-[120px]">
                  {v.render(card, `v${v.id}-${card.label.replace(/\s/g, '')}`)}
                </div>
                <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full min-w-[65px] text-center ${card.corVariacao} ${
                  card.corVariacao.includes('green') ? 'bg-green-50' : card.corVariacao.includes('red') ? 'bg-red-50' : 'bg-gray-50'
                }`}>{card.variacao}</span>
                <span className={`text-xs font-bold min-w-[45px] text-center px-1.5 py-0.5 rounded ${getScoreColor(card.score)} ${getScoreBg(card.score)}`}>{card.score}</span>
              </div>
            ))}
          </div>

          {/* Month legend */}
          {cards[0]?.evolucao.length > 0 && (
            <div className="flex items-center gap-4 px-4 py-1.5 border-t border-border/40">
              <div className="w-2" />
              <span className="min-w-[140px]" />
              <div className="flex-1 min-w-[120px] flex justify-between">
                {cards[0].evolucao.map((pt) => (
                  <span key={pt.competencia} className="text-[9px] text-muted-foreground">{pt.competencia.replace('/20', '/')}</span>
                ))}
              </div>
              <span className="min-w-[65px]" />
              <span className="min-w-[45px]" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
