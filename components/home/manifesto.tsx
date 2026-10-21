"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform, type MotionValue } from "motion/react"
import { Footprints, Heart } from "@/components/art/art"

const TEXT =
  "Their hands will never be this small again. In a year the lines on those palms will change, the fingers will stretch, the dimples will fade. We make sure you never forget exactly how it felt."

function Word({ w, i, n, p }: { w: string; i: number; n: number; p: MotionValue<number> }) {
  const start = (i / n) * 0.75
  const o = useTransform(p, [start, start + 0.1], [0.22, 1])
  return <motion.span style={{ opacity: o }} className="mr-[.25em] inline-block">{w}</motion.span>
}

export function Manifesto() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.9", "end 0.6"] })
  const words = TEXT.split(" ")
  return (
    <section className="px-3 py-4 md:px-6">
      <div ref={ref} className="relative mx-auto max-w-[1280px] overflow-hidden rounded-[36px] bg-lilac px-6 py-16 text-center md:rounded-[56px] md:py-28">
        <Footprints className="absolute left-4 top-6 w-14 -rotate-12 text-plum/10 md:left-16 md:w-20" />
        <Footprints className="absolute bottom-6 right-4 w-14 rotate-[18deg] text-plum/10 md:right-16 md:w-20" />
        <Heart className="beat mx-auto mb-5 h-7 w-7 text-rose" />
        <p className="display t-h2 mx-auto max-w-3xl leading-[1.25]">
          {words.map((w, i) => <Word key={i} w={w} i={i} n={words.length} p={scrollYProgress} />)}
        </p>
        <p className="hand mt-6 text-2xl text-rose-deep md:text-3xl">— that's why we cast them.</p>
      </div>
    </section>
  )
}
