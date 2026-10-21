"use client"

import Link from "next/link"
import { useEffect, useMemo, useRef, useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { BRAND, bookingCities, slots } from "@/lib/data"
import { Mark } from "@/components/site/logo"
import { Cloud, Heart, Stars } from "@/components/art/art"

type Draft = { name: string; mobile: string; age: string; date: string; slot: string; city: string; address: string }
const EMPTY: Draft = { name: "", mobile: "", age: "", date: "", slot: "", city: "", address: "" }
const AGES = ["Newborn", "1–3 months", "4–6 months", "7–12 months", "1–2 years"]
const STEPS = ["Little one", "Day", "Time", "Where", "Confirm"]
const KEY = "shah-booking-draft"

const iso = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`
const fromIso = (s: string) => { const [y, m, d] = s.split("-").map(Number); return new Date(y, m - 1, d) }
const fmt = (s: string, long = false) => fromIso(s).toLocaleDateString("en-IN", long ? { weekday: "long", day: "numeric", month: "long" } : { weekday: "short", day: "numeric", month: "short" })
const bookedFor = (s: string) => {
  const d = fromIso(s), seed = d.getDate() + d.getMonth() * 31
  const a = (seed * 7 + 3) % 5
  return [a, (a + 2 + (seed % 2)) % 5]
}

function waMessage(b: Draft, orderId: string, payId: string) {
  return [
    "*New Booking — Shah Art Studio* 🎨", "", "*Service:* Hand Casting Appointment",
    `*Parent Name:* ${b.name}`, `*Mobile:* ${b.mobile}`, `*Kid's Age:* ${b.age}`,
    `*Date:* ${fmt(b.date, true)}`, `*Time Slot:* ${slots.find((s) => s.id === b.slot)?.label}`,
    `*City:* ${b.city}`, `*Address:* ${b.address}`, "",
    `*Advance Paid:* ₹${BRAND.advance} ✅`, `*Booking ID:* ${orderId}`, `*Payment ID:* ${payId}`, "", "Please confirm my appointment. Thank you!",
  ].join("\n")
}

function icsFile(b: Draft, id: string) {
  const [y, m, d] = b.date.split("-")
  const h = +b.slot
  const p = (n: number) => String(n).padStart(2, "0")
  const stamp = (hh: number) => `${y}${m}${d}T${p(hh)}0000`
  const body = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Shah Art Studio//EN", "BEGIN:VEVENT", `UID:${id}@shahartstudio`, `DTSTAMP:${stamp(h)}`,
    `DTSTART;TZID=Asia/Kolkata:${stamp(h)}`, `DTEND;TZID=Asia/Kolkata:${stamp(h + 2)}`, "SUMMARY:Hand casting visit — Shah Art Studio",
    `DESCRIPTION:Booking ${id}. Call ${BRAND.phone} for changes.`, `LOCATION:${b.address.replace(/\n/g, ", ")}`, "END:VEVENT", "END:VCALENDAR"].join("\r\n")
  return URL.createObjectURL(new Blob([body], { type: "text/calendar" }))
}

/* ---------------------------- Live ticket ---------------------------- */
function Ticket({ d, id, done }: { d: Draft; id?: string; done?: boolean }) {
  const slot = slots.find((s) => s.id === d.slot)
  const Row = ({ k, v }: { k: string; v?: string }) => (
    <div className="flex items-baseline justify-between gap-6 border-b border-dashed border-plum/15 py-2.5">
      <span className="text-[11px] font-extrabold uppercase tracking-wider text-mute">{k}</span>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span key={v || "—"} initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -10, opacity: 0 }} transition={{ duration: 0.25 }} className={`text-right text-sm font-bold ${v ? "" : "text-plum/25"}`}>{v || "—"}</motion.span>
      </AnimatePresence>
    </div>
  )
  return (
    <div className="relative mx-auto w-full max-w-[380px] text-plum">
      <div className="relative overflow-hidden rounded-[28px] bg-milk shadow-[0_24px_50px_rgba(150,80,100,.22)]">
        <div className="flex items-center justify-between bg-rose px-6 py-4 text-white">
          <span className="flex items-center gap-2.5"><Mark className="h-8 w-8" /><span className="display text-xl">Visit pass</span></span>
          <span className="rounded-full bg-white/25 px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider">{done ? "Confirmed" : "Draft"}</span>
        </div>
        <div className="px-6 pb-1 pt-3">
          <Row k="Parent" v={d.name} /><Row k="Little one" v={d.age} /><Row k="Day" v={d.date ? fmt(d.date) : ""} />
          <Row k="Time" v={slot?.label} /><Row k="City" v={d.city} />
        </div>
        <div className="relative my-1 h-6"><span className="absolute -left-3 top-0 h-6 w-6 rounded-full bg-blush" /><span className="absolute -right-3 top-0 h-6 w-6 rounded-full bg-blush" /><span className="absolute inset-x-6 top-3 border-t-2 border-dashed border-plum/15" /></div>
        <div className="flex items-center justify-between px-6 pb-5 pt-1">
          <div><p className="text-[11px] font-extrabold uppercase tracking-wider text-mute">Advance</p><p className="display text-3xl text-rose-deep">₹{BRAND.advance}</p><p className="text-[11px] text-mute">Fully refundable</p></div>
          <div className="text-right"><p className="text-[11px] font-extrabold uppercase tracking-wider text-mute">{id ? "Booking ID" : "At"}</p><p className="mt-1 font-mono text-sm font-bold">{id ?? "Your doorstep"}</p></div>
        </div>
      </div>
    </div>
  )
}

/* ------------------------------ Fields ------------------------------ */
const inputCls = "h-14 w-full rounded-2xl border-2 border-plum/10 bg-milk px-5 text-lg outline-none transition placeholder:text-plum/30 focus:border-rose"
const Label = ({ children }: { children: React.ReactNode }) => <label className="mb-2 block text-sm font-extrabold">{children}</label>

export function BookingWizard() {
  const [step, setStep] = useState(0)
  const [d, setD] = useState<Draft>(EMPTY)
  const [phase, setPhase] = useState<"form" | "creating" | "pay" | "paying" | "done">("form")
  const [order, setOrder] = useState({ orderId: "", payId: "" })
  const [method, setMethod] = useState("UPI")
  const [cityOpen, setCityOpen] = useState(false)
  const [dir, setDir] = useState(1)
  const stripRef = useRef<HTMLDivElement>(null)

  useEffect(() => { try { const s = localStorage.getItem(KEY); if (s) setD({ ...EMPTY, ...JSON.parse(s) }) } catch {} }, [])
  useEffect(() => { try { localStorage.setItem(KEY, JSON.stringify(d)) } catch {} }, [d])
  const set = (k: keyof Draft) => (v: string) => setD((p) => ({ ...p, [k]: v }))

  const days = useMemo(() => {
    const t = new Date(); t.setHours(0, 0, 0, 0)
    return Array.from({ length: 35 }, (_, i) => { const x = new Date(t); x.setDate(t.getDate() + i); return x })
  }, [])
  const cities = bookingCities.filter((c) => c.toLowerCase().includes(d.city.toLowerCase()))

  const valid = [
    d.name.trim().length > 1 && /^[0-9]{10}$/.test(d.mobile) && !!d.age,
    !!d.date,
    !!d.slot,
    !!d.city.trim() && d.address.trim().length > 5,
    true,
  ][step]

  const go = (n: number) => { setDir(n > step ? 1 : -1); setStep(n) }
  const next = () => { if (valid && step < 4) go(step + 1) }

  async function pay() {
    setPhase("creating")
    await new Promise((r) => setTimeout(r, 1000))
    setOrder({ orderId: "ORD" + Date.now().toString().slice(-8), payId: "" })
    setPhase("pay")
  }
  async function confirmPay() {
    setPhase("paying")
    await new Promise((r) => setTimeout(r, 1700))
    setOrder((o) => ({ ...o, payId: "PAY" + Math.random().toString(36).slice(2, 10).toUpperCase() }))
    setPhase("done")
    try { localStorage.removeItem(KEY) } catch {}
  }

  const done = phase === "done"
  const slotLabel = slots.find((s) => s.id === d.slot)?.label ?? ""

  return (
    <div className="grid min-h-[100dvh] bg-cream lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
      {/* Left (desktop): brand + live ticket */}
      <aside className="relative hidden flex-col justify-center overflow-hidden bg-[linear-gradient(165deg,#FADADD,#E7DEF9)] px-10 pb-10 pt-28 lg:sticky lg:top-0 lg:flex lg:h-screen">
        <Stars />
        <Cloud className="drift absolute -left-8 bottom-10 w-44 text-white/70" />
        <div className="relative mx-auto mb-7 w-full max-w-[380px] text-center">
          <p className="hand text-3xl text-rose-deep">{done ? "see you soon!" : "let's reserve a little moment"}</p>
          <h1 className="display t-h2 mt-1">{done ? <>You're all set ♡</> : <>Book a visit</>}</h1>
        </div>
        <motion.div className="relative" initial={{ rotate: -2, y: 24, opacity: 0 }} animate={{ rotate: done ? 0 : -1.5, y: 0, opacity: 1 }} transition={{ type: "spring", stiffness: 120, damping: 16 }}>
          <Ticket d={d} id={done ? order.orderId : undefined} done={done} />
        </motion.div>
      </aside>

      {/* Right: steps */}
      <section className="relative flex flex-col px-5 pb-6 pt-[4.5rem] md:px-12 md:pt-24 lg:pt-28">
        {!done && (
          <>
            {/* mobile mini summary */}
            <div className={`mb-4 items-center justify-between rounded-2xl bg-blush px-4 py-2.5 text-sm lg:hidden ${d.date ? "flex" : "hidden"}`}>
              <span className="flex items-center gap-2 font-extrabold"><Mark className="h-7 w-7" />Visit pass</span>
              <span className="font-bold text-plum-soft">{d.date ? fmt(d.date) : "Pick a day"}{d.slot ? ` · ${slotLabel.split(" – ")[0]}` : ""}</span>
            </div>
            <div className="mb-2 flex items-center justify-between text-xs font-extrabold uppercase tracking-wider text-mute">
              <span>Step {Math.min(step + 1, 5)} of 5 · {STEPS[Math.min(step, 4)]}</span>
              <span className="text-rose-deep">₹{BRAND.advance} refundable</span>
            </div>
            <div className="mb-5 flex gap-1.5 md:mb-8">
              {STEPS.map((s, i) => (
                <button key={s} disabled={i > step || phase !== "form"} onClick={() => go(i)} aria-label={`Go to ${s}`} className="h-2 flex-1 overflow-hidden rounded-full bg-plum/10 disabled:cursor-default">
                  <motion.span className="block h-full rounded-full bg-rose" initial={false} animate={{ width: i <= step ? "100%" : "0%" }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }} />
                </button>
              ))}
            </div>
          </>
        )}

        <div className="flex-1">
          <AnimatePresence mode="wait" custom={dir}>
            {phase === "form" && (
              <motion.div key={step} custom={dir}
                initial={{ opacity: 0, x: 40 * dir }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 * dir }} transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}>
                {step === 0 && (
                  <div className="space-y-5 sm:space-y-6">
                    <div><h2 className="display t-h2">First, tell us about <em className="text-rose">your little one</em></h2><p className="mt-2 hidden text-plum-soft sm:block">It takes about a minute. We'll only use this to confirm your visit.</p></div>
                    <div><Label>Parent's name</Label><input className={inputCls} value={d.name} onChange={(e) => set("name")(e.target.value)} placeholder="Your full name" autoComplete="name" /></div>
                    <div><Label>Mobile number</Label><input className={inputCls} inputMode="numeric" maxLength={10} value={d.mobile} onChange={(e) => set("mobile")(e.target.value.replace(/\D/g, ""))} placeholder="98765 43210" autoComplete="tel-national" /></div>
                    <div><Label>How old is baby?</Label>
                      <div className="flex flex-wrap gap-2">{AGES.map((a) => (
                        <button key={a} onClick={() => set("age")(a)} className={`h-12 rounded-full border-2 px-5 text-sm font-bold transition ${d.age === a ? "border-rose bg-rose text-white" : "border-plum/10 bg-milk hover:border-rose"}`}>{a}</button>
                      ))}</div></div>
                  </div>
                )}
                {step === 1 && (
                  <div>
                    <h2 className="display t-h2">Which <em className="text-rose">day</em> suits you?</h2>
                    <p className="mt-2 text-plum-soft">{d.date ? fmt(d.date, true) : "Pick a date from the next five weeks."}</p>
                    <div ref={stripRef} className="no-scrollbar -mx-5 mt-6 flex snap-x gap-2.5 overflow-x-auto px-5 pb-5 pt-1 md:mx-0 md:px-0">
                      {days.map((x) => {
                        const k = iso(x), sel = d.date === k, wk = x.getDay() === 0 || x.getDay() === 6
                        return (
                          <button key={k} onClick={() => setD((p) => ({ ...p, date: k, slot: "" }))} className={`relative flex w-[68px] shrink-0 snap-start flex-col items-center rounded-3xl border-2 px-2 py-4 transition ${sel ? "border-rose bg-rose text-white shadow-[0_8px_20px_rgba(232,115,138,.4)]" : "border-plum/10 bg-milk hover:border-rose"}`}>
                            <span className="text-[11px] font-extrabold uppercase opacity-70">{x.toLocaleDateString("en-IN", { weekday: "short" })}</span>
                            <span className="display my-1 text-3xl">{x.getDate()}</span>
                            <span className="text-[11px] font-extrabold uppercase opacity-70">{x.toLocaleDateString("en-IN", { month: "short" })}</span>
                            {wk && <span className={`absolute -bottom-2 rounded-full px-2 py-0.5 text-[9px] font-extrabold uppercase ${sel ? "bg-butter text-plum" : "bg-butter text-plum-soft"}`}>Wknd</span>}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                )}
                {step === 2 && (
                  <div>
                    <h2 className="display t-h2">What <em className="text-rose">time</em> works?</h2>
                    <p className="mt-2 text-plum-soft">{fmt(d.date, true)}</p>
                    <div className="mt-6 grid gap-2.5">
                      {slots.map((s, i) => {
                        const booked = bookedFor(d.date).includes(i), sel = d.slot === s.id
                        return (
                          <button key={s.id} disabled={booked} onClick={() => set("slot")(s.id)} className={`flex min-h-[68px] items-center justify-between rounded-3xl border-2 px-5 py-4 text-left transition disabled:cursor-not-allowed ${sel ? "border-rose bg-rose text-white shadow-[0_8px_20px_rgba(232,115,138,.35)]" : booked ? "border-plum/5 bg-plum/[.03] text-plum/30" : "border-plum/10 bg-milk hover:border-rose"}`}>
                            <span><span className={`display block text-xl ${booked ? "line-through" : ""}`}>{s.label}</span><span className="text-xs font-bold opacity-70">{s.part}</span></span>
                            <span className="text-xs font-extrabold">{booked ? "Booked" : sel ? "Selected ✓" : "Select"}</span>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                )}
                {step === 3 && (
                  <div className="space-y-6">
                    <div><h2 className="display t-h2">Where should we <em className="text-rose">come?</em></h2><p className="mt-2 text-plum-soft">Our artist visits you at home.</p></div>
                    <div className="relative">
                      <Label>City</Label>
                      <input className={inputCls} value={d.city} onFocus={() => setCityOpen(true)} onBlur={() => setTimeout(() => setCityOpen(false), 150)} onChange={(e) => { set("city")(e.target.value); setCityOpen(true) }} placeholder="Start typing your city" autoComplete="off" />
                      {cityOpen && cities.length > 0 && d.city !== cities[0] && (
                        <div className="absolute inset-x-0 top-full z-10 mt-2 max-h-52 overflow-auto rounded-3xl bg-milk p-2 shadow-2xl ring-1 ring-plum/10">
                          {cities.map((c) => <button key={c} onMouseDown={() => { set("city")(c); setCityOpen(false) }} className="block w-full rounded-2xl px-4 py-3 text-left font-semibold hover:bg-blush">{c}</button>)}
                        </div>
                      )}
                    </div>
                    <div><Label>Full address</Label><textarea className={`${inputCls} h-auto resize-none py-4`} rows={3} value={d.address} onChange={(e) => set("address")(e.target.value)} placeholder="House, street, landmark" autoComplete="street-address" /></div>
                  </div>
                )}
                {step === 4 && (
                  <div>
                    <h2 className="display t-h2">Everything <em className="text-rose">look right?</em></h2>
                    <dl className="mt-6 divide-y divide-plum/10 rounded-[28px] bg-milk px-5 shadow-[0_10px_30px_rgba(120,70,90,.06)]">
                      {[["Parent", `${d.name} · ${d.mobile}`, 0], ["Little one", d.age, 0], ["When", `${fmt(d.date, true)}, ${slotLabel}`, 1], ["Where", `${d.address}, ${d.city}`, 3]].map(([k, v, s]) => (
                        <div key={k as string} className="flex items-start gap-4 py-4">
                          <dt className="w-20 shrink-0 pt-0.5 text-[11px] font-extrabold uppercase tracking-wider text-mute">{k}</dt>
                          <dd className="min-w-0 flex-1 break-words font-semibold">{v}</dd>
                          <button onClick={() => go(s as number)} className="shrink-0 text-sm font-extrabold text-rose-deep underline underline-offset-4">Edit</button>
                        </div>
                      ))}
                    </dl>
                    <p className="mt-5 rounded-3xl bg-butter p-5 text-sm text-plum-soft">A <b className="text-plum">fully refundable ₹{BRAND.advance}</b> advance confirms your slot. This is a sandbox demo — no real money is charged.</p>
                  </div>
                )}
              </motion.div>
            )}

            {(phase === "creating" || phase === "paying") && (
              <motion.div key="load" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid min-h-[40vh] place-items-center text-center">
                <div>
                  <Heart className="beat mx-auto h-14 w-14 text-rose" />
                  <p className="display t-h2 mt-6">{phase === "creating" ? "Creating a secure order" : "Processing payment"}…</p>
                </div>
              </motion.div>
            )}

            {phase === "pay" && (
              <motion.div key="pay" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}>
                <p className="text-xs font-extrabold uppercase tracking-wider text-mute">Secure checkout · Cashfree sandbox</p>
                <h2 className="display t-h2 mt-2">Pay <em className="text-rose">₹{BRAND.advance}</em></h2>
                <div className="mt-6 grid grid-cols-3 gap-2.5">
                  {["UPI", "Card", "NetBanking"].map((m) => (
                    <button key={m} onClick={() => setMethod(m)} className={`h-14 rounded-2xl border-2 text-sm font-bold transition ${method === m ? "border-rose bg-rose text-white" : "border-plum/10 bg-milk hover:border-rose"}`}>{m}</button>
                  ))}
                </div>
                <div className="mt-5 space-y-2 rounded-3xl bg-milk p-5 font-mono text-xs"><div className="flex justify-between"><span className="text-mute">Order</span><span>{order.orderId}</span></div><div className="flex justify-between"><span className="text-mute">Customer</span><span>{d.name}</span></div></div>
                <button onClick={confirmPay} className="mt-6 h-14 w-full rounded-full bg-rose text-base font-bold text-white shadow-[0_12px_30px_rgba(232,115,138,.4)] transition hover:bg-rose-deep">Pay ₹{BRAND.advance} securely</button>
                <p className="mt-3 text-center text-xs text-mute">Sandbox mode — no real money is charged.</p>
              </motion.div>
            )}

            {done && (
              <motion.div key="done" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} className="relative text-center lg:text-left">
                <Burst />
                <Heart className="beat mx-auto h-12 w-12 text-rose lg:mx-0" />
                <p className="hand mt-3 text-2xl text-rose-deep">booking confirmed</p>
                <h2 className="display t-h1 mt-1">Thank you, <em className="text-rose">{d.name.split(" ")[0]}</em>!</h2>
                <p className="lead mt-4 max-w-md lg:mx-0 mx-auto">Your slot on <b className="text-plum">{fmt(d.date, true)}</b>, {slotLabel}, is reserved. Send the details to the studio on WhatsApp and we'll confirm right away.</p>
                <div className="mt-8 lg:hidden"><Ticket d={d} id={order.orderId} done /></div>
                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  <a href={`https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(waMessage(d, order.orderId, order.payId))}`} target="_blank" rel="noopener noreferrer" className="flex h-14 items-center justify-center rounded-full bg-[#1FA855] font-bold text-white transition hover:brightness-95">Send to studio on WhatsApp</a>
                  <a href={icsFile(d, order.orderId)} download="shah-art-studio-visit.ics" className="flex h-14 items-center justify-center rounded-full border-2 border-plum/15 font-bold transition hover:border-plum">Add to calendar</a>
                </div>
                <Link href="/" className="mt-6 inline-block font-bold text-rose-deep underline underline-offset-4">← Back to the studio</Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {phase === "form" && (
          <div className="sticky bottom-0 -mx-5 mt-8 flex items-center justify-between gap-3 bg-cream/95 px-5 py-4 md:-mx-12 md:px-12" style={{ paddingBottom: "max(1rem, env(safe-area-inset-bottom))" }}>
            <button onClick={() => go(Math.max(0, step - 1))} disabled={step === 0} className="h-12 rounded-full px-4 font-bold text-plum-soft transition hover:text-plum disabled:pointer-events-none disabled:opacity-0">← Back</button>
            {step < 4 ? (
              <button onClick={next} disabled={!valid} className="flex h-14 min-w-[180px] flex-1 items-center justify-center gap-2 rounded-full bg-rose px-8 text-base font-bold text-white shadow-[0_12px_30px_rgba(232,115,138,.4)] transition enabled:hover:bg-rose-deep disabled:opacity-35 disabled:shadow-none sm:flex-none">Continue →</button>
            ) : (
              <button onClick={pay} className="flex h-14 flex-1 items-center justify-center gap-2 rounded-full bg-rose px-8 text-base font-bold text-white shadow-[0_12px_30px_rgba(232,115,138,.4)] transition hover:bg-rose-deep sm:flex-none">Confirm &amp; pay ₹{BRAND.advance}</button>
            )}
          </div>
        )}
      </section>
    </div>
  )
}

/** A short burst of hearts-and-dots — 24 transform-only elements, plays once. */
function Burst() {
  return (
    <div className="pointer-events-none absolute left-1/2 top-8 lg:left-24" aria-hidden>
      {Array.from({ length: 24 }, (_, i) => {
        const a = (i / 24) * Math.PI * 2, r = 90 + (i % 4) * 40
        return <motion.span key={i} className="absolute h-2.5 w-2.5 rounded-full" style={{ background: ["#E8738A", "#E2B04A", "#B8D9F2", "#B9E2C8"][i % 4] }} initial={{ x: 0, y: 0, opacity: 1, scale: 1 }} animate={{ x: Math.cos(a) * r, y: Math.sin(a) * r, opacity: 0, scale: 0.3 }} transition={{ duration: 1.3, ease: "easeOut" }} />
      })}
    </div>
  )
}
