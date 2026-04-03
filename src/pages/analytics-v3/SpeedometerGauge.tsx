export default function SpeedometerGauge({ value }: { value: number }) {
  const clampedValue = Math.max(0, Math.min(100, value));
  const size = 160;
  const strokeWidth = 14;
  const r = (size - strokeWidth) / 2;
  const cx = size / 2;
  const cy = size / 2;
  const circumference = 2 * Math.PI * r;
  const arcRatio = 0.75;
  const arcLength = circumference * arcRatio;
  const valueLength = arcLength * (clampedValue / 100);
  const rotation = 135;

  const color = clampedValue >= 90 ? "hsl(142, 71%, 45%)" : clampedValue >= 75 ? "hsl(142, 71%, 45%)" : clampedValue >= 60 ? "hsl(var(--primary))" : "hsl(0, 84%, 60%)";

  return (
    <div className="relative" style={{ width: size, height: size * 0.7 }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="absolute top-0 left-0" style={{ transform: `rotate(${rotation}deg)` }}>
        <circle
          cx={cx} cy={cy} r={r}
          fill="none"
          stroke="hsl(var(--muted))"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={`${arcLength} ${circumference - arcLength}`}
        />
        {clampedValue > 0 && (
          <circle
            cx={cx} cy={cy} r={r}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={`${valueLength} ${circumference - valueLength}`}
            className="transition-all duration-700 ease-out"
          />
        )}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center" style={{ paddingTop: 8 }}>
        <span className="text-4xl font-extrabold" style={{ color }}>{clampedValue}</span>
      </div>
    </div>
  );
}
