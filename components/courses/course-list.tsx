"use client"

import { useState } from "react"
import { Drawer } from "@/components/site/drawer"
import { BRAND, courses, img } from "@/lib/data"

const tints = ["bg-blush", "bg-butter", "bg-sky", "bg-mint", "bg-lilac", "bg-peach"]
const field = "h-14 w-full rounded-2xl border-2 border-plum/10 bg-milk px-5 text-lg outline-none transition focus:border-rose"

export function CourseList() {
  const [sel, setSel] = useState<string | null>(null)
  const [name, setName] = useState("")
  const [mobile, setMobile] = useState("")
  const [sent, setSent] = useState(false)
  const course = courses.find((c) => c.name === sel)
  const close = () => { setSel(null); setSent(false) }
  const ok = name.trim().length > 1 && /^[0-9]{10}$/.test(mobile)

  return (
    <>
      <div className="grid gap-3 sm:grid-cols-2 md:gap-5 lg:grid-cols-3">
        {courses.map((c, i) => (
          <button key={c.name} onClick={() => setSel(c.name)} className={`group flex flex-col rounded-[28px] ${tints[i]} p-2.5 text-left transition-transform duration-300 hover:-translate-y-1.5 md:rounded-[36px] md:p-3`}>
            <div className="aspect-[16/11] overflow-hidden rounded-[22px] bg-milk md:rounded-[28px]"><img src={img(c.image, true)} alt={c.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" /></div>
            <div className="flex flex-1 flex-col px-3 pb-3 pt-4">
              <div className="flex items-start justify-between gap-2"><h3 className="display t-h3">{c.name}</h3><span className="shrink-0 rounded-full bg-milk px-3 py-1 text-xs font-extrabold">{c.duration}</span></div>
              <p className="mt-1 text-sm font-extrabold text-rose-deep">{c.price}</p>
              <span className="mt-4 inline-flex h-11 w-fit items-center rounded-full bg-milk px-6 text-sm font-extrabold transition group-hover:bg-rose group-hover:text-white">Enroll</span>
            </div>
          </button>
        ))}
      </div>
      <Drawer open={!!sel} onClose={close} title={sent ? "You're on the list ♡" : `Enroll · ${sel}`}>
        {course && (sent ? (
          <div className="flex h-full flex-col gap-6">
            <p className="lead">Thanks, {name.split(" ")[0]}! We'll contact you on {mobile} about <b className="text-plum">{course.name}</b> ({course.duration}).</p>
            <a href={`https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(`Hi! I'd like to enroll in ${course.name}. I'm ${name}, ${mobile}.`)}`} target="_blank" rel="noopener noreferrer" className="mt-auto flex h-14 items-center justify-center rounded-full bg-[#1FA855] font-bold text-white">Say hi on WhatsApp</a>
          </div>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); if (ok) setSent(true) }} className="flex h-full flex-col gap-4">
            <div className="aspect-[16/9] overflow-hidden rounded-[24px]"><img src={img(course.image, true)} alt={course.name} className="h-full w-full object-cover" /></div>
            <p className="text-plum-soft">{course.duration} · <b className="text-rose-deep">{course.price}</b></p>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" autoComplete="name" className={field} />
            <input value={mobile} inputMode="numeric" maxLength={10} onChange={(e) => setMobile(e.target.value.replace(/\D/g, ""))} placeholder="Mobile number" autoComplete="tel-national" className={field} />
            <button disabled={!ok} className="mt-auto h-14 rounded-full bg-rose font-bold text-white transition enabled:hover:bg-rose-deep disabled:opacity-40">Enroll now</button>
          </form>
        ))}
      </Drawer>
    </>
  )
}
