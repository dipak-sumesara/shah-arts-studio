import type { Metadata } from "next"
import { PageHero } from "@/components/site/page-hero"
import { CityPicker } from "@/components/cities/city-picker"

export const metadata: Metadata = { title: "Where we come to you", description: "Check where we deliver our services." }

export default function Availability() {
  return (
    <>
      <PageHero eyebrow="we come to you" title={<>Service <em className="text-rose">availability</em></>} sub="Check where we deliver our services." image="lipan" tint="lilac" />
      <section className="section !pb-0"><div className="wrap"><CityPicker /></div></section>
    </>
  )
}
