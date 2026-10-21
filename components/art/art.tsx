import { cn } from "@/lib/utils"

type P = { className?: string; style?: React.CSSProperties }

export function Cloud({ className }: P) {
  return (
    <svg viewBox="0 0 160 80" className={cn("pointer-events-none", className)} aria-hidden>
      <path d="M40 70a26 26 0 0 1-2-51 34 34 0 0 1 64-6 28 28 0 0 1 14 55z" fill="currentColor" />
    </svg>
  )
}

export function Sparkle({ className, style }: P) {
  return (
    <svg viewBox="0 0 24 24" className={cn("pointer-events-none", className)} style={style} aria-hidden>
      <path d="M12 0c1 7 5 11 12 12-7 1-11 5-12 12-1-7-5-11-12-12 7-1 11-5 12-12z" fill="currentColor" />
    </svg>
  )
}

export function Moon({ className }: P) {
  return (
    <svg viewBox="0 0 64 64" className={cn("pointer-events-none", className)} aria-hidden>
      <path d="M44 6a28 28 0 1 0 14 40A24 24 0 0 1 44 6z" fill="currentColor" />
    </svg>
  )
}

export function Heart({ className }: P) {
  return (
    <svg viewBox="0 0 24 24" className={cn("pointer-events-none", className)} aria-hidden>
      <path d="M12 21s-8-5.2-8-11a4.6 4.6 0 0 1 8-3 4.6 4.6 0 0 1 8 3c0 5.800-8 11-8 11z" fill="currentColor" />
    </svg>
  )
}

/** Pastel rainbow arch, stroked so the colours stay crisp at any size. */
export function Rainbow({ className }: P) {
  const cols = ["#F6B6BE", "#FFE08A", "#B9E2C8", "#B8D9F2"]
  return (
    <svg viewBox="0 0 200 110" className={cn("pointer-events-none", className)} fill="none" strokeLinecap="round" aria-hidden>
      {cols.map((c, i) => <path key={c} d={`M${12 + i * 14} 104a${88 - i * 14} ${88 - i * 14} 0 0 1 ${176 - i * 28} 0`} stroke={c} strokeWidth="12" />)}
    </svg>
  )
}

/** A pair of tiny footprints; rotate to make a trail. */
export function Footprints({ className }: P) {
  const Foot = ({ x, y, r }: { x: number; y: number; r: number }) => (
    <g transform={`translate(${x} ${y}) rotate(${r})`} fill="currentColor">
      <ellipse cx="0" cy="0" rx="6.5" ry="10" />
      <ellipse cx="0" cy="14" rx="5" ry="4.2" />
      {[-7, -3.5, 0, 3.5, 7].map((dx, i) => <circle key={i} cx={dx} cy={-14 - Math.abs(dx) * -0.1 + (i === 0 || i === 4 ? 3 : 0)} r={i === 0 ? 2.6 : 2.2} />)}
    </g>
  )
  return (
    <svg viewBox="0 0 60 70" className={cn("pointer-events-none", className)} aria-hidden>
      <Foot x={18} y={44} r={-12} />
      <Foot x={42} y={22} r={10} />
    </svg>
  )
}

export function Stars({ className }: P) {
  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)} aria-hidden>
      {[
        ["8%", "18%", 14, "0s"], ["22%", "64%", 10, ".8s"], ["46%", "10%", 12, "1.4s"], ["64%", "78%", 9, ".4s"],
        ["82%", "26%", 16, "2s"], ["92%", "58%", 10, "1.1s"], ["34%", "38%", 8, "2.4s"],
      ].map(([l, t, s, d], i) => (
        <Sparkle key={i} className="twinkle absolute text-gold" style={{ left: l as string, top: t as string, width: s as number, height: s as number, animationDelay: d as string } as React.CSSProperties} />
      ))}
    </div>
  )
}
