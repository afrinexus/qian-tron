type Props = {
  className?: string;
  /** Highlight color for the "TRON" segment. Defaults to currentColor. */
  accent?: string;
  title?: string;
};

/**
 * QIANTRON wordmark rendered as SVG in a futuristic geometric font (Orbitron),
 * with the horizontal crossbar of the "A" intentionally removed.
 * Uses a fixed-cell grid so a hand-drawn crossbar-less "A" slots cleanly in.
 */
export function QianTronWordmark({ className, accent, title = "QIANTRON" }: Props) {
  const cellW = 90;
  const cellH = 130;
  const letters: (string | null)[] = ["Q", "I", null, "N", "T", "R", "O", "N"];
  const totalW = cellW * letters.length;
  const stroke = 12;
  const legApex = 18;
  const legFoot = 112;

  return (
    <svg
      role="img"
      aria-label={title}
      viewBox={`0 0 ${totalW} ${cellH}`}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
    >
      <title>{title}</title>
      {letters.map((L, i) => {
        const cx = cellW * i + cellW / 2;
        // "TRON" is the 4 trailing letters (indices 4..7)
        const color = accent && i >= 4 ? accent : "currentColor";

        if (L === null) {
          // Custom "A" — apex + two legs, deliberately NO crossbar.
          const halfBase = cellW * 0.38;
          return (
            <g key={`a-${i}`} stroke={color} strokeWidth={stroke} strokeLinecap="square" fill="none">
              <line x1={cx - halfBase} y1={legFoot} x2={cx} y2={legApex} />
              <line x1={cx + halfBase} y1={legFoot} x2={cx} y2={legApex} />
            </g>
          );
        }

        return (
          <text
            key={`${L}-${i}`}
            x={cx}
            y={108}
            textAnchor="middle"
            fontFamily='"Orbitron", "Michroma", ui-sans-serif, system-ui, sans-serif'
            fontWeight={900}
            fontSize={108}
            fill={color}
            letterSpacing="0"
          >
            {L}
          </text>
        );
      })}
    </svg>
  );
}
