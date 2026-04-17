import { ResponsiveContainer, AreaChart, Area } from "recharts";
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

interface Props {
  cards: NextiCard[]; // [Score Nexti, Ponto, Absenteísmo]
}

// Sparkline helper used by all variants (kept identical to the main table)
function Sparkline({ card, gradId }: { card: NextiCard; gradId: string }) {
  return (
    <ResponsiveContainer width="100%" height={card.highlight ? 26 : 17}>
      <AreaChart data={card.evolucao} margin={{ top: 2, right: 0, bottom: 0, left: 0 }}>
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="0">
            {card.evolucao.map((pt, i) => {
              const pct = card.evolucao.length > 1 ? (i / (card.evolucao.length - 1)) * 100 : 0;
              const stopColor = card.forceColor ?? (card.perPointColors ? getLineColor(pt.valor) : getLineColor(card.score));
              return <stop key={i} offset={`${pct}%`} stopColor={stopColor} stopOpacity={card.highlight ? 0.35 : 0.45} />;
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
          strokeWidth={card.highlight ? 2.6 : 2}
          fill={`url(#${gradId})`}
          style={card.highlight ? { filter: `drop-shadow(0 1px 4px ${card.forceColor ?? "#FF5722"}55)` } : undefined}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

type VariantRender = (card: NextiCard, idx: number, variantId: string) => {
  rowClass: string;
  labelEl: React.ReactNode;
  dotStyle?: React.CSSProperties;
  prefix?: React.ReactNode;
};

const ORANGE = "#FF5722";

const VARIANTS: { id: string; nome: string; descricao: string; render: VariantRender }[] = [
  {
    id: "v1",
    nome: "1. Faixa lateral grossa",
    descricao: "Borda esquerda larga (6px) sem fundo",
    render: (card) => ({
      rowClass: card.highlight
        ? "border-l-[6px] border-l-[#FF5722] hover:bg-orange-50/30"
        : "hover:bg-muted/30",
      labelEl: (
        <span className={card.highlight ? "text-sm font-bold text-[#FF5722]" : "text-sm font-medium text-foreground"}>
          {card.label}
          {card.highlight && <span className="ml-2 text-[10px] font-semibold text-[#FF5722]/70">{card.score}</span>}
        </span>
      ),
    }),
  },
  {
    id: "v2",
    nome: "2. Gradiente horizontal",
    descricao: "Fundo em gradiente laranja → transparente",
    render: (card) => ({
      rowClass: card.highlight
        ? "bg-gradient-to-r from-orange-100 via-orange-50/40 to-transparent hover:from-orange-100/80"
        : "hover:bg-muted/30",
      labelEl: (
        <span className={card.highlight ? "text-sm font-bold text-[#FF5722] tracking-wide" : "text-sm font-medium text-foreground"}>
          {card.label}
          {card.highlight && <span className="ml-2 text-[10px] font-semibold text-[#FF5722]/70">{card.score}</span>}
        </span>
      ),
    }),
  },
  {
    id: "v3",
    nome: "3. Pílula no rótulo",
    descricao: "Sem fundo na linha; rótulo dentro de uma pílula laranja",
    render: (card) => ({
      rowClass: "hover:bg-muted/30",
      labelEl: card.highlight ? (
        <span className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#FF5722] text-white text-xs font-bold uppercase tracking-wide shadow-sm">
          {card.label}
          <span className="bg-white/25 rounded-full px-1.5 py-0.5 text-[10px]">{card.score}</span>
        </span>
      ) : (
        <span className="text-sm font-medium text-foreground">{card.label}</span>
      ),
    }),
  },
  {
    id: "v4",
    nome: "4. Bordas duplas (top/bottom)",
    descricao: "Linhas tracejadas laranja em cima e embaixo",
    render: (card) => ({
      rowClass: card.highlight
        ? "border-y border-dashed border-[#FF5722]/60 bg-orange-50/20"
        : "hover:bg-muted/30",
      labelEl: (
        <span className={card.highlight ? "text-sm font-bold text-[#FF5722] uppercase tracking-wide" : "text-sm font-medium text-foreground"}>
          {card.label}
          {card.highlight && <span className="ml-2 text-[10px] font-semibold text-[#FF5722]/70">{card.score}</span>}
        </span>
      ),
    }),
  },
  {
    id: "v5",
    nome: "5. Selo lateral",
    descricao: "Selo 'PRINCIPAL' antes do rótulo",
    render: (card) => ({
      rowClass: card.highlight ? "bg-orange-50/30 hover:bg-orange-50/50" : "hover:bg-muted/30",
      labelEl: (
        <span className="flex items-center gap-2">
          {card.highlight && (
            <span className="text-[8px] font-bold text-white bg-[#FF5722] px-1.5 py-0.5 rounded uppercase tracking-wider">
              Principal
            </span>
          )}
          <span className={card.highlight ? "text-sm font-bold text-[#FF5722]" : "text-sm font-medium text-foreground"}>
            {card.label}
            {card.highlight && <span className="ml-2 text-[10px] font-semibold text-[#FF5722]/70">{card.score}</span>}
          </span>
        </span>
      ),
    }),
  },
  {
    id: "v6",
    nome: "6. Card flutuante",
    descricao: "Linha com sombra e cantos arredondados",
    render: (card) => ({
      rowClass: card.highlight
        ? "bg-white shadow-[0_2px_12px_rgba(255,87,34,0.18)] rounded-lg ring-1 ring-[#FF5722]/30 my-1"
        : "hover:bg-muted/30",
      labelEl: (
        <span className={card.highlight ? "text-sm font-bold text-[#FF5722]" : "text-sm font-medium text-foreground"}>
          {card.label}
          {card.highlight && <span className="ml-2 text-[10px] font-semibold text-[#FF5722]/70">{card.score}</span>}
        </span>
      ),
    }),
  },
  {
    id: "v7",
    nome: "7. Bolinha pulsante",
    descricao: "Indicador com halo animado",
    render: (card) => ({
      rowClass: card.highlight ? "bg-orange-50/25 hover:bg-orange-50/50" : "hover:bg-muted/30",
      labelEl: (
        <span className={card.highlight ? "text-sm font-bold text-[#FF5722] uppercase tracking-wide" : "text-sm font-medium text-foreground"}>
          {card.label}
          {card.highlight && <span className="ml-2 text-[10px] font-semibold text-[#FF5722]/70">{card.score}</span>}
        </span>
      ),
      prefix: card.highlight ? (
        <span className="relative flex h-2.5 w-2.5 shrink-0">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#FF5722] opacity-60" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#FF5722]" />
        </span>
      ) : undefined,
    }),
  },
  {
    id: "v8",
    nome: "8. Linha invertida (dark)",
    descricao: "Fundo escuro com texto branco e accent laranja",
    render: (card) => ({
      rowClass: card.highlight
        ? "bg-slate-900 hover:bg-slate-800 border-l-[3px] border-l-[#FF5722]"
        : "hover:bg-muted/30",
      labelEl: (
        <span className={card.highlight ? "text-sm font-bold text-white uppercase tracking-wide" : "text-sm font-medium text-foreground"}>
          {card.label}
          {card.highlight && (
            <span className="ml-2 text-[10px] font-semibold text-[#FF5722] bg-[#FF5722]/15 px-1.5 py-0.5 rounded">
              {card.score}
            </span>
          )}
        </span>
      ),
      dotStyle: card.highlight ? { backgroundColor: ORANGE, boxShadow: "0 0 0 2px rgba(255,87,34,0.3)" } : undefined,
    }),
  },
  {
    id: "v9",
    nome: "9. Tag de categoria à direita do nome",
    descricao: "Rótulo com tag 'COMPOSTO' estilo etiqueta",
    render: (card) => ({
      rowClass: card.highlight ? "bg-orange-50/40 hover:bg-orange-50/60" : "hover:bg-muted/30",
      labelEl: (
        <span className="flex items-center gap-2">
          <span className={card.highlight ? "text-sm font-bold text-[#FF5722]" : "text-sm font-medium text-foreground"}>
            {card.label}
          </span>
          {card.highlight && (
            <>
              <span className="text-[9px] font-semibold text-[#FF5722] border border-[#FF5722]/40 px-1.5 py-0.5 rounded uppercase">
                Composto
              </span>
              <span className="text-[10px] font-semibold text-[#FF5722]/80">{card.score}</span>
            </>
          )}
        </span>
      ),
    }),
  },
  {
    id: "v10",
    nome: "10. Brilho radial sutil",
    descricao: "Fundo com radial-gradient laranja",
    render: (card) => ({
      rowClass: card.highlight ? "hover:bg-orange-50/40" : "hover:bg-muted/30",
      labelEl: (
        <span className={card.highlight ? "text-sm font-bold text-[#FF5722] uppercase tracking-wide" : "text-sm font-medium text-foreground"}>
          {card.label}
          {card.highlight && <span className="ml-2 text-[10px] font-semibold text-[#FF5722]/70">{card.score}</span>}
        </span>
      ),
    }),
  },
];

export default function NextiHighlightVariants({ cards }: Props) {
  return (
    <div className="space-y-4">
      <div className="px-1">
        <h3 className="text-sm font-semibold text-foreground">Variações de destaque — Score Nexti</h3>
        <p className="text-xs text-muted-foreground">10 estilos alternativos para a primeira linha</p>
      </div>

      {VARIANTS.map((variant) => (
        <div key={variant.id} className="bg-card border border-border/50 rounded-xl">
          <div className="flex items-center justify-between px-4 py-2 border-b border-border/40">
            <span className="text-xs font-semibold text-foreground">{variant.nome}</span>
            <span className="text-[10px] text-muted-foreground">{variant.descricao}</span>
          </div>
          <div className="flex items-center gap-2 sm:gap-4 px-3 sm:px-4 py-2 border-b border-border/40 text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
            <div className="w-2" />
            <span className="flex-1 sm:flex-none sm:min-w-[180px]">Indicador</span>
            <div className="flex-1 sm:min-w-[120px] text-center">Histórico 12m</div>
          </div>
          <div className="divide-y divide-border/40">
            {cards.map((card, idx) => {
              const v = variant.render(card, idx, variant.id);
              const gradId = `nv-${variant.id}-${card.label.replace(/\s/g, "")}`;
              const rowStyle: React.CSSProperties = {};
              if (variant.id === "v10" && card.highlight) {
                rowStyle.background =
                  "radial-gradient(ellipse at left, rgba(255,87,34,0.18) 0%, rgba(255,87,34,0.04) 45%, transparent 75%)";
              }
              return (
                <div
                  key={card.label}
                  style={rowStyle}
                  className={`flex items-center gap-2 sm:gap-4 px-3 sm:px-4 py-5 transition-colors ${v.rowClass}`}
                >
                  {v.prefix ?? (
                    <div
                      className="w-2 h-2 rounded-full shrink-0"
                      style={v.dotStyle ?? { backgroundColor: card.forceColor ?? getLineColor(card.score) }}
                    />
                  )}
                  <div className="flex-1 sm:flex-none sm:min-w-[180px] truncate">{v.labelEl}</div>
                  <div className={`hidden sm:block flex-1 sm:min-w-[120px] ${card.highlight ? "h-[26px]" : "h-[17px]"}`}>
                    <Sparkline card={card} gradId={gradId} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
