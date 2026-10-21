import { Reveal } from "@/components/site/reveal"
import { Footprints } from "@/components/art/art"
import { process as steps } from "@/lib/data"

const tints = ["bg-blush", "bg-butter", "bg-mint", "bg-sky"]
const emoji = ["📅", "🏡", "🤲", "🖼️"]

export function Process() {
  return (
    <section className="section">
      <div className="wrap">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="hand text-2xl text-rose-deep">gentle, simple, magical</p>
          <h2 className="display t-h2 mt-1">From first touch to forever</h2>
          <p className="lead mt-3">The whole thing takes about five minutes of your baby's time.</p>
        </Reveal>
        <ol className="relative mt-10 grid gap-4 md:grid-cols-4 md:gap-5">
          {steps.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.08}>
              <li className={`relative h-full rounded-[28px] ${tints[i]} p-6`}>
                <div className="flex items-center justify-between">
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-milk font-display text-lg font-extrabold text-rose-deep">{i + 1}</span>
                  <span className="text-2xl">{emoji[i]}</span>
                </div>
                <h3 className="display t-h3 mt-5">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-plum-soft">{s.body}</p>
                {i < 3 && <Footprints className="absolute -bottom-7 right-8 z-10 w-9 rotate-90 text-rose/60 md:-right-6 md:bottom-1/2 md:rotate-0" />}
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
