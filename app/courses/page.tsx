import type { Metadata } from "next"
import { PageHero } from "@/components/site/page-hero"
import { CourseList } from "@/components/courses/course-list"

export const metadata: Metadata = { title: "Courses & Workshops", description: "Learn the craft from our experienced artists." }

export default function Courses() {
  return (
    <>
      <PageHero eyebrow="learn the craft" title={<>Courses &amp; <em className="text-rose">workshops</em></>} sub="Learn the craft from our experienced artists." image="mandala" tint="mint" />
      <section className="section !pb-0"><div className="wrap"><CourseList /></div></section>
    </>
  )
}
