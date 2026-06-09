"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { useProductStore } from "@/lib/product-store"
import { useInView } from "@/lib/use-in-view"

export function ShopByBrand() {
  const { products } = useProductStore()
  const [headerRef, headerInView] = useInView<HTMLDivElement>({ threshold: 0.1 })
  const [gridRef, gridInView] = useInView<HTMLDivElement>({ threshold: 0.04 })

  // Build brand list from real products: brand → best image + product count
  const brandMap = new Map<string, { name: string; image: string; count: number }>()
  for (const p of products) {
    if (!p.brand) continue
    const existing = brandMap.get(p.brand)
    if (!existing) {
      brandMap.set(p.brand, {
        name: p.brand,
        image: p.image || p.images?.[0] || "",
        count: 1,
      })
    } else {
      existing.count++
      if (!existing.image && (p.image || p.images?.[0])) {
        existing.image = p.image || p.images?.[0] || ""
      }
    }
  }

  const brandList = Array.from(brandMap.values())
    .filter((b) => b.image)
    .sort((a, b) => b.count - a.count)
    .slice(0, 12)

  if (brandList.length === 0) return null

  return (
    <section className="border-t border-[#E5E5E5] bg-[#F5F5F7] py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Header */}
        <div
          ref={headerRef}
          className="mb-12 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end"
          style={{
            opacity: headerInView ? 1 : 0,
            transform: headerInView ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-[#E5E5E5] bg-white px-3.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#6E6E73]">
              Brand Explorer
            </span>
            <h2 className="mt-4 text-3xl font-black tracking-[-0.02em] text-[#111111] md:text-4xl lg:text-5xl">
              Shop by Brand
            </h2>
            <p className="mt-3 text-sm text-[#6E6E73] md:text-base">
              Browse products from your favourite brands
            </p>
          </div>
          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 rounded-full border border-[#D2D2D7] bg-white px-4 py-2.5 text-xs font-semibold text-[#1D1D1F] shadow-sm transition-all hover:bg-[#EBEBED]"
          >
            All products <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* Brand cards */}
        <div
          ref={gridRef}
          className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6"
        >
          {brandList.map((brand, i) => (
            <Link
              key={brand.name}
              href={`/products?brand=${encodeURIComponent(brand.name)}`}
              className="group relative aspect-square overflow-hidden rounded-2xl border border-[#E5E5E5] bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-[#1D1D1F]/10"
              style={{
                opacity: gridInView ? 1 : 0,
                transform: gridInView ? "translateY(0)" : "translateY(28px)",
                transition: `opacity 0.55s ease ${i * 60}ms, transform 0.55s ease ${i * 60}ms`,
              }}
            >
              <img
                src={brand.image}
                alt={brand.name}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent transition-opacity duration-300 group-hover:from-black/80" />
              {/* Brand name */}
              <div className="absolute inset-x-0 bottom-0 p-3">
                <p className="text-sm font-bold text-white drop-shadow-md">{brand.name}</p>
                <p className="text-[11px] text-white/70">
                  {brand.count} {brand.count === 1 ? "product" : "products"}
                </p>
              </div>
              {/* Arrow on hover */}
              <div className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-white/0 text-white opacity-0 transition-all duration-300 group-hover:bg-white/20 group-hover:opacity-100">
                <ArrowRight className="h-3.5 w-3.5" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
