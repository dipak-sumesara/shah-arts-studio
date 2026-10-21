import Link from "next/link"
import { notFound, redirect } from "next/navigation"
import type { Metadata } from "next"
import { PageHero } from "@/components/site/page-hero"
import { ProductGrid } from "@/components/products/product-grid"
import { collections, resinItems } from "@/lib/data"

const TINT: Record<string, "blush" | "butter" | "sky" | "mint" | "lilac"> = { "baby-products": "butter", "resin-art": "sky", "glass-painting": "mint", "lipan-art": "lilac", "home-decor": "blush" }

export function generateStaticParams() {
  return collections.filter((c) => c.slug !== "hand-casting").map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const c = collections.find((x) => x.slug === slug)
  return { title: c?.name ?? "Collection", description: c?.blurb }
}

export default async function Collection({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  if (slug === "hand-casting") redirect("/hand-casting")
  const c = collections.find((x) => x.slug === slug)
  if (!c) notFound()

  const items =
    c.mode === "resin"
      ? resinItems
      : ["Design A", "Design B", "Design C", "Design D", "Design E", "Design F"].map((name, i) => ({ name, image: c.images[i % c.images.length] }))
  const next = collections[(collections.indexOf(c) + 1) % collections.length]

  return (
    <>
      <PageHero eyebrow={c.short.toLowerCase()} title={c.name} sub={c.blurb} image={c.image} tint={TINT[c.slug] ?? "blush"} />
      <section className="section !pb-0">
        <div className="wrap">
          <div className="mb-6 flex items-center justify-between text-sm">
            <span className="font-bold text-mute">{items.length} pieces</span>
            <span className="font-extrabold text-rose-deep">{c.price}</span>
          </div>
          <ProductGrid items={items} price={c.price} mode={c.mode === "resin" ? "resin" : "simple"} />
          <Link href={next.slug === "hand-casting" ? "/hand-casting" : `/products/${next.slug}`} className="group mt-14 flex items-center justify-between rounded-[28px] bg-milk p-6 shadow-[0_10px_30px_rgba(120,70,90,.08)] transition hover:-translate-y-1 md:p-8">
            <span><span className="text-xs font-extrabold uppercase tracking-wider text-mute">Next collection</span><span className="display t-h2 mt-1 block">{next.name}</span></span>
            <span className="grid h-12 w-12 place-items-center rounded-full bg-rose text-xl text-white transition group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </section>
    </>
  )
}
