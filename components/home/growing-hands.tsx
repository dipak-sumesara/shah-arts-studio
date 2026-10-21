"use client"

import Link from "next/link"
import { useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { Cloud, Sparkle } from "@/components/art/art"
import { ageStages, handCm, img } from "@/lib/data"

/** Stylised hand built from round-capped strokes. 200×270 box, wrist at y≈246. */
function HandShape({ fill, tips }: { fill: string; tips?: boolean }) {
  const fingers: [number, number, number][] = [[70, 128, 62], [97, 128, 34], [124, 128, 52], [148, 138, 88]]
  return (
    <g>
      <g stroke={fill} strokeLinecap="round" fill="none" strokeWidth="25">
        {fingers.map(([x, y1, y2]) => <path key={x} d={`M${x} ${y1}V${y2}`} />)}
        <path d="M52 178 L24 132" strokeWidth="27" />
      </g>
      <rect x="46" y="118" width="116" height="128" rx="52" fill={fill} />
      {tips && (
        <g fill="#E2B04A">
          {fingers.map(([x, , y2]) => <circle key={x} cx={x} cy={y2} r="7" />)}
          <circle cx="24" cy="132" r="7.5" />
        </g>
      )}
    </g>
  )
}

const RINGS = [0, 6, 12, 24]

export function GrowingHands() {
  const [m, setM] = useState(3)
  const cm = handCm(m)
  const maxCm = handCm(24)
  const stage = ageStages.find((s) => m <= s.max) ?? ageStages[ageStages.length - 1]
  const label = m === 0 ? "Newborn" : m < 12 ? `${m} month${m > 1 ? "s" : ""}` : m === 12 ? "1 year" : m === 24 ? "2 years" : `${(m / 12).toFixed(1)} years`

  return (
    <section className="section relative overflow-hidden">
      <Cloud className="drift absolute -right-8 top-10 w-40 text-sky/80" />
      <div className="wrap relative">
        <div className="mx-auto max-w-2xl text-center">
          <p className="hand text-2xl text-rose-deep">a little something for you</p>
          <h2 className="display t-h2 mt-1">Watch how fast <em className="text-rose">they grow</em></h2>
          <p className="lead mt-3">Slide to your baby's age. That's the tiny hand you'd love to keep — and the window is shorter than it feels.</p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-stretch lg:gap-10">
          <div className="relative flex h-[320px] items-end justify-center overflow-hidden rounded-[32px] bg-sky sm:h-[400px] lg:h-auto lg:min-h-[460px]">
            <Sparkle className="twinkle absolute left-6 top-6 h-5 w-5 text-white" />
            <Sparkle className="twinkle absolute bottom-24 right-8 h-4 w-4 text-white" style={{ animationDelay: "1s" }} />
            <svg viewBox="-34 0 234 270" className="h-[92%]" aria-label={`Illustration of a baby hand about ${cm} centimetres long`}>
              {[2, 4, 6, 8, 10].map((c) => {
                const y = 246 - c * (224.5 / maxCm)
                return (
                  <g key={c} className="text-plum/35">
                    <line x1="-30" x2="-18" y1={y} y2={y} stroke="currentColor" strokeWidth="1.2" />
                    <text x="-15" y={y + 3} fontSize="8" fontWeight="700" fill="currentColor">{c} cm</text>
                  </g>
                )
              })}
              {RINGS.filter((r) => r < m).map((r) => (
                <g key={r} transform={`translate(100 246) scale(${handCm(r) / maxCm}) translate(-100 -246)`} opacity=".4"><HandShape fill="#FFFFFF" /></g>
              ))}
              <motion.g style={{ originX: "100px", originY: "246px" }} animate={{ scale: cm / maxCm }} transition={{ type: "spring", stiffness: 140, damping: 20 }}>
                <HandShape fill="#FADADD" tips />
              </motion.g>
            </svg>
            <div className="absolute right-4 top-4 rounded-full bg-milk px-4 py-2 text-sm font-extrabold text-rose-deep shadow">≈ {cm} cm</div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="rounded-[32px] bg-milk p-6 shadow-[0_10px_30px_rgba(120,70,90,.08)] md:p-8">
              <p className="eyebrow text-mute">Baby's age</p>
              <AnimatePresence mode="popLayout">
                <motion.p key={label} initial={{ y: 16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -16, opacity: 0 }} transition={{ duration: 0.25 }} className="display mt-1 text-[clamp(2.4rem,9vw,4rem)] text-rose-deep">{label}</motion.p>
              </AnimatePresence>
              <input type="range" min={0} max={24} value={m} onChange={(e) => setM(+e.target.value)} aria-label="Baby age in months" className="growth mt-5" style={{ ["--p" as string]: `${(m / 24) * 100}%` }} />
              <div className="mt-3 flex justify-between text-xs font-bold text-mute"><span>Newborn</span><span>1 year</span><span>2 years</span></div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div key={stage.rec} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="grid grid-cols-[96px_1fr] items-center gap-4 rounded-[32px] bg-butter p-3 md:grid-cols-[120px_1fr]">
                <div className="aspect-[3/4] overflow-hidden rounded-[999px_999px_20px_20px] bg-milk"><img src={img(stage.image, true)} alt={stage.rec} className="h-full w-full object-cover" /></div>
                <div className="py-1 pr-2">
                  <p className="eyebrow text-rose-deep">Perfect right now</p>
                  <h3 className="display t-h3 mt-1">{stage.rec}</h3>
                  <p className="mt-1 text-sm text-plum-soft">{stage.line}</p>
                  <Link href={stage.slug === "hand-casting" ? "/hand-casting" : `/products/${stage.slug}`} className="mt-2 inline-block text-sm font-extrabold text-rose-deep underline underline-offset-4">Explore →</Link>
                </div>
              </motion.div>
            </AnimatePresence>
            <p className="text-xs text-mute">Illustrative sizes to show how quickly hands grow — every baby is different.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
