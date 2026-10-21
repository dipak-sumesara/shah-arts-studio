"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { frameTiers, img, type FrameTier } from "@/lib/data"

const tints = ["bg-blush", "bg-butter", "bg-sky", "bg-mint"]

export function FrameTiers() {
  const [tier, setTier] = useState<FrameTier>("classic")
  const t = frameTiers[tier]
  return (
    <>
      <div className="no-scrollbar -mx-5 mb-6 flex gap-2 overflow-x-auto px-5 md:mx-0 md:px-0">
        {(Object.keys(frameTiers) as FrameTier[]).map((k) => (
          <button key={k} onClick={() => setTier(k)} className="relative h-12 shrink-0 rounded-full px-5 text-sm font-extrabold">
            {tier === k && <motion.span layoutId="tier-pill" className="absolute inset-0 rounded-full bg-rose" transition={{ type: "spring", stiffness: 400, damping: 34 }} />}
            <span className={`relative transition-colors ${tier === k ? "text-white" : "text-plum"}`}>{frameTiers[k].label}</span>
          </button>
        ))}
      </div>
      <p className="mb-6 text-sm font-extrabold text-rose-deep">{t.price}</p>
      <AnimatePresence mode="wait">
        <motion.div key={tier} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }} className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-6">
          {t.items.map((name, i) => (
            <div key={name} className={`group rounded-[28px] ${tints[i]} p-2.5 md:rounded-[36px] md:p-3`}>
              <div className="aspect-[3/4] overflow-hidden rounded-[999px_999px_22px_22px] bg-milk">
                <img src={img(t.images[i % t.images.length], true)} alt={name} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <h3 className="display px-2 pb-1 pt-3 text-base font-semibold leading-tight md:text-lg">{name}</h3>
              <p className="px-2 pb-2 text-xs font-extrabold text-rose-deep">{t.price}</p>
            </div>
          ))}
        </motion.div>
      </AnimatePresence>
    </>
  )
}
