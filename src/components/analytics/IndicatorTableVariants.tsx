import {
  ResponsiveContainer, AreaChart, Area,
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

// ── 10 variações de "bracket/chave" sobre os últimos 3 meses ──
const MARKERS: {
  id: number;
  nome: string;
  descricao: string;
  rowHeight: number;
  render: (card: CardData) => JSX.Element;
}[] = [
  // 11 — Chave clássica refinada (curvas suaves) + pílula score acima
  {
    id: 11,
    nome: "Chave clássica refinada",
    descricao: "Bracket curvo elegante (estilo {) com pílula do score flutuando acima",
    rowHeight: 60,
    render: (card) => {
      const color = getLineColor(card.score);
      const widthPct = (3 / card.evolucao.length) * 100;
      return (
        <div className="absolute top-0 pointer-events-none" style={{ right: 0, width: `${widthPct}%`, height: 22 }}>
          <svg viewBox="0 0 100 22" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
            <path d="M 1 21 C 1 12, 4 10, 10 10 L 40 10 C 46 10, 50 7, 50 1 C 50 7, 54 10, 60 10 L 90 10 C 96 10, 99 12, 99 21" stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round" />
          </svg>
          <div className="absolute left-1/2 -top-[2px] -translate-x-1/2 px-2.5 py-0.5 rounded-full text-white text-[11px] font-bold shadow-md" style={{ backgroundColor: color }}>
            {card.score}
          </div>
        </div>
      );
    },
  },
  // 12 — Bracket inferior (chave invertida)
  {
    id: 12,
    nome: "Chave inferior",
    descricao: "Bracket curvo embaixo dos 3 meses + pílula do score abaixo",
    rowHeight: 64,
    render: (card) => {
      const color = getLineColor(card.score);
      const widthPct = (3 / card.evolucao.length) * 100;
      return (
        <div className="absolute bottom-0 pointer-events-none" style={{ right: 0, width: `${widthPct}%`, height: 22 }}>
          <svg viewBox="0 0 100 22" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
            <path d="M 1 1 C 1 10, 4 12, 10 12 L 40 12 C 46 12, 50 15, 50 21 C 50 15, 54 12, 60 12 L 90 12 C 96 12, 99 10, 99 1" stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round" />
          </svg>
          <div className="absolute left-1/2 bottom-[-4px] -translate-x-1/2 px-2.5 py-0.5 rounded-full text-white text-[11px] font-bold shadow-md" style={{ backgroundColor: color }}>
            {card.score}
          </div>
        </div>
      );
    },
  },
  // 13 — Colchete reto [ ] sólido
  {
    id: 13,
    nome: "Colchete reto sólido",
    descricao: "Bracket [ ] reto e firme com pílula no centro",
    rowHeight: 56,
    render: (card) => {
      const color = getLineColor(card.score);
      const widthPct = (3 / card.evolucao.length) * 100;
      return (
        <div className="absolute top-0 pointer-events-none" style={{ right: 0, width: `${widthPct}%`, height: 18 }}>
          <svg viewBox="0 0 100 18" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
            <path d="M 1 17 L 1 4 L 99 4 L 99 17" stroke={color} strokeWidth="1.5" fill="none" strokeLinejoin="miter" />
          </svg>
          <div className="absolute left-1/2 -top-[2px] -translate-x-1/2 px-2 py-0.5 rounded text-white text-[11px] font-bold shadow" style={{ backgroundColor: color }}>
            {card.score}
          </div>
        </div>
      );
    },
  },
  // 14 — Bracket com label contextual completo
  {
    id: 14,
    nome: "Bracket com contexto",
    descricao: "Chave + label 'ÚLT 3M · score' em pílula branca outline",
    rowHeight: 60,
    render: (card) => {
      const color = getLineColor(card.score);
      const widthPct = (3 / card.evolucao.length) * 100;
      return (
        <div className="absolute top-0 pointer-events-none" style={{ right: 0, width: `${widthPct}%`, height: 22 }}>
          <svg viewBox="0 0 100 22" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
            <path d="M 1 21 C 1 12, 4 10, 10 10 L 38 10 M 62 10 L 90 10 C 96 10, 99 12, 99 21" stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round" />
          </svg>
          <div className="absolute left-1/2 -top-[3px] -translate-x-1/2 flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white text-[10px] font-semibold shadow" style={{ border: `1.5px solid ${color}`, color }}>
            <span className="text-[8px] uppercase opacity-60 tracking-wider">Últ 3M</span>
            <span className="font-bold text-[11px]">{card.score}</span>
          </div>
        </div>
      );
    },
  },
  // 15 — Chave dupla (sanduíche)
  {
    id: 15,
    nome: "Chave dupla (sanduíche)",
    descricao: "Brackets curvos no topo E na base com score no centro",
    rowHeight: 64,
    render: (card) => {
      const color = getLineColor(card.score);
      const widthPct = (3 / card.evolucao.length) * 100;
      return (
        <>
          <div className="absolute top-0 pointer-events-none" style={{ right: 0, width: `${widthPct}%`, height: 14 }}>
            <svg viewBox="0 0 100 14" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
              <path d="M 1 13 C 1 6, 4 4, 10 4 L 40 4 C 46 4, 50 2, 50 1 C 50 2, 54 4, 60 4 L 90 4 C 96 4, 99 6, 99 13" stroke={color} strokeWidth="1.3" fill="none" strokeLinecap="round" />
            </svg>
          </div>
          <div className="absolute bottom-0 pointer-events-none" style={{ right: 0, width: `${widthPct}%`, height: 14 }}>
            <svg viewBox="0 0 100 14" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
              <path d="M 1 1 C 1 8, 4 10, 10 10 L 40 10 C 46 10, 50 12, 50 13 C 50 12, 54 10, 60 10 L 90 10 C 96 10, 99 8, 99 1" stroke={color} strokeWidth="1.3" fill="none" strokeLinecap="round" />
            </svg>
          </div>
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 px-2 py-0.5 rounded-full bg-white text-[12px] font-bold shadow" style={{ color, border: `1.5px solid ${color}` }}>
            {card.score}
          </div>
        </>
      );
    },
  },
  // 16 — Bracket + leader line tracejada
  {
    id: 16,
    nome: "Chave + leader line",
    descricao: "Bracket no topo conectado ao eixo via linha guia tracejada",
    rowHeight: 64,
    render: (card) => {
      const color = getLineColor(card.score);
      const widthPct = (3 / card.evolucao.length) * 100;
      return (
        <>
          <div className="absolute top-0 pointer-events-none" style={{ right: 0, width: `${widthPct}%`, height: 16 }}>
            <svg viewBox="0 0 100 16" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
              <path d="M 1 15 C 1 6, 4 4, 10 4 L 90 4 C 96 4, 99 6, 99 15" stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round" />
            </svg>
          </div>
          <div className="absolute pointer-events-none" style={{ right: `${widthPct / 2}%`, transform: 'translateX(50%)', top: 4, bottom: 14, borderLeft: `1px dashed ${color}80` }} />
          <div className="absolute -top-[4px] pointer-events-none px-2.5 py-0.5 rounded-full text-white text-[11px] font-bold shadow-md" style={{ right: `${widthPct / 2}%`, transform: 'translateX(50%)', backgroundColor: color }}>
            {card.score}
          </div>
        </>
      );
    },
  },
  // 17 — Chave trapezoidal (bordas inclinadas)
  {
    id: 17,
    nome: "Chave trapezoidal",
    descricao: "Bracket inclinado para fora dando sensação de zoom/perspectiva",
    rowHeight: 60,
    render: (card) => {
      const color = getLineColor(card.score);
      const widthPct = (3 / card.evolucao.length) * 100;
      return (
        <div className="absolute top-0 pointer-events-none" style={{ right: 0, width: `${widthPct}%`, height: 20 }}>
          <svg viewBox="0 0 100 20" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
            <path d="M -4 19 L 8 6 L 92 6 L 104 19" stroke={color} strokeWidth="1.5" fill="none" strokeLinejoin="round" />
          </svg>
          <div className="absolute left-1/2 -top-[2px] -translate-x-1/2 px-2 py-0.5 rounded-md text-white text-[11px] font-bold shadow" style={{ backgroundColor: color }}>
            {card.score}
          </div>
        </div>
      );
    },
  },
  // 18 — Bracket com terminais T (pernas verticais)
  {
    id: 18,
    nome: "Bracket com terminais T",
    descricao: "Linha horizontal com pernas verticais demarcando início, meio e fim",
    rowHeight: 60,
    render: (card) => {
      const color = getLineColor(card.score);
      const widthPct = (3 / card.evolucao.length) * 100;
      return (
        <div className="absolute top-0 pointer-events-none" style={{ right: 0, width: `${widthPct}%`, height: 18 }}>
          <svg viewBox="0 0 100 18" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
            <line x1="2" y1="8" x2="98" y2="8" stroke={color} strokeWidth="1.5" />
            <line x1="2" y1="3" x2="2" y2="14" stroke={color} strokeWidth="1.5" />
            <line x1="98" y1="3" x2="98" y2="14" stroke={color} strokeWidth="1.5" />
            <line x1="50" y1="8" x2="50" y2="3" stroke={color} strokeWidth="1.5" />
          </svg>
          <div className="absolute left-1/2 -top-[2px] -translate-x-1/2 px-2 py-0.5 rounded-full text-white text-[11px] font-bold shadow-md" style={{ backgroundColor: color }}>
            {card.score}
          </div>
        </div>
      );
    },
  },
  // 19 — Chave com gradiente nas pontas
  {
    id: 19,
    nome: "Bracket com degradê",
    descricao: "Chave que esmaece nas pontas e fica sólida no centro",
    rowHeight: 60,
    render: (card) => {
      const color = getLineColor(card.score);
      const widthPct = (3 / card.evolucao.length) * 100;
      const gradId = `bg-grad-19-${card.label.replace(/\s/g, '')}`;
      return (
        <div className="absolute top-0 pointer-events-none" style={{ right: 0, width: `${widthPct}%`, height: 20 }}>
          <svg viewBox="0 0 100 20" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
            <defs>
              <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor={color} stopOpacity="0.2" />
                <stop offset="50%" stopColor={color} stopOpacity="1" />
                <stop offset="100%" stopColor={color} stopOpacity="0.2" />
              </linearGradient>
            </defs>
            <path d="M 1 19 C 1 9, 4 7, 10 7 L 90 7 C 96 7, 99 9, 99 19" stroke={`url(#${gradId})`} strokeWidth="2" fill="none" strokeLinecap="round" />
          </svg>
          <div className="absolute left-1/2 -top-[2px] -translate-x-1/2 px-2.5 py-0.5 rounded-full text-white text-[11px] font-bold shadow-md" style={{ backgroundColor: color }}>
            {card.score}
          </div>
        </div>
      );
    },
  },
  // 20 — Chave + delta de tendência
  {
    id: 20,
    nome: "Bracket com delta",
    descricao: "Chave + pílula com score e seta de tendência (vs primeiro mês)",
    rowHeight: 60,
    render: (card) => {
      const color = getLineColor(card.score);
      const widthPct = (3 / card.evolucao.length) * 100;
      const first = card.evolucao[0]?.valor ?? card.score;
      const delta = card.score - first;
      const arrow = delta > 0 ? '▲' : delta < 0 ? '▼' : '●';
      return (
        <div className="absolute top-0 pointer-events-none" style={{ right: 0, width: `${widthPct}%`, height: 20 }}>
          <svg viewBox="0 0 100 20" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
            <path d="M 1 19 C 1 9, 4 7, 10 7 L 40 7 C 46 7, 50 5, 50 1 C 50 5, 54 7, 60 7 L 90 7 C 96 7, 99 9, 99 19" stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round" />
          </svg>
          <div className="absolute left-1/2 -top-[3px] -translate-x-1/2 flex items-center gap-1 px-2 py-0.5 rounded-full text-white text-[11px] font-bold shadow-md" style={{ backgroundColor: color }}>
            <span>{card.score}</span>
            <span className="text-[8px] opacity-90">{arrow}</span>
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
        <p className="text-xs font-semibold text-foreground">🧪 Mais 10 variações da família "Bracket / Chave"</p>
        <p className="text-[10px] text-muted-foreground mt-0.5">
          Mesmo sparkline em todas — apenas a forma da chave/bracket sobre os 3 meses muda
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
