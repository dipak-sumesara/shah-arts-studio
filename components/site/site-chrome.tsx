"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { Wordmark } from "./logo"
import { Cloud, Heart, Sparkle } from "@/components/art/art"
import { BRAND, img, searchIndex } from "@/lib/data"

const NAV = [
  { href: "/hand-casting", label: "Hand Casting", sub: "Tiny hands & feet, in 3D", image: "handcast-3", tint: "bg-blush" },
  { href: "/products/baby-products", label: "Baby Keepsakes", sub: "Little things to treasure", image: "baby-keepsake", tint: "bg-butter" },
  { href: "/products/resin-art", label: "All Collections", sub: "Resin, glass, lipan, decor", image: "resin-clock", tint: "bg-sky" },
  { href: "/courses", label: "Academy", sub: "Courses & workshops", image: "mandala", tint: "bg-mint" },
  { href: "/availability", label: "Cities We Visit", sub: "We come to your door", image: "lipan", tint: "bg-lilac" },
]

const PhoneIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13 1.05.36 2.07.7 3.06a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.02-1.27a2 2 0 0 1 2.11-.45c.99.34 2.01.57 3.06.7A2 2 0 0 1 22 16.92z" /></svg>
)

export function SiteChrome() {
  const [menu, setMenu] = useState(false)
  const [cmd, setCmd] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [solid, setSolid] = useState(false)
  const pathname = usePathname()
  const { scrollY } = useScroll()
  const last = useRef(0)

  useMotionValueEvent(scrollY, "change", (y) => {
    setSolid(y > 12)
    setHidden(y > last.current && y > 300)
    last.current = y
  })
  useEffect(() => { setMenu(false); setCmd(false) }, [pathname])
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); setCmd((v) => !v) }
      if (e.key === "Escape") { setMenu(false); setCmd(false) }
    }
    addEventListener("keydown", onKey)
    return () => removeEventListener("keydown", onKey)
  }, [])
  useEffect(() => { document.documentElement.style.overflow = menu || cmd ? "hidden" : "" }, [menu, cmd])

  const onBook = pathname === "/book"
  return (
    <>
      <motion.header
        animate={{ y: hidden && !menu ? "-110%" : 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed inset-x-0 top-0 z-50 transition-[background,box-shadow] duration-300 ${solid || menu ? "bg-cream shadow-[0_4px_24px_rgba(120,70,90,.08)]" : ""}`}
      >
        <div className="wrap flex h-16 items-center justify-between md:h-[72px]">
          <Link href="/" aria-label="Shah Art Studio — home" onClick={() => setMenu(false)}><Wordmark /></Link>
          <div className="flex items-center gap-2">
            <button onClick={() => setCmd(true)} aria-label="Search" className="grid h-11 w-11 place-items-center rounded-full transition hover:bg-blush/60">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.5-4.5" /></svg>
            </button>
            {!onBook && (
              <Link href="/book" className="hidden rounded-full bg-rose px-5 py-2.5 text-sm font-bold text-white shadow-[0_8px_20px_rgba(232,115,138,.35)] transition hover:bg-rose-deep sm:block">Book a visit</Link>
            )}
            <button onClick={() => setMenu((v) => !v)} aria-expanded={menu} className="flex h-11 items-center gap-2.5 rounded-full bg-plum pl-4 pr-3.5 text-sm font-bold text-cream transition hover:bg-night">
              {menu ? "Close" : "Menu"}
              <span className="relative block h-2.5 w-4">
                <span className={`absolute left-0 h-[2px] w-full rounded bg-current transition-all ${menu ? "top-1 rotate-45" : "top-0"}`} />
                <span className={`absolute left-0 h-[2px] rounded bg-current transition-all ${menu ? "top-1 w-full -rotate-45" : "top-[7px] w-2/3"}`} />
              </span>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile: one friendly bar — Book + Call */}
      {!onBook && !menu && (
        <div className="fixed inset-x-3 bottom-3 z-40 flex items-center gap-2 sm:hidden" style={{ paddingBottom: "env(safe-area-inset-bottom)" }}>
          <Link href="/book" className="flex h-14 flex-1 items-center justify-center gap-2 rounded-full bg-rose text-base font-bold text-white shadow-[0_12px_30px_rgba(232,115,138,.5)]">
            Book a visit <Heart className="beat h-4 w-4" />
          </Link>
          <a href={BRAND.phoneHref} aria-label="Call the studio" className="grid h-14 w-14 place-items-center rounded-full bg-plum text-cream shadow-xl"><PhoneIcon /></a>
        </div>
      )}
      {!onBook && (
        <a href={BRAND.phoneHref} aria-label="Call the studio" className="fixed bottom-6 right-6 z-40 hidden h-14 w-14 place-items-center rounded-full bg-plum text-cream shadow-xl transition hover:scale-110 hover:bg-rose sm:grid"><PhoneIcon /></a>
      )}

      <AnimatePresence>{menu && <Menu key="menu" onClose={() => setMenu(false)} />}</AnimatePresence>
      <AnimatePresence>{cmd && <Command key="cmd" onClose={() => setCmd(false)} />}</AnimatePresence>
    </>
  )
}

function Menu({ onClose }: { onClose: () => void }) {
  const [hover, setHover] = useState(NAV[0].image)
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-40 overflow-y-auto bg-cream pt-20"
    >
      <Cloud className="floaty absolute -right-6 top-24 w-44 text-blush/70" />
      <Cloud className="drift absolute -left-8 bottom-40 w-40 text-sky/80" />
      <div className="wrap relative grid gap-8 pb-28 pt-4 md:grid-cols-[1.2fr_1fr] md:gap-16 md:pb-12">
        <nav className="flex flex-col gap-2.5">
          {NAV.map((n, i) => (
            <motion.div key={n.href} initial={{ y: 24, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.08 + i * 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}>
              <Link href={n.href} onClick={onClose} onMouseEnter={() => setHover(n.image)} className={`group flex items-center gap-4 rounded-[24px] ${n.tint} px-5 py-4 transition-transform duration-300 hover:translate-x-1.5 md:py-5`}>
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-milk/80 text-sm font-extrabold">{i + 1}</span>
                <span className="min-w-0 flex-1">
                  <span className="display t-h3 block">{n.label}</span>
                  <span className="block text-sm text-plum-soft">{n.sub}</span>
                </span>
                <span className="text-xl transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </motion.div>
          ))}
          <p className="mt-3 text-center text-sm text-plum-soft md:text-left">Questions? Call <a href={BRAND.phoneHref} className="font-bold text-rose-deep underline underline-offset-4">{BRAND.phone}</a></p>
        </nav>
        <div className="hidden md:block">
          <div className="relative mx-auto aspect-[3/4] w-full max-w-[340px] overflow-hidden rounded-[999px_999px_36px_36px] border-[6px] border-milk bg-blush shadow-xl">
            <AnimatePresence mode="popLayout">
              <motion.img key={hover} src={img(hover)} alt="" initial={{ opacity: 0, scale: 1.08 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} className="absolute inset-0 h-full w-full object-cover" />
            </AnimatePresence>
          </div>
          <p className="hand mt-6 text-center text-3xl text-rose-deep">little hands, big memories</p>
        </div>
      </div>
    </motion.div>
  )
}

function Command({ onClose }: { onClose: () => void }) {
  const [q, setQ] = useState("")
  const [idx, setIdx] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()
  const results = useMemo(() => {
    const s = q.trim().toLowerCase()
    return searchIndex.filter((r) => !s || r.label.toLowerCase().includes(s) || r.group.toLowerCase().includes(s))
  }, [q])
  useEffect(() => { inputRef.current?.focus() }, [])
  useEffect(() => setIdx(0), [q])
  const open = useCallback((href: string) => { onClose(); router.push(href) }, [onClose, router])
  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") { e.preventDefault(); setIdx((i) => Math.min(i + 1, results.length - 1)) }
    if (e.key === "ArrowUp") { e.preventDefault(); setIdx((i) => Math.max(i - 1, 0)) }
    if (e.key === "Enter" && results[idx]) open(results[idx].href)
  }
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[60] flex items-start justify-center bg-plum/50 p-3 pt-[10vh]" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <motion.div initial={{ y: 24, scale: 0.97 }} animate={{ y: 0, scale: 1 }} exit={{ y: 16, opacity: 0 }} transition={{ type: "spring", damping: 26, stiffness: 320 }} className="w-full max-w-lg overflow-hidden rounded-[28px] bg-milk shadow-2xl">
        <div className="flex items-center gap-3 border-b border-plum/10 px-5">
          <Sparkle className="h-4 w-4 text-gold" />
          <input ref={inputRef} value={q} onChange={(e) => setQ(e.target.value)} onKeyDown={onKey} placeholder="Search the studio…" className="display w-full bg-transparent py-4 text-xl outline-none placeholder:text-plum/30" />
          <button onClick={onClose} className="rounded-full bg-blush px-3 py-1.5 text-xs font-bold">Esc</button>
        </div>
        <ul className="max-h-[55vh] overflow-y-auto p-2">
          {results.length === 0 && <li className="px-4 py-6 text-center text-sm text-mute">Nothing found — try “resin” or “book”.</li>}
          {results.map((r, i) => (
            <li key={r.label + r.href}>
              <button onMouseEnter={() => setIdx(i)} onClick={() => open(r.href)} className={`flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left transition ${i === idx ? "bg-blush" : ""}`}>
                <span className="font-semibold">{r.label}</span>
                <span className="text-xs font-bold text-mute">{r.group}</span>
              </button>
            </li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  )
}
