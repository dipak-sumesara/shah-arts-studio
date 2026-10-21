"use client"

import Link from "next/link"
import { motion } from "motion/react"
import { Cloud, Heart, Rainbow, Sparkle, Stars } from "@/components/art/art"
import { Mark } from "@/components/site/logo"
import { img } from "@/lib/data"

const rise = (d: number) => ({ initial: { opacity: 0, y: 22 }, animate: { opacity: 1, y: 0 }, transition: { delay: d, duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } })

export function Seal({ className = "", text = "SKIN-SAFE ♡ HANDCRAFTED ♡ AT YOUR DOORSTEP ♡ " }: { className?: string; text?: string }) {
  return (
    <div className={`relative grid place-items-center ${className}`}>
      <svg viewBox="0 0 200 200" className="seal absolute inset-0 h-full w-full" aria-hidden>
        <defs><path id="circ" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" /></defs>
        <text className="fill-current text-[15px] font-extrabold tracking-[.22em]"><textPath href="#circ">{text}{text}</textPath></text>
      </svg>
      <Mark className="h-1/3 w-1/3" />
    </div>
  )
}

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-[radial-gradient(60%_50%_at_8%_0%,#FADADD_0%,transparent_70%),radial-gradient(55%_50%_at_100%_10%,#D5E9F7_0%,transparent_70%),radial-gradient(70%_40%_at_50%_100%,#FFEFB4_0%,transparent_70%)] pb-28 pt-[4.5rem] md:pb-20 md:pt-28">
      <Stars />
      <Cloud className="drift absolute -left-10 top-28 hidden w-40 text-white/80 md:block md:w-56" />
      <Cloud className="floaty-2 absolute right-[-3rem] top-[46%] hidden w-44 text-white/70 md:block" />

      <div className="wrap relative grid items-center gap-6 lg:grid-cols-[1.1fr_.9fr] lg:gap-8">
        <div className="text-center lg:order-first lg:text-left">
          <motion.span {...rise(0.05)} className="hidden sm:inline-flex items-center gap-2 rounded-full bg-milk/90 px-4 py-2 text-xs font-extrabold uppercase tracking-wider text-rose-deep shadow-sm">
            <Heart className="beat h-3.5 w-3.5 text-rose" /> Hand &amp; foot casting for newborns
          </motion.span>
          <motion.h1 {...rise(0.15)} className="display t-hero mt-2 sm:mt-5">
            Preserve precious <em className="text-rose">moments</em> forever<span className="text-gold">.</span>
          </motion.h1>
          <motion.p {...rise(0.3)} className="lead mx-auto mt-3 max-w-lg sm:mt-5 lg:mx-0">
            Those tiny fingers won't stay tiny. We turn five gentle minutes into a 3D keepsake<span className="hidden sm:inline"> you'll cherish for life — made with <b className="font-extrabold text-plum">100% skin-safe organic materials</b></span>, right at your home.
          </motion.p>
          <motion.div {...rise(0.45)} className="mt-5 flex flex-col gap-3 sm:mt-7 sm:flex-row sm:justify-center lg:justify-start">
            <Link href="/book" className="group inline-flex h-14 items-center justify-center gap-2 rounded-full bg-rose px-8 text-base font-bold text-white shadow-[0_12px_30px_rgba(232,115,138,.45)] transition hover:bg-rose-deep">
              Book a visit <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
            <Link href="/hand-casting" className="inline-flex h-12 items-center justify-center rounded-full border-2 sm:h-14 border-plum/15 bg-milk/70 px-8 text-base font-bold transition hover:border-plum hover:bg-milk">See the keepsakes</Link>
          </motion.div>
          <motion.ul {...rise(0.6)} className="mt-7 hidden sm:flex flex-wrap justify-center gap-2 text-sm font-bold lg:justify-start">
            {[["Skin-safe", "bg-mint"], ["About 5 minutes", "bg-butter"], ["At-home visits", "bg-lilac"]].map(([t, c]) => (
              <li key={t} className={`rounded-full ${c} px-4 py-2`}>{t}</li>
            ))}
          </motion.ul>
        </div>

        {/* Arch portrait + rainbow */}
        <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.25, duration: 1, ease: [0.16, 1, 0.3, 1] }} className="relative order-first mx-auto mt-2 w-[min(150px,40%)] sm:mt-6 sm:w-[340px] lg:order-last lg:w-[min(380px,100%)]">
          <Rainbow className="absolute -top-[16%] left-1/2 w-[150%] -translate-x-1/2" />
          <div className="relative aspect-[1/1.1] overflow-hidden sm:aspect-[3/4] rounded-[999px_999px_36px_36px] border-[7px] border-milk bg-peach shadow-[0_30px_60px_rgba(150,80,100,.22)]">
            <img src={img("handcast-3")} alt="A newborn's hand and foot cast, framed" className="h-full w-full object-cover" fetchPriority="high" />
          </div>
          <Cloud className="floaty absolute -bottom-6 -left-12 w-36 text-white drop-shadow-sm sm:w-44" />
          <Sparkle className="twinkle absolute -right-3 top-[14%] h-7 w-7 text-gold" />
          <div className="floaty absolute -left-5 top-[18%] hidden sm:flex items-center gap-2 rounded-2xl bg-milk px-3.5 py-2.5 text-sm font-extrabold shadow-lg sm:-left-12">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-butter text-base">⏱</span>5 gentle minutes
          </div>
          <div className="floaty-2 absolute -right-4 bottom-[12%] hidden sm:flex items-center gap-2 rounded-2xl bg-milk px-3.5 py-2.5 text-sm font-extrabold shadow-lg sm:-right-10">
            <Heart className="beat h-5 w-5 text-rose" />100% skin-safe
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export function Marquee() {
  const words = ["Hand Casting", "Baby Keepsakes", "Resin Art", "Glass Painting", "Lipan Art", "Home Decor", "Skin-safe", "Handcrafted with love"]
  const row = words.map((w) => (
    <span key={w} className="flex items-center gap-6 whitespace-nowrap px-3">
      <span className="display text-lg italic md:text-2xl">{w}</span><Heart className="h-4 w-4 text-rose" />
    </span>
  ))
  return (
    <div className="overflow-hidden bg-blush py-4 text-plum" aria-hidden>
      <div className="marq flex w-max">{row}{row}</div>
    </div>
  )
}
