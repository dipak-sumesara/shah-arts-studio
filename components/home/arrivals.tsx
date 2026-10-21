import Link from "next/link"
import { Reveal } from "@/components/site/reveal"
import { img, newArrivals } from "@/lib/data"

const tints = ["bg-blush", "bg-sky", "bg-butter", "bg-mint", "bg-lilac", "bg-peach", "bg-sky"]

export function Arrivals() {
  return (
    <section className="overflow-hidden bg-milk py-14 md:py-24">
      <div className="wrap">
        <Reveal className="mb-8 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-rose-deep"><span className="h-2 w-2 animate-pulse rounded-full bg-rose" />Fresh from the studio</p>
            <h2 className="display t-h2 mt-1">New arrivals</h2>
          </div>
          <p className="text-sm text-mute">Swipe to see more →</p>
        </Reveal>
      </div>
      <div className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-3 md:px-[max(2.5rem,calc((100vw-1180px)/2))]">
        {newArrivals.map((a, i) => (
          <Link key={a.name} href={a.slug === "hand-casting" ? "/hand-casting" : `/products/${a.slug}`} className={`group w-[220px] shrink-0 snap-start rounded-[28px] ${tints[i]} p-2.5 md:w-[270px]`}>
            <div className="aspect-[4/5] overflow-hidden rounded-[999px_999px_20px_20px] bg-milk">
              <img src={img(a.image, true)} alt={a.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
            <div className="px-2 pb-2 pt-4">
              <span className="rounded-full bg-milk px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-rose-deep">New</span>
              <h3 className="display mt-2 text-lg font-semibold leading-tight">{a.name}</h3>
              <p className="mt-0.5 text-xs font-bold text-plum-soft">{a.cat}</p>
            </div>
          </Link>
        ))}
        <div className="w-1 shrink-0" />
      </div>
    </section>
  )
}
