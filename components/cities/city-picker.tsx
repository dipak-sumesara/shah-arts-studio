"use client"

import Link from "next/link"
import { useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { Heart } from "@/components/art/art"
import { statesData } from "@/lib/data"

export function CityPicker() {
  const [state, setState] = useState<string | null>(null)
  const [city, setCity] = useState<string | null>(null)
  return (
    <div className="grid gap-6 md:grid-cols-[1.1fr_1fr] md:gap-12">
      <div>
        <p className="mb-3 text-sm font-extrabold"><span className="text-rose-deep">1.</span> Choose your state <span className="ml-1 rounded-full bg-butter px-2.5 py-0.5 text-xs">India</span></p>
        <div className="flex flex-wrap gap-2">
          {Object.keys(statesData).map((s) => (
            <button key={s} onClick={() => { setState(s); setCity(null) }} className={`h-12 rounded-full border-2 px-5 text-sm font-bold transition ${state === s ? "border-rose bg-rose text-white" : "border-plum/10 bg-milk hover:border-rose"}`}>{s}</button>
          ))}
        </div>
        <p className="mt-5 text-sm text-mute">More countries — USA, UK, UAE — coming soon.</p>
      </div>

      <div className="md:sticky md:top-24 md:self-start">
        <AnimatePresence mode="wait">
          {!state ? (
            <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid min-h-[200px] place-items-center rounded-[32px] border-2 border-dashed border-plum/15 p-8 text-center text-mute">Pick a state to see the cities we visit ♡</motion.div>
          ) : (
            <motion.div key={state} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }} className="rounded-[32px] bg-sky p-6 md:p-8">
              <p className="text-sm font-extrabold"><span className="text-rose-deep">2.</span> Choose a city in {state}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {statesData[state].map((c) => (
                  <button key={c} onClick={() => setCity(c)} className={`h-12 rounded-full border-2 px-5 text-sm font-bold transition ${city === c ? "border-rose bg-rose text-white" : "border-transparent bg-milk hover:border-rose"}`}>{c}</button>
                ))}
              </div>
              <AnimatePresence>
                {city && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                    <div className="mt-6 rounded-[24px] bg-milk p-5 text-center">
                      <Heart className="beat mx-auto h-6 w-6 text-rose" />
                      <p className="display t-h2 mt-2">We come to {city}!</p>
                      <p className="mt-1 text-xs text-mute">India → {state} → {city}</p>
                      <Link href="/book" className="mt-4 inline-flex h-12 items-center rounded-full bg-rose px-7 font-bold text-white transition hover:bg-rose-deep">Book a visit here →</Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
