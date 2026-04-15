/**
 * NoDataPlaceholder — empty state for charts when the active customer
 * doesn't have data for a specific metric.
 * Maintains the card size/position and shows a shimmer skeleton + message.
 */
export default function NoDataPlaceholder({ height = 280 }: { height?: number }) {
  return (
    <div
      className="flex flex-col items-center justify-center gap-3 rounded-lg bg-muted/20 border border-border/40"
      style={{ height }}
    >
      {/* Shimmer skeleton bars */}
      <div className="flex flex-col gap-1.5 w-3/5">
        {[100, 80, 60].map((w, i) => (
          <div
            key={i}
            className="h-2.5 rounded-full bg-muted/50 animate-pulse"
            style={{ width: `${w}%` }}
          />
        ))}
      </div>
      <p className="text-xs text-muted-foreground text-center leading-relaxed mt-1">
        Este cliente ainda não possui<br />este dado no Nexti
      </p>
    </div>
  );
}
