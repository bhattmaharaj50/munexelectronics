"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { useProductStore } from "@/lib/product-store"
import { useInView } from "@/lib/use-in-view"

const STATIC_BRANDS = [
  "Samsung", "Apple", "Sony", "LG", "Xiaomi", "Huawei",
  "Oppo", "Vivo", "HP", "Dell", "Lenovo", "Asus",
  "Acer", "JBL", "Bose", "Canon", "Nikon", "Epson",
]

export function BrandsSection() {
  const { products, settings } = useProductStore()
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.1 })

  const brandsMap = new Map<string, { count: number; image: string | null }>()
  for (const p of products) {
    if (!p.brand) continue
    const existing = brandsMap.get(p.brand)
    if (!existing) {
      brandsMap.set(p.brand, { count: 1, image: p.image || p.images?.[0] || null })
    } else {
      existing.count++
      if (!existing.image && (p.image || p.images?.[0])) {
        existing.image = p.image || p.images?.[0] || null
      }
    }
  }

  // Merge DB brands with static brand list for a full showcase
  const dbBrands = Array.from(brandsMap.entries()).map(([name, data]) => ({ name, ...data }))
  const staticExtras = STATIC_BRANDS
    .filter((n) => !brandsMap.has(n))
    .map((n) => ({ name: n, count: 0, image: null }))
  const allBrands = [...dbBrands.sort((a, b) => b.count - a.count), ...staticExtras].slice(0, 20)

  if (allBrands.length === 0) return null

  const row1 = allBrands.slice(0, Math.ceil(allBrands.length / 2))
  const row2 = allBrands.slice(Math.ceil(allBrands.length / 2))

  return (
    <section className="overflow-hidden border-y border-[#D2D2D7] bg-[#F5F5F7] py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Header */}
        <div
          ref={ref}
          className="mb-14 text-center"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.7s cubic-bezier(0.25,0.46,0.45,0.94), transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94)",
          }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-[#D2D2D7] bg-white px-3.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#6E6E73]">
            Premium Brands
          </span>
          <h2 className="mt-4 text-3xl font-black tracking-[-0.02em] text-[#1D1D1F] md:text-4xl lg:text-5xl">
            {settings.brandsTitle || "Shop by Brand"}
          </h2>
          <p className="mt-3 text-sm text-[#6E6E73] md:text-base">
            Authentic products from the world's leading technology brands.
          </p>
        </div>
      </div>

      {/* Infinite carousel */}
      <div className="relative select-none">
        {/* Fade edges */}
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-[#F5F5F7] to-transparent sm:w-40" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-[#F5F5F7] to-transparent sm:w-40" />

        {/* Row 1 — left to right */}
        <div className="mb-3 flex overflow-hidden">
          <div className="flex animate-marquee gap-3 hover:[animation-play-state:paused]">
            {[...row1, ...row1, ...row1].map((brand, i) => (
              <BrandPill key={`r1-${i}`} brand={brand} />
            ))}
          </div>
        </div>

        {/* Row 2 — right to left */}
        <div className="flex overflow-hidden">
          <div className="flex animate-marquee-reverse gap-3 hover:[animation-play-state:paused]">
            {[...row2, ...row2, ...row2].map((brand, i) => (
              <BrandPill key={`r2-${i}`} brand={brand} />
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="mx-auto mt-12 max-w-7xl px-4 text-center lg:px-8">
        <Link
          href="/products"
          className="inline-flex items-center gap-2 rounded-full border border-[#D2D2D7] bg-white px-6 py-3 text-sm font-semibold text-[#1D1D1F] shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5"
        >
          View all brands <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  )
}

function BrandPill({ brand }: { brand: { name: string; count: number; image: string | null } }) {
  const hasProducts = brand.count > 0
  const content = (
    <div
      className={`group flex flex-shrink-0 items-center gap-3 rounded-2xl border border-[#D2D2D7] bg-white px-5 py-3.5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#1D1D1F]/20 hover:shadow-xl hover:shadow-black/[0.08] ${
        hasProducts ? "cursor-pointer" : "cursor-default"
      }`}
    >
      {/* Brand thumbnail */}
      {brand.image ? (
        <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-xl bg-[#F5F5F7]">
          <img
            src={brand.image}
            alt={brand.name}
            loading="lazy"
            className="h-full w-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
          />
        </div>
      ) : (
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[#F5F5F7] transition-colors group-hover:bg-[#1D1D1F]">
          <span className="text-xs font-black text-[#1D1D1F] transition-colors group-hover:text-white">
            {brand.name.slice(0, 2).toUpperCase()}
          </span>
        </div>
      )}
      <div>
        <p className="whitespace-nowrap text-sm font-bold text-[#1D1D1F]">{brand.name}</p>
        {brand.count > 0 && (
          <p className="text-[10px] font-medium text-[#6E6E73]">
            {brand.count} {brand.count === 1 ? "product" : "products"}
          </p>
        )}
      </div>
    </div>
  )

  if (!hasProducts) return content
  return (
    <Link href={`/products?brand=${encodeURIComponent(brand.name)}`}>
      {content}
    </Link>
  )
}
