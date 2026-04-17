import { ResponsiveContainer, AreaChart, Area } from "recharts";
import { Crown, Sparkles, Trophy, Flame, Star, Zap, Target, Award, Gem, Rocket } from "lucide-react";
import { getLineColor } from "@/components/analytics/IndicatorTable";

interface EvoPoint { competencia: string; valor: number; }
export interface NextiCard {
  label: string;
  evolucao: EvoPoint[];
  score: number;
  variacao: string;
  corVariacao: string;
  perPointColors?: boolean;
  forceColor?: string;
  highlight?: boolean;
}

interface Props { cards: NextiCard[]; }

const ORANGE = "#FF5722";

function Sparkline({ card, gradId, height = 28 }: { card: NextiCard; gradId: string; height?: number }) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={card.evolucao} margin={{ top: 2, right: 0, bottom: 0, left: 0 }}>
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="0">
            {card.evolucao.map((pt, i) => {
              const pct = card.evolucao.length > 1 ? (i / (card.evolucao.length - 1)) * 100 : 0;
              const stopColor = card.forceColor ?? (card.perPointColors ? getLineColor(pt.valor) : getLineColor(card.score));
              return <stop key={i} offset={`${pct}%`} stopColor={stopColor} stopOpacity={card.highlight ? 0.4 : 0.45} />;
            })}
          </linearGradient>
          <linearGradient id={`${gradId}-stroke`} x1="0" y1="0" x2="1" y2="0">
            {card.evolucao.map((pt, i) => {
              const pct = card.evolucao.length > 1 ? (i / (card.evolucao.length - 1)) * 100 : 0;
              const stopColor = card.forceColor ?? (card.perPointColors ? getLineColor(pt.valor) : getLineColor(card.score));
              return <stop key={i} offset={`${pct}%`} stopColor={stopColor} />;
            })}
          </linearGradient>
        </defs>
        <Area
          type="monotone"
          dataKey="valor"
          stroke={`url(#${gradId}-stroke)`}
          strokeWidth={card.highlight ? 2.8 : 2}
          fill={`url(#${gradId})`}
          style={card.highlight ? { filter: `drop-shadow(0 1px 4px ${card.forceColor ?? ORANGE}55)` } : undefined}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

/** Each variant = 1 hero block for Score Nexti + 2 simple rows below */
type HeroRender = (nexti: NextiCard, vid: string) => JSX.Element;

const HEROES: { id: string; nome: string; descricao: string; render: HeroRender }[] = [
  // ───── 1 — Original (referência)
  {
    id: "h1",
    nome: "1. Hero clássico",
    descricao: "Versão original com gradiente laranja",
    render: (nexti, vid) => (
      <div className="rounded-xl bg-gradient-to-r from-[#FF5722] via-[#FF7043] to-[#FF8A65] p-[1.5px] shadow-[0_8px_24px_-8px_rgba(255,87,34,0.5)]">
        <div className="flex items-center gap-4 px-4 py-3 bg-gradient-to-r from-orange-50 via-white to-orange-50/40 rounded-[10px]">
          <div className="w-10 h-10 rounded-lg bg-[#FF5722] text-white flex items-center justify-center shadow-md">
            <Crown className="w-5 h-5" />
          </div>
          <div className="min-w-[160px]">
            <div className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#FF5722]/70">Indicador-mestre</div>
            <div className="text-base font-extrabold text-[#FF5722] leading-tight">{nexti.label}</div>
          </div>
          <div className="flex-1 h-[28px]"><Sparkline card={nexti} gradId={`${vid}-spark`} /></div>
          <div className="text-2xl font-black text-[#FF5722] tabular-nums">{nexti.score}</div>
        </div>
      </div>
    ),
  },

  // ───── 2 — Glass dark
  {
    id: "h2",
    nome: "2. Hero dark glass",
    descricao: "Fundo escuro com vidro e ícone neon",
    render: (nexti, vid) => (
      <div className="rounded-xl p-[1.5px] bg-gradient-to-r from-[#FF5722] via-amber-400 to-[#FF5722] shadow-[0_8px_24px_-8px_rgba(255,87,34,0.6)]">
        <div className="flex items-center gap-4 px-4 py-3 bg-slate-900 rounded-[10px]">
          <div className="w-10 h-10 rounded-lg bg-[#FF5722]/15 ring-1 ring-[#FF5722] text-[#FF5722] flex items-center justify-center" style={{ boxShadow: `inset 0 0 12px ${ORANGE}55` }}>
            <Sparkles className="w-5 h-5" style={{ filter: `drop-shadow(0 0 6px ${ORANGE})` }} />
          </div>
          <div className="min-w-[160px]">
            <div className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#FF5722]">Indicador-mestre</div>
            <div className="text-base font-extrabold text-white leading-tight">{nexti.label}</div>
          </div>
          <div className="flex-1 h-[28px]"><Sparkline card={nexti} gradId={`${vid}-spark`} /></div>
          <div className="text-2xl font-black text-[#FF5722] tabular-nums" style={{ textShadow: `0 0 10px ${ORANGE}88` }}>{nexti.score}</div>
        </div>
      </div>
    ),
  },

  // ───── 3 — Crown coroa fina
  {
    id: "h3",
    nome: "3. Hero soft cream",
    descricao: "Fundo cremoso e tipografia editorial",
    render: (nexti, vid) => (
      <div className="rounded-xl border-2 border-[#FF5722]/30 bg-[#FFF7F2] shadow-[0_4px_16px_-4px_rgba(255,87,34,0.25)]">
        <div className="flex items-center gap-4 px-4 py-3">
          <div className="w-10 h-10 rounded-full bg-white ring-2 ring-[#FF5722] text-[#FF5722] flex items-center justify-center shadow-sm">
            <Crown className="w-5 h-5" />
          </div>
          <div className="min-w-[160px]">
            <div className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#FF5722]/70">Indicador-mestre</div>
            <div className="text-base font-extrabold text-[#BF360C] leading-tight" style={{ fontFamily: "Georgia, serif" }}>{nexti.label}</div>
          </div>
          <div className="flex-1 h-[28px]"><Sparkline card={nexti} gradId={`${vid}-spark`} /></div>
          <div className="text-2xl font-black text-[#BF360C] tabular-nums" style={{ fontFamily: "Georgia, serif" }}>{nexti.score}</div>
        </div>
      </div>
    ),
  },

  // ───── 4 — Trophy gold
  {
    id: "h4",
    nome: "4. Hero troféu",
    descricao: "Destaque dourado com ícone de troféu",
    render: (nexti, vid) => (
      <div className="rounded-xl bg-gradient-to-r from-amber-300 via-[#FF5722] to-amber-400 p-[1.5px] shadow-[0_8px_24px_-8px_rgba(255,160,0,0.5)]">
        <div className="flex items-center gap-4 px-4 py-3 bg-gradient-to-r from-amber-50 via-white to-orange-50 rounded-[10px]">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center shadow-md text-white" style={{ background: "linear-gradient(135deg,#FFB300,#FF5722)" }}>
            <Trophy className="w-5 h-5" />
          </div>
          <div className="min-w-[160px]">
            <div className="text-[10px] font-bold uppercase tracking-[0.15em] text-amber-700">Top performer</div>
            <div className="text-base font-extrabold leading-tight bg-gradient-to-r from-amber-700 to-[#FF5722] bg-clip-text text-transparent">{nexti.label}</div>
          </div>
          <div className="flex-1 h-[28px]"><Sparkline card={nexti} gradId={`${vid}-spark`} /></div>
          <div className="text-2xl font-black tabular-nums bg-gradient-to-br from-amber-600 to-[#FF5722] bg-clip-text text-transparent">{nexti.score}</div>
        </div>
      </div>
    ),
  },

  // ───── 5 — Flame energy
  {
    id: "h5",
    nome: "5. Hero flame",
    descricao: "Selo 'EM ALTA' com ícone de chama",
    render: (nexti, vid) => (
      <div className="rounded-xl bg-gradient-to-r from-[#FF5722] to-[#FF8A65] p-[1.5px] shadow-[0_8px_24px_-8px_rgba(255,87,34,0.5)] relative">
        <div className="absolute -top-2 left-4 bg-[#FF5722] text-white text-[9px] font-black uppercase tracking-[0.2em] px-2 py-0.5 rounded shadow-md flex items-center gap-1">
          <Flame className="w-2.5 h-2.5" /> Em alta
        </div>
        <div className="flex items-center gap-4 px-4 py-3 bg-white rounded-[10px]">
          <div className="w-10 h-10 rounded-lg bg-[#FF5722] text-white flex items-center justify-center shadow-md">
            <Flame className="w-5 h-5" />
          </div>
          <div className="min-w-[160px]">
            <div className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#FF5722]/70">Indicador-mestre</div>
            <div className="text-base font-extrabold text-[#FF5722] leading-tight">{nexti.label}</div>
          </div>
          <div className="flex-1 h-[28px]"><Sparkline card={nexti} gradId={`${vid}-spark`} /></div>
          <div className="text-2xl font-black text-[#FF5722] tabular-nums">{nexti.score}</div>
        </div>
      </div>
    ),
  },

  // ───── 6 — Outline minimal
  {
    id: "h6",
    nome: "6. Hero outline",
    descricao: "Linha minimalista com contorno duplo",
    render: (nexti, vid) => (
      <div className="rounded-xl border-2 border-[#FF5722] bg-white shadow-[0_4px_12px_-4px_rgba(255,87,34,0.2)] relative">
        <div className="absolute inset-1 rounded-lg border border-[#FF5722]/30 pointer-events-none" />
        <div className="flex items-center gap-4 px-4 py-3 relative">
          <div className="w-10 h-10 rounded-lg border-2 border-[#FF5722] text-[#FF5722] flex items-center justify-center bg-orange-50/50">
            <Target className="w-5 h-5" />
          </div>
          <div className="min-w-[160px]">
            <div className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#FF5722]/70">Indicador-mestre</div>
            <div className="text-base font-extrabold text-[#FF5722] leading-tight">{nexti.label}</div>
          </div>
          <div className="flex-1 h-[28px]"><Sparkline card={nexti} gradId={`${vid}-spark`} /></div>
          <div className="text-2xl font-black text-[#FF5722] tabular-nums">{nexti.score}</div>
        </div>
      </div>
    ),
  },

  // ───── 7 — Side ribbon
  {
    id: "h7",
    nome: "7. Hero ribbon lateral",
    descricao: "Faixa vertical sólida no início",
    render: (nexti, vid) => (
      <div className="rounded-xl overflow-hidden bg-white shadow-[0_8px_24px_-8px_rgba(255,87,34,0.4)] flex items-stretch">
        <div className="w-2 bg-gradient-to-b from-[#FF5722] via-[#FF7043] to-[#FF5722]" />
        <div className="flex-1 flex items-center gap-4 px-4 py-3 bg-orange-50/30 border-y border-r border-[#FF5722]/20 rounded-r-xl">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#FF5722] to-[#E64A19] text-white flex items-center justify-center shadow-md">
            <Award className="w-5 h-5" />
          </div>
          <div className="min-w-[160px]">
            <div className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#FF5722]/70">Indicador-mestre</div>
            <div className="text-base font-extrabold text-[#FF5722] leading-tight">{nexti.label}</div>
          </div>
          <div className="flex-1 h-[28px]"><Sparkline card={nexti} gradId={`${vid}-spark`} /></div>
          <div className="text-2xl font-black text-[#FF5722] tabular-nums">{nexti.score}</div>
        </div>
      </div>
    ),
  },

  // ───── 8 — Star burst
  {
    id: "h8",
    nome: "8. Hero star",
    descricao: "Estrela como ícone, fundo radial",
    render: (nexti, vid) => (
      <div className="rounded-xl p-[1.5px] bg-gradient-to-r from-[#FF5722] to-amber-400 shadow-[0_8px_24px_-8px_rgba(255,87,34,0.5)]">
        <div
          className="flex items-center gap-4 px-4 py-3 rounded-[10px]"
          style={{ background: "radial-gradient(ellipse at left, rgba(255,87,34,0.12), white 60%)" }}
        >
          <div className="w-10 h-10 rounded-lg flex items-center justify-center shadow-md text-white relative" style={{ background: "linear-gradient(135deg,#FF5722,#FFA000)" }}>
            <Star className="w-5 h-5 fill-white" />
          </div>
          <div className="min-w-[160px]">
            <div className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#FF5722]/70">Indicador-mestre</div>
            <div className="text-base font-extrabold text-[#FF5722] leading-tight">{nexti.label}</div>
          </div>
          <div className="flex-1 h-[28px]"><Sparkline card={nexti} gradId={`${vid}-spark`} /></div>
          <div className="text-2xl font-black text-[#FF5722] tabular-nums">{nexti.score}</div>
        </div>
      </div>
    ),
  },

  // ───── 9 — Diagonal stripes
  {
    id: "h9",
    nome: "9. Hero stripes diagonais",
    descricao: "Padrão diagonal sutil no fundo",
    render: (nexti, vid) => (
      <div className="rounded-xl bg-gradient-to-r from-[#FF5722] to-[#FF7043] p-[1.5px] shadow-[0_8px_24px_-8px_rgba(255,87,34,0.5)]">
        <div
          className="flex items-center gap-4 px-4 py-3 rounded-[10px] bg-white"
          style={{ backgroundImage: "repeating-linear-gradient(135deg, rgba(255,87,34,0.06) 0 10px, transparent 10px 20px)" }}
        >
          <div className="w-10 h-10 rounded-lg bg-[#FF5722] text-white flex items-center justify-center shadow-md">
            <Zap className="w-5 h-5" />
          </div>
          <div className="min-w-[160px]">
            <div className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#FF5722]/70">Indicador-mestre</div>
            <div className="text-base font-extrabold text-[#FF5722] leading-tight">{nexti.label}</div>
          </div>
          <div className="flex-1 h-[28px]"><Sparkline card={nexti} gradId={`${vid}-spark`} /></div>
          <div className="text-2xl font-black text-[#FF5722] tabular-nums">{nexti.score}</div>
        </div>
      </div>
    ),
  },

  // ───── 10 — Gem premium
  {
    id: "h10",
    nome: "10. Hero gem premium",
    descricao: "Gradiente vibrante coral → âmbar com gem",
    render: (nexti, vid) => (
      <div className="rounded-xl bg-gradient-to-br from-rose-400 via-[#FF5722] to-amber-500 p-[2px] shadow-[0_10px_28px_-8px_rgba(255,87,34,0.55)]">
        <div className="flex items-center gap-4 px-4 py-3 bg-white rounded-[10px]">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center shadow-md text-white" style={{ background: "linear-gradient(135deg,#F43F5E,#FF5722,#F59E0B)" }}>
            <Gem className="w-5 h-5" />
          </div>
          <div className="min-w-[160px]">
            <div className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#FF5722]/70">Premium</div>
            <div className="text-base font-extrabold leading-tight bg-gradient-to-r from-rose-500 via-[#FF5722] to-amber-600 bg-clip-text text-transparent">{nexti.label}</div>
          </div>
          <div className="flex-1 h-[28px]"><Sparkline card={nexti} gradId={`${vid}-spark`} /></div>
          <div className="text-2xl font-black tabular-nums bg-gradient-to-br from-rose-500 to-amber-600 bg-clip-text text-transparent">{nexti.score}</div>
        </div>
      </div>
    ),
  },

  // ───── 11 — Rocket launch
  {
    id: "h11",
    nome: "11. Hero rocket",
    descricao: "Estilo executivo com ícone de foguete",
    render: (nexti, vid) => (
      <div className="rounded-xl bg-white border border-[#FF5722]/40 shadow-[0_8px_24px_-8px_rgba(255,87,34,0.35)] relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-orange-50 to-transparent pointer-events-none" />
        <div className="flex items-center gap-4 px-4 py-3 relative">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#FF5722] to-[#D84315] text-white flex items-center justify-center shadow-md">
            <Rocket className="w-5 h-5" />
          </div>
          <div className="min-w-[160px]">
            <div className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#FF5722]/70">Indicador-mestre</div>
            <div className="text-base font-extrabold text-[#FF5722] leading-tight">{nexti.label}</div>
          </div>
          <div className="flex-1 h-[28px]"><Sparkline card={nexti} gradId={`${vid}-spark`} /></div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-black text-[#FF5722] tabular-nums">{nexti.score}</span>
            <span className="text-[10px] font-bold text-[#FF5722]/60">/100</span>
          </div>
        </div>
      </div>
    ),
  },
];

export default function NextiHighlightVariants({ cards }: Props) {
  const nexti = cards.find((c) => c.highlight);
  const others = cards.filter((c) => !c.highlight);

  if (!nexti) return null;

  return (
    <div className="space-y-4">
      <div className="px-1">
        <h3 className="text-sm font-semibold text-foreground">11 variações Hero — Score Nexti</h3>
        <p className="text-xs text-muted-foreground">Variações inspiradas no estilo Hero Panel</p>
      </div>

      {HEROES.map((variant) => (
        <div key={variant.id} className="bg-card border border-border/50 rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-border/40 bg-muted/30">
            <span className="text-xs font-bold text-foreground">{variant.nome}</span>
            <span className="text-[10px] text-muted-foreground italic">{variant.descricao}</span>
          </div>
          <div className="p-3">
            {variant.render(nexti, variant.id)}
            <div className="mt-2 divide-y divide-border/40">
              {others.map((c) => (
                <div key={c.label} className="flex items-center gap-4 px-3 py-3">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: getLineColor(c.score) }} />
                  <span className="min-w-[160px] text-sm text-foreground">{c.label}</span>
                  <div className="flex-1 h-[17px]"><Sparkline card={c} gradId={`${variant.id}-${c.label}`} height={17} /></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
