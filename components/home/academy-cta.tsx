import Link from "next/link"
import { Reveal } from "@/components/site/reveal"
import { Cloud, Moon, Stars } from "@/components/art/art"
import { img } from "@/lib/data"

export function AcademyTeaser() {
  return (
    <section className="section">
      <div className="wrap grid items-center gap-8 md:grid-cols-2 md:gap-16">
        <Reveal className="grid grid-cols-2 gap-3">
          <div className="aspect-[3/4] overflow-hidden rounded-[999px_999px_28px_28px] bg-mint"><img src={img("mandala", true)} alt="Dot mandala artwork" loading="lazy" className="h-full w-full object-cover" /></div>
          <div className="mt-10 aspect-[3/4] overflow-hidden rounded-[28px] bg-butter"><img src={img("sketching", true)} alt="Sketching class" loading="lazy" className="h-full w-full object-cover" /></div>
        </Reveal>
        <Reveal delay={0.08} className="text-center md:text-left">
          <p className="hand text-2xl text-rose-deep">for the creative parent</p>
          <h2 className="display t-h2 mt-1">Learn the craft with us</h2>
          <p className="lead mt-3">Lipan, hand casting, texture art, dot mandala, sketching and baby drawing — taught by the artists behind the studio.</p>
          <Link href="/courses" className="mt-6 inline-flex h-12 items-center rounded-full border-2 border-plum/15 bg-milk px-7 font-bold transition hover:border-plum">View workshops →</Link>
        </Reveal>
      </div>
    </section>
  )
}

export function FinalCta() {
  return (
    <section className="px-3 md:px-6">
      <Reveal className="relative mx-auto max-w-[1280px] overflow-hidden rounded-[36px] bg-[linear-gradient(160deg,#FADADD,#E7DEF9)] px-6 py-16 text-center md:rounded-[56px] md:py-24">
        <Stars />
        <Moon className="floaty absolute right-6 top-6 w-14 text-butter md:right-20 md:top-10 md:w-20" />
        <Cloud className="drift absolute -left-10 bottom-4 w-44 text-white/70" />
        <div className="relative">
          <p className="hand text-2xl text-rose-deep md:text-3xl">they grow so fast…</p>
          <h2 className="display t-h1 mx-auto mt-2 max-w-2xl">Don't let this moment slip by</h2>
          <p className="lead mx-auto mt-4 max-w-md">Reserve a slot with a fully refundable ₹500 advance. We come to you.</p>
          <Link href="/book" className="mt-8 inline-flex h-14 items-center gap-2 rounded-full bg-rose px-9 text-base font-bold text-white shadow-[0_12px_30px_rgba(232,115,138,.45)] transition hover:bg-rose-deep">Reserve my slot ♡</Link>
        </div>
      </Reveal>
    </section>
  )
}
