import Link from "next/link"
import { Mark } from "./logo"
import { Cloud, Heart, Moon, Stars } from "@/components/art/art"
import { BRAND } from "@/lib/data"

export function Footer() {
  return (
    <footer className="relative mt-20 overflow-hidden rounded-t-[40px] bg-plum text-cream md:mt-28 md:rounded-t-[64px]">
      <Stars className="opacity-70" />
      <Moon className="floaty absolute right-8 top-10 w-14 text-butter md:right-24 md:w-20" />
      <Cloud className="drift absolute -left-10 top-24 w-44 text-cream/[.07]" />
      <div className="wrap relative pb-28 pt-14 sm:pb-10 md:pt-20">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr] md:gap-16">
          <div>
            <div className="flex items-center gap-3"><Mark className="h-12 w-12" /><p className="display t-h3">Shah Art Studio <span className="hand text-xl text-blush">&amp; Academy</span></p></div>
            <p className="hand mt-6 text-3xl text-blush md:text-4xl">little hands, big memories</p>
            <p className="mt-3 max-w-sm text-cream/65">Tell us about your little one. We'll take care of the rest — right at your doorstep.</p>
            <a href={BRAND.phoneHref} className="mt-6 inline-flex items-center gap-3 rounded-full bg-rose px-6 py-3.5 font-bold text-white transition hover:bg-rose-deep">Call {BRAND.phone}</a>
          </div>
          <div className="space-y-2 text-sm">
            <p className="eyebrow mb-3 text-butter">Studio</p>
            <p className="text-cream/75">[Placeholder Address]<br />{BRAND.city}</p>
            <p className="text-cream/75">[Placeholder Email]</p>
          </div>
          <div className="space-y-2.5 text-sm">
            <p className="eyebrow mb-3 text-butter">Explore</p>
            {[["/book", "Book a visit"], ["/hand-casting", "Hand Casting"], ["/courses", "Courses / Workshop"], ["/availability", "Service cities"]].map(([h, l]) => (
              <Link key={h} href={h} className="block w-fit py-1 text-cream/75 transition hover:text-white">{l}</Link>
            ))}
          </div>
        </div>
        <div className="mt-12 flex flex-wrap items-center justify-between gap-3 border-t border-cream/10 pt-6 text-xs text-cream/50">
          <span>© 2026 Shah Art Studio &amp; Academy</span>
          <span className="flex items-center gap-1.5">Made with <Heart className="beat h-3.5 w-3.5 text-rose" /> for little hands</span>
        </div>
      </div>
    </footer>
  )
}
