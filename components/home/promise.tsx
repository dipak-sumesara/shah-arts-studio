import { Reveal } from "@/components/site/reveal"
import { Heart, Moon, Sparkle } from "@/components/art/art"
import { statesData } from "@/lib/data"

export function Promise3() {
  const states = Object.keys(statesData).length
  const facts = [
    { Icon: Heart, tint: "bg-blush", color: "text-rose", head: "100% skin-safe", body: "Every material that touches your baby is gentle, organic and safe for delicate skin." },
    { Icon: Moon, tint: "bg-butter", color: "text-gold", head: `We visit ${states} states`, body: "Our artists come to your door — nothing to carry, nowhere to rush a newborn." },
    { Icon: Sparkle, tint: "bg-lilac", color: "text-rose-deep", head: "Finished by hand", body: "Each cast is detailed, gilded and framed by hand in our Ahmedabad studio." },
  ]
  return (
    <section className="px-3 pb-4 md:px-6">
      <div className="mx-auto grid max-w-[1280px] gap-3 md:grid-cols-3 md:gap-5">
        {facts.map(({ Icon, tint, color, head, body }, i) => (
          <Reveal key={head} delay={i * 0.08}>
            <div className={`h-full rounded-[32px] ${tint} p-7 md:p-9`}>
              <span className="grid h-14 w-14 place-items-center rounded-full bg-milk"><Icon className={`h-7 w-7 ${color}`} /></span>
              <h3 className="display t-h3 mt-5">{head}</h3>
              <p className="mt-2 text-plum-soft">{body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
