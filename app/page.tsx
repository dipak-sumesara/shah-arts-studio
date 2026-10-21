import { Hero, Marquee } from "@/components/home/hero"
import { Manifesto } from "@/components/home/manifesto"
import { GrowingHands } from "@/components/home/growing-hands"
import { CollectionIndex } from "@/components/home/collection-index"
import { Arrivals } from "@/components/home/arrivals"
import { Process } from "@/components/home/process"
import { Promise3 } from "@/components/home/promise"
import { AcademyTeaser, FinalCta } from "@/components/home/academy-cta"

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <Manifesto />
      <GrowingHands />
      <CollectionIndex />
      <Arrivals />
      <Process />
      <Promise3 />
      <AcademyTeaser />
      <FinalCta />
    </>
  )
}
