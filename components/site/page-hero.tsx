import { Cloud, Stars } from "@/components/art/art"
import { img } from "@/lib/data"

const TINTS = {
  blush: "bg-blush", butter: "bg-butter", sky: "bg-sky", mint: "bg-mint", lilac: "bg-lilac",
} as const

export function PageHero({ eyebrow, title, sub, image, tint = "blush" }: { eyebrow: string; title: React.ReactNode; sub: string; image?: string; tint?: keyof typeof TINTS }) {
  return (
    <section className="px-3 pt-20 md:px-6 md:pt-24">
      <div className={`relative mx-auto max-w-[1280px] overflow-hidden rounded-[32px] ${TINTS[tint]} px-6 py-10 md:rounded-[48px] md:px-14 md:py-16`}>
        <Stars />
        <Cloud className="drift absolute -left-6 bottom-2 w-36 text-white/70" />
        <Cloud className="floaty-2 absolute right-24 top-3 hidden w-32 text-white/60 md:block" />
        <div className="relative grid items-center gap-6 md:grid-cols-[1fr_auto] md:gap-12">
          <div className="text-center md:text-left">
            <p className="hand text-2xl text-rose-deep md:text-3xl">{eyebrow}</p>
            <h1 className="display t-h1 mt-1">{title}</h1>
            <p className="lead mx-auto mt-3 max-w-lg md:mx-0">{sub}</p>
          </div>
          {image && (
            <div className="mx-auto aspect-[3/4] w-[140px] overflow-hidden rounded-[999px_999px_24px_24px] border-[5px] border-milk bg-milk shadow-lg md:w-[210px]">
              <img src={img(image, true)} alt="" className="h-full w-full object-cover" />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
