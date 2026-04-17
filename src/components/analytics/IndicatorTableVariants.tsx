import {
  ResponsiveContainer, AreaChart, Area, Tooltip as RechartsTooltip,
} from "recharts";
import { getLineColor } from "@/components/analytics/IndicatorTable";

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

// ── Sparkline base (idêntico em todas as variantes) ──────────
function Sparkline({ card, gradId }: { card: CardData; gradId: string }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={card.evolucao} margin={{ top: 4, right: 0, bottom: 0, left: 0 }}>
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="0">
            {card.evolucao.map((pt, i) => {
              const pct = card.evolucao.length > 1 ? (i / (card.evolucao.length - 1)) * 100 : 0;
              return <stop key={i} offset={`${pct}%`} stopColor={getLineColor(pt.valor)} stopOpacity={0.45} />;
            })}
          </linearGradient>
          <linearGradient id={`${gradId}-stroke`} x1="0" y1="0" x2="1" y2="0">
            {card.evolucao.map((pt, i) => {
              const pct = card.evolucao.length > 1 ? (i / (card.evolucao.length - 1)) * 100 : 0;
              return <stop key={i} offset={`${pct}%`} stopColor={getLineColor(pt.valor)} />;
            })}
          </linearGradient>
        </defs>
        <Area type="monotone" dataKey="valor" stroke={`url(#${gradId}-stroke)`} strokeWidth={2} fill={`url(#${gradId})`} />
      </AreaChart>
    </ResponsiveContainer>
  );
}

// ── Marcadores (apenas o overlay sobre os 3 últimos meses muda) ──
const MARKERS: {
  id: number;
  nome: string;
  descricao: string;
  rowHeight: number;
  render: (card: CardData) => JSX.Element;
}[] = [
  // 1 — Bracket superior estilo "chave" + score em pílula central
  {
    id: 1,
    nome: "Bracket superior tipo chave",
    descricao: "Colchete fino curvado em cima dos 3 meses, score em pílula no meio",
    rowHeight: 56,
    render: (card) => {
      const color = getLineColor(card.score);
      const widthPct = (3 / card.evolucao.length) * 100;
      return (
        <div className="absolute top-0 pointer-events-none" style={{ right: 0, width: `${widthPct}%`, height: 18 }}>
          <svg viewBox="0 0 100 18" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
            <path d={`M 2 16 Q 2 2, 12 2 L 42 2 M 58 2 L 88 2 Q 98 2, 98 16`} stroke={color} strokeWidth="1.5" fill="none" />
          </svg>
          <div className="absolute left-1/2 top-0 -translate-x-1/2 flex items-center gap-1 px-2 py-0.5 rounded-full text-white text-[11px] font-bold shadow-sm" style={{ backgroundColor: color }}>
            {card.score}
          </div>
        </div>
      );
    },
  },
  // 2 — Linha vertical pontilhada nas bordas + label "SCORE 3M = 90" centralizada acima
  {
    id: 2,
    nome: "Delimitadores verticais + etiqueta",
    descricao: "Duas linhas verticais finas marcam o início/fim e label flutua acima",
    rowHeight: 56,
    render: (card) => {
      const color = getLineColor(card.score);
      const widthPct = (3 / card.evolucao.length) * 100;
      return (
        <>
          <div className="absolute top-2 bottom-0 border-l-[1.5px] border-dashed pointer-events-none" style={{ left: `${100 - widthPct}%`, borderColor: color }} />
          <div className="absolute top-2 bottom-0 border-l-[1.5px] border-dashed pointer-events-none" style={{ right: 0, borderColor: color }} />
          <div className="absolute top-0 pointer-events-none flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-semibold shadow-sm" style={{ right: `${widthPct / 2}%`, transform: 'translateX(50%)', backgroundColor: 'white', color, border: `1px solid ${color}` }}>
            <span className="text-[8px] uppercase opacity-70">Score 3M</span>
            <span className="font-bold">{card.score}</span>
          </div>
        </>
      );
    },
  },
  // 3 — Faixa colorida translúcida + bandeira/tag triangular acima
  {
    id: 3,
    nome: "Faixa + bandeira",
    descricao: "Faixa translúcida cobrindo os 3 meses + tag de bandeira no topo",
    rowHeight: 56,
    render: (card) => {
      const color = getLineColor(card.score);
      const widthPct = (3 / card.evolucao.length) * 100;
      return (
        <>
          <div className="absolute top-3 bottom-0 pointer-events-none" style={{ right: 0, width: `${widthPct}%`, backgroundColor: `${color}1A`, borderTop: `2px solid ${color}` }} />
          <div className="absolute top-0 pointer-events-none flex flex-col items-center" style={{ right: `${widthPct / 2}%`, transform: 'translateX(50%)' }}>
            <div className="px-2 py-0.5 text-white text-[11px] font-bold" style={{ backgroundColor: color, clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 75%, 0 100%)', paddingBottom: 6 }}>
              {card.score}
            </div>
          </div>
        </>
      );
    },
  },
  // 4 — Anel/oval grande circundando os 3 meses (estilo "destacador de marcador")
  {
    id: 4,
    nome: "Marcador estilo highlighter",
    descricao: "Oval pintado com aparência de marca-texto sobre os 3 meses",
    rowHeight: 56,
    render: (card) => {
      const color = getLineColor(card.score);
      const widthPct = (3 / card.evolucao.length) * 100;
      return (
        <>
          <div
            className="absolute pointer-events-none"
            style={{
              right: `-2px`, top: 6, bottom: -2, width: `calc(${widthPct}% + 4px)`,
              backgroundColor: `${color}30`,
              borderRadius: '40% 60% 50% 50% / 50% 40% 60% 50%',
              transform: 'rotate(-0.8deg)',
              boxShadow: `inset 0 -3px 0 ${color}40`,
            }}
          />
          <div className="absolute -top-1 pointer-events-none px-2 py-0.5 rounded-full text-[11px] font-bold text-white shadow" style={{ right: `${widthPct / 2}%`, transform: 'translateX(50%)', backgroundColor: color }}>
            {card.score}
          </div>
        </>
      );
    },
  },
  // 5 — Régua superior com ticks dos 3 meses + balão "score" suspenso
  {
    id: 5,
    nome: "Régua + balão suspenso",
    descricao: "Régua medidora acima dos 3 meses com balão/tooltip do score",
    rowHeight: 60,
    render: (card) => {
      const color = getLineColor(card.score);
      const widthPct = (3 / card.evolucao.length) * 100;
      return (
        <>
          <div className="absolute pointer-events-none" style={{ right: 0, top: 12, width: `${widthPct}%`, height: 6 }}>
            <div className="w-full h-[2px] mt-[2px]" style={{ backgroundColor: color }} />
            <div className="absolute left-0 top-0 w-[2px] h-full" style={{ backgroundColor: color }} />
            <div className="absolute right-0 top-0 w-[2px] h-full" style={{ backgroundColor: color }} />
            <div className="absolute left-1/2 top-0 w-[1px] h-1/2 -translate-x-1/2" style={{ backgroundColor: color }} />
          </div>
          <div className="absolute pointer-events-none" style={{ right: `${widthPct / 2}%`, transform: 'translateX(50%)', top: 0 }}>
            <div className="relative px-2 py-0.5 rounded text-white text-[11px] font-bold shadow-md" style={{ backgroundColor: color }}>
              {card.score}
              <div className="absolute left-1/2 -bottom-1 -translate-x-1/2 w-0 h-0" style={{ borderLeft: '4px solid transparent', borderRight: '4px solid transparent', borderTop: `4px solid ${color}` }} />
            </div>
          </div>
        </>
      );
    },
  },
  // 6 — Lupa: anel circular grande sobre o ponto médio dos 3 meses
  {
    id: 6,
    nome: "Lupa de foco",
    descricao: "Círculo tipo lupa centralizado nos 3 meses com score dentro",
    rowHeight: 60,
    render: (card) => {
      const color = getLineColor(card.score);
      const widthPct = (3 / card.evolucao.length) * 100;
      return (
        <>
          <div className="absolute top-0 bottom-0 pointer-events-none" style={{ right: 0, width: `${widthPct}%`, background: `linear-gradient(180deg, ${color}10 0%, transparent 100%)` }} />
          <div
            className="absolute pointer-events-none flex items-center justify-center rounded-full bg-white shadow-md"
            style={{
              right: `${widthPct / 2}%`,
              transform: 'translateX(50%)',
              top: -2,
              width: 32, height: 32,
              border: `2.5px solid ${color}`,
            }}
          >
            <span className="text-[12px] font-bold" style={{ color }}>{card.score}</span>
          </div>
        </>
      );
    },
  },
  // 7 — Barra horizontal flutuante acima com texto "ÚLTIMOS 3M · 90"
  {
    id: 7,
    nome: "Barra flutuante com contexto",
    descricao: "Pílula informativa explícita acima dos 3 meses",
    rowHeight: 56,
    render: (card) => {
      const color = getLineColor(card.score);
      const widthPct = (3 / card.evolucao.length) * 100;
      return (
        <>
          <div
            className="absolute top-0 pointer-events-none flex items-center justify-center gap-1.5 rounded-full text-[10px] font-medium shadow-sm"
            style={{
              right: 0,
              width: `${widthPct}%`,
              height: 18,
              backgroundColor: 'white',
              border: `1.5px solid ${color}`,
              color,
            }}
          >
            <span className="text-[8px] uppercase opacity-70 tracking-wider">3M</span>
            <span className="font-bold text-[12px]">{card.score}</span>
          </div>
          <div className="absolute pointer-events-none" style={{ right: 0, width: `${widthPct}%`, top: 18, borderLeft: `1px dashed ${color}80`, borderRight: `1px dashed ${color}80`, height: 'calc(100% - 18px)' }} />
        </>
      );
    },
  },
  // 8 — Underline grosso (estilo marca-texto inferior) com score logo abaixo
  {
    id: 8,
    nome: "Underline marca-texto",
    descricao: "Linha grossa colorida embaixo dos 3 meses + score abaixo",
    rowHeight: 60,
    render: (card) => {
      const color = getLineColor(card.score);
      const widthPct = (3 / card.evolucao.length) * 100;
      return (
        <>
          <div className="absolute pointer-events-none" style={{ right: 0, width: `${widthPct}%`, bottom: 14, height: 4, backgroundColor: color, borderRadius: 2, opacity: 0.85 }} />
          <div className="absolute pointer-events-none flex items-center justify-center gap-1" style={{ right: `${widthPct / 2}%`, transform: 'translateX(50%)', bottom: 0 }}>
            <span className="text-[8px] uppercase text-muted-foreground">Score 3M</span>
            <span className="text-[12px] font-bold leading-none" style={{ color }}>{card.score}</span>
          </div>
        </>
      );
    },
  },
  // 9 — Cantos chanfrados (canto superior + canto inferior esquerdo) emolduram a região
  {
    id: 9,
    nome: "Cantos emolduradores",
    descricao: "4 cantos em L emolduram os 3 meses (estilo viewfinder de câmera)",
    rowHeight: 56,
    render: (card) => {
      const color = getLineColor(card.score);
      const widthPct = (3 / card.evolucao.length) * 100;
      const corner = "absolute pointer-events-none";
      const cornerSize = 8;
      return (
        <>
          {/* 4 cantos em L */}
          <div className={corner} style={{ right: `calc(${widthPct}% - 1px)`, top: 4, width: cornerSize, height: cornerSize, borderTop: `2px solid ${color}`, borderLeft: `2px solid ${color}` }} />
          <div className={corner} style={{ right: 0, top: 4, width: cornerSize, height: cornerSize, borderTop: `2px solid ${color}`, borderRight: `2px solid ${color}` }} />
          <div className={corner} style={{ right: `calc(${widthPct}% - 1px)`, bottom: 0, width: cornerSize, height: cornerSize, borderBottom: `2px solid ${color}`, borderLeft: `2px solid ${color}` }} />
          <div className={corner} style={{ right: 0, bottom: 0, width: cornerSize, height: cornerSize, borderBottom: `2px solid ${color}`, borderRight: `2px solid ${color}` }} />
          {/* Score */}
          <div className="absolute -top-1 pointer-events-none px-1.5 py-0.5 rounded text-[11px] font-bold text-white shadow" style={{ right: `${widthPct / 2}%`, transform: 'translateX(50%)', backgroundColor: color }}>
            {card.score}
          </div>
        </>
      );
    },
  },
  // 10 — Gradiente "spotlight" radial + número grande translúcido como marca d'água
  {
    id: 10,
    nome: "Spotlight + marca d'água",
    descricao: "Iluminação radial sutil nos 3 meses e número do score como watermark",
    rowHeight: 56,
    render: (card) => {
      const color = getLineColor(card.score);
      const widthPct = (3 / card.evolucao.length) * 100;
      return (
        <>
          <div
            className="absolute top-0 bottom-0 pointer-events-none"
            style={{
              right: 0,
              width: `${widthPct}%`,
              background: `radial-gradient(ellipse at center, ${color}22 0%, ${color}08 60%, transparent 100%)`,
            }}
          />
          {/* Watermark number */}
          <div
            className="absolute pointer-events-none flex items-center justify-center font-black leading-none select-none"
            style={{
              right: `${widthPct / 2}%`,
              transform: 'translateX(50%)',
              top: 4,
              fontSize: 28,
              color,
              opacity: 0.18,
            }}
          >
            {card.score}
          </div>
          {/* Crisp small label */}
          <div
            className="absolute pointer-events-none px-1.5 py-[1px] rounded text-[10px] font-bold text-white shadow"
            style={{ right: `${widthPct / 2}%`, transform: 'translateX(50%)', bottom: 2, backgroundColor: color }}
          >
            {card.score}
          </div>
        </>
      );
    },
  },
];

export default function IndicatorTableVariants({ cards }: Props) {
  return (
    <div className="space-y-4 mt-4">
      <div className="px-2">
        <p className="text-xs font-semibold text-foreground">🧪 10 marcadores diferentes para os últimos 3 meses</p>
        <p className="text-[10px] text-muted-foreground mt-0.5">
          Mesmo sparkline em todas — apenas a forma de destacar a janela do score (3M) varia
        </p>
      </div>

      {MARKERS.map((v) => (
        <div key={v.id} className="bg-card border border-border/50 rounded-xl">
          {/* Header da variante */}
          <div className="flex items-center justify-between gap-3 px-4 py-2 border-b border-border/40 bg-muted/20 rounded-t-xl">
            <div className="flex items-center gap-2 min-w-0">
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-foreground/10 text-foreground">#{v.id}</span>
              <span className="text-sm font-semibold text-foreground">{v.nome}</span>
            </div>
            <span className="text-[10px] text-muted-foreground italic truncate">{v.descricao}</span>
          </div>

          {/* Header da tabela */}
          <div className="flex items-center gap-4 px-4 py-2 border-b border-border/40 text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
            <div className="w-2" />
            <span className="min-w-[140px]">Indicador</span>
            <div className="flex-1 min-w-[120px] text-center">Histórico 12m</div>
          </div>

          {/* Linhas de dados */}
          <div className="divide-y divide-border/40">
            {cards.map((card) => {
              const gradId = `var${v.id}-${card.label.replace(/\s/g, '')}`;
              return (
                <div key={card.label} className="flex items-center gap-4 px-4 py-2 hover:bg-muted/30 transition-colors">
                  <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: getLineColor(card.score) }} />
                  <span className="text-sm font-medium text-foreground min-w-[140px] truncate">{card.label}</span>
                  <div className="flex-1 min-w-[120px] relative" style={{ height: v.rowHeight }}>
                    <Sparkline card={card} gradId={gradId} />
                    {v.render(card)}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Legenda dos meses */}
          {cards[0]?.evolucao.length > 0 && (
            <div className="flex items-center gap-4 px-4 py-1.5 border-t border-border/40">
              <div className="w-2" />
              <span className="min-w-[140px]" />
              <div className="flex-1 min-w-[120px] flex justify-between">
                {cards[0].evolucao.map((pt) => (
                  <span key={pt.competencia} className="text-[9px] text-muted-foreground">{pt.competencia.replace('/20', '/')}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
