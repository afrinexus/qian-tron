import { useId } from "react";

type Tone = "dragon" | "gold" | "bronze" | "steel" | "arch";
type Corner = "br" | "bl" | "tr" | "tl";
type Motion = "drift" | "breathe" | "none";

type Props = {
  className?: string;
  /** Color tone from the brand palette */
  tone?: Tone;
  /** Corner the arcs emanate from */
  corner?: Corner;
  /** Number of concentric rings (density). 12–60 sensible. */
  rings?: number;
  /** Base ring spacing in px. */
  spacing?: number;
  /** Stroke opacity 0..1 */
  opacity?: number;
  /** Overall SVG size (viewport square) */
  size?: number;
  /** Animation register */
  motion?: Motion;
  /** Animation duration in seconds */
  duration?: number;
};

const TONE: Record<Tone, string> = {
  dragon: "rgba(183,28,28,0.9)",     // #B71C1C
  gold: "rgba(214,168,0,0.9)",       // #D6A800
  bronze: "rgba(138,106,42,0.9)",    // #8A6A2A
  steel: "rgba(94,100,104,0.9)",     // #5E6468
  arch: "rgba(250,250,250,0.9)",     // #FAFAFA
};

/**
 * Soft concentric-arc fabric pattern, emanating from a corner.
 * Meant as a whisper-quiet decorative layer behind editorial text blocks.
 * Vary tone/corner/rings/opacity/motion per instance for craft.
 */
export function FabricPattern({
  className,
  tone = "bronze",
  corner = "br",
  rings = 34,
  spacing = 14,
  opacity = 0.18,
  size = 640,
  motion = "drift",
  duration = 24,
}: Props) {
  const id = useId().replace(/[:]/g, "");
  const stroke = TONE[tone];

  // Origin coords for the arc center based on corner
  const cx = corner === "br" || corner === "tr" ? size : 0;
  const cy = corner === "br" || corner === "bl" ? size : 0;

  const arr = Array.from({ length: rings }, (_, i) => (i + 1) * spacing);

  const anim =
    motion === "drift"
      ? `fabric-drift-${id}`
      : motion === "breathe"
      ? `fabric-breathe-${id}`
      : undefined;

  return (
    <div
      className={className}
      aria-hidden="true"
      style={{ pointerEvents: "none", opacity }}
    >
      <style>{`
        @keyframes fabric-drift-${id} {
          0%   { transform: translate3d(0,0,0) scale(1); }
          50%  { transform: translate3d(-6px,-4px,0) scale(1.015); }
          100% { transform: translate3d(0,0,0) scale(1); }
        }
        @keyframes fabric-breathe-${id} {
          0%,100% { opacity: 0.65; }
          50%     { opacity: 1; }
        }
        .fabric-${id} {
          transform-origin: ${cx}px ${cy}px;
          ${anim ? `animation: ${anim} ${duration}s ease-in-out infinite;` : ""}
          will-change: transform, opacity;
        }
        @media (prefers-reduced-motion: reduce) {
          .fabric-${id} { animation: none; }
        }
      `}</style>
      <svg
        viewBox={`0 0 ${size} ${size}`}
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid slice"
        className={`fabric-${id}`}
      >
        <g fill="none" stroke={stroke} strokeWidth={0.75}>
          {arr.map((r, i) => (
            <circle
              key={i}
              cx={cx}
              cy={cy}
              r={r}
              strokeOpacity={0.55 + 0.45 * Math.sin((i / rings) * Math.PI)}
            />
          ))}
        </g>
      </svg>
    </div>
  );
}
