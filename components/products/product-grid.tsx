"use client"

import { useState } from "react"
import { Drawer } from "@/components/site/drawer"
import { BRAND, img } from "@/lib/data"

type Item = { name: string; image: string }
const tints = ["bg-blush", "bg-butter", "bg-sky", "bg-mint", "bg-lilac", "bg-peach"]

function Choice({ label, opts, val, set }: { label: string; opts: string[]; val: string; set: (v: string) => void }) {
  return (
    <div className="mb-6">
      <p className="mb-2 text-sm font-extrabold">{label}</p>
      <div className="flex gap-2">
        {opts.map((o) => (
          <button key={o} onClick={() => set(o)} className={`h-12 flex-1 rounded-full border-2 px-3 text-sm font-bold transition ${val === o ? "border-rose bg-rose text-white" : "border-plum/15 bg-milk hover:border-rose"}`}>{o}</button>
        ))}
      </div>
    </div>
  )
}

function Customizer({ title, mode, range }: { title: string; mode: "resin" | "simple"; range: string }) {
  const [size, setSize] = useState("Small")
  const [width, setWidth] = useState("Standard")
  const [writing, setWriting] = useState("No")
  let lo = 999, hi = 1999
  if (size === "Medium") { lo = 1999; hi = 3499 }
  if (size === "Large") { lo = 3499; hi = 4999 }
  if (width === "Wide") { lo += 500; hi += 800 }
  if (writing === "Yes") { lo += 300; hi += 500 }
  const est = mode === "resin" ? `₹${lo.toLocaleString("en-IN")} – ₹${hi.toLocaleString("en-IN")}` : range
  const wa = `https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(`Hi Shah Art Studio! I'd like to customize: ${title}${mode === "resin" ? ` (Size: ${size}, Width: ${width}, Writing: ${writing})` : ""}`)}`
  return (
    <div className="flex h-full flex-col">
      {mode === "resin" ? (
        <>
          <Choice label="Size" opts={["Small", "Medium", "Large"]} val={size} set={setSize} />
          <Choice label="Width" opts={["Standard", "Wide"]} val={width} set={setWidth} />
          <Choice label="Additional writing" opts={["No", "Yes"]} val={writing} set={setWriting} />
        </>
      ) : (
        <p className="lead mb-6">Tell us how you imagine it — we'll customize this piece exactly your way.</p>
      )}
      <div className="mt-auto rounded-[28px] bg-butter p-6 text-center">
        <p className="eyebrow text-plum-soft">Estimated range</p>
        <p key={est} className="display mt-1 text-4xl text-rose-deep">{est}</p>
      </div>
      <a href={wa} target="_blank" rel="noopener noreferrer" className="mt-4 flex h-14 items-center justify-center rounded-full bg-rose font-bold text-white transition hover:bg-rose-deep">Chat on WhatsApp</a>
      <a href={BRAND.phoneHref} className="mt-3 flex h-14 items-center justify-center rounded-full border-2 border-plum/15 font-bold transition hover:border-plum">Call {BRAND.phone}</a>
    </div>
  )
}

export function ProductGrid({ items, price, mode }: { items: Item[]; price: string; mode: "resin" | "simple" }) {
  const [sel, setSel] = useState<string | null>(null)
  return (
    <>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-6">
        {items.map((it, i) => (
          <button key={it.name} onClick={() => setSel(it.name)} className={`group flex flex-col rounded-[28px] ${tints[i % tints.length]} p-2.5 text-left transition-transform duration-300 hover:-translate-y-1.5 md:rounded-[36px] md:p-3`}>
            <div className="aspect-square overflow-hidden rounded-[22px] bg-milk md:rounded-[28px]">
              <img src={img(it.image, true)} alt={it.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
            <div className="flex flex-1 flex-col px-2 pb-2 pt-3">
              <h3 className="display text-base font-semibold leading-tight md:text-xl">{it.name}</h3>
              <p className="mt-1 text-xs font-extrabold text-rose-deep md:text-sm">{price}</p>
              <span className="mt-3 inline-flex w-fit rounded-full bg-milk px-4 py-2 text-xs font-extrabold transition group-hover:bg-rose group-hover:text-white">Customize</span>
            </div>
          </button>
        ))}
      </div>
      <Drawer open={!!sel} onClose={() => setSel(null)} title={sel ?? ""}>
        {sel && <Customizer key={sel} title={sel} mode={mode} range={price} />}
      </Drawer>
    </>
  )
}
