import type { Metadata } from "next"
import Link from "next/link"
import { PageHero } from "@/components/site/page-hero"
import { FrameTiers } from "@/components/products/frame-tiers"
import { Reveal } from "@/components/site/reveal"
import { Heart } from "@/components/art/art"

export const metadata: Metadata = { title: "3D Hand Casting", description: "Capture tiny hands & feet in stunning lifelike detail." }

export default function HandCasting() {
  return (
    <>
      <PageHero eyebrow="tiny hands & feet" title={<>3D hand <em className="text-rose">casting</em></>} sub="Capture tiny hands & feet in stunning lifelike detail." image="handcast-3" tint="blush" />
      <section className="section !pb-0"><div className="wrap"><FrameTiers /></div></section>
      <section className="section !pb-0">
        <Reveal className="wrap">
          <div className="grid items-center gap-5 rounded-[32px] bg-butter p-7 md:grid-cols-[1.4fr_1fr] md:rounded-[48px] md:p-12">
            <div className="text-center md:text-left">
              <p className="hand text-2xl text-rose-deep">ready when you are</p>
              <h2 className="display t-h2 mt-1">Book your visit</h2>
              <p className="lead mt-2">Pick a day and a time. A refundable ₹500 advance holds your slot — we come to you.</p>
            </div>
            <Link href="/book" className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-rose px-8 text-base font-bold text-white shadow-[0_12px_30px_rgba(232,115,138,.4)] transition hover:bg-rose-deep md:justify-self-end">Choose a time <Heart className="beat h-4 w-4" /></Link>
          </div>
        </Reveal>
      </section>
    </>
  )
}
