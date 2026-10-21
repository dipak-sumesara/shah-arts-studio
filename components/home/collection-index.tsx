import Link from "next/link"
import { Reveal } from "@/components/site/reveal"
import { collections, img } from "@/lib/data"

const tints = ["bg-blush", "bg-butter", "bg-sky", "bg-mint", "bg-lilac", "bg-peach"]
const hrefFor = (slug: string) => (slug === "hand-casting" ? "/hand-casting" : `/products/${slug}`)

export function CollectionIndex() {
  return (
    <section className="section">
      <div className="wrap">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="hand text-2xl text-rose-deep">made with love</p>
          <h2 className="display t-h2 mt-1">Keepsakes for every little moment</h2>
          <p className="lead mt-3">Six crafts, one promise: pieces made slowly, by hand, to last a lifetime.</p>
        </Reveal>
        <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-6">
          {collections.map((c, i) => (
            <Reveal key={c.slug} delay={(i % 3) * 0.06}>
              <Link href={hrefFor(c.slug)} className={`group flex h-full flex-col rounded-[28px] ${tints[i]} p-2.5 transition-transform duration-300 hover:-translate-y-1.5 md:rounded-[36px] md:p-3`}>
                <div className="aspect-[4/5] overflow-hidden rounded-[999px_999px_22px_22px] bg-milk md:rounded-[999px_999px_28px_28px]">
                  <img src={img(c.image, true)} alt={c.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="flex flex-1 flex-col px-2 pb-2 pt-4 md:px-3">
                  <h3 className="display text-[1.05rem] font-semibold leading-tight md:text-xl">{c.name}</h3>
                  <p className="mt-1 hidden text-sm text-plum-soft md:block">{c.short}</p>
                  <p className="mt-auto pt-3 text-xs font-extrabold text-rose-deep md:text-sm">{c.price}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
