import { useEffect, useRef } from "react";

type Props = {
  className?: string;
  /** Base cell size in CSS px. Defaults to 44. */
  cell?: number;
  /** Highlight color for pulsing squares. Defaults to dragon red. */
  accent?: string;
  /** Grid line color. Defaults to white at low alpha. */
  line?: string;
};

/**
 * Blueprint-style animated square grid canvas.
 * Squares softly pulse in and out at random positions — architectural,
 * industrial, luxurious. Sits behind hero content as a decorative layer.
 */
export function SquareCanvas({
  className,
  cell = 44,
  accent = "rgba(183,28,28,0.55)",
  line = "rgba(255,255,255,0.05)",
}: Props) {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let W = 0;
    let H = 0;
    let cols = 0;
    let rows = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    type Pulse = { c: number; r: number; life: number; ttl: number; hue: string };
    const pulses: Pulse[] = [];

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      W = rect.width;
      H = rect.height;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.ceil(W / cell);
      rows = Math.ceil(H / cell);
    };

    const spawn = () => {
      pulses.push({
        c: Math.floor(Math.random() * cols),
        r: Math.floor(Math.random() * rows),
        life: 0,
        ttl: 90 + Math.random() * 120,
        hue: Math.random() < 0.2 ? "rgba(214,168,0,0.5)" : accent,
      });
    };

    let tick = 0;
    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      // Grid lines
      ctx.strokeStyle = line;
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let x = 0; x <= cols; x++) {
        ctx.moveTo(x * cell + 0.5, 0);
        ctx.lineTo(x * cell + 0.5, H);
      }
      for (let y = 0; y <= rows; y++) {
        ctx.moveTo(0, y * cell + 0.5);
        ctx.lineTo(W, y * cell + 0.5);
      }
      ctx.stroke();

      // Pulses
      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i];
        p.life++;
        const t = p.life / p.ttl;
        if (t >= 1) {
          pulses.splice(i, 1);
          continue;
        }
        const a = Math.sin(t * Math.PI); // fade in/out
        ctx.fillStyle = p.hue.replace(/[\d.]+\)$/, `${(a * 0.6).toFixed(3)})`);
        ctx.fillRect(p.c * cell + 2, p.r * cell + 2, cell - 4, cell - 4);
        // Corner ticks
        ctx.strokeStyle = p.hue.replace(/[\d.]+\)$/, `${(a * 0.9).toFixed(3)})`);
        ctx.lineWidth = 1.5;
        const x = p.c * cell;
        const y = p.r * cell;
        const k = 6;
        ctx.beginPath();
        ctx.moveTo(x, y + k); ctx.lineTo(x, y); ctx.lineTo(x + k, y);
        ctx.moveTo(x + cell - k, y); ctx.lineTo(x + cell, y); ctx.lineTo(x + cell, y + k);
        ctx.moveTo(x + cell, y + cell - k); ctx.lineTo(x + cell, y + cell); ctx.lineTo(x + cell - k, y + cell);
        ctx.moveTo(x + k, y + cell); ctx.lineTo(x, y + cell); ctx.lineTo(x, y + cell - k);
        ctx.stroke();
      }

      tick++;
      if (tick % 12 === 0 && pulses.length < 14) spawn();

      raf = requestAnimationFrame(draw);
    };

    resize();
    for (let i = 0; i < 6; i++) spawn();
    draw();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [cell, accent, line]);

  return <canvas ref={ref} className={className} aria-hidden="true" />;
}
