"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { useProductStore } from "@/lib/product-store"

export function BrandsSection() {
  const { products, settings } = useProductStore()

  const brandLogos = settings.brandLogos || []

  const brandsMap = new Map<string, { count: number; logo: string | null; image: string | null }>()
  for (const p of products) {
    if (!p.brand) continue
    const existing = brandsMap.get(p.brand)
    if (!existing) {
      brandsMap.set(p.brand, {
        count: 1,
        logo: null,
        image: p.image || (p.images && p.images[0]) || null,
      })
    } else {
      existing.count++
      if (!existing.image && (p.image || (p.images && p.images[0]))) {
        existing.image = p.image || p.images?.[0] || null
      }
    }
  }

  const brands = Array.from(brandsMap.entries())
    .map(([name, data]) => ({ name, ...data }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 12)

  if (brands.length === 0) return null

  const sectionTitle = settings.brandsTitle || "Shop by Brand"

  return (
    <section className="border-y border-[#E5E5E5] bg-[#F5F5F7] py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mb-12 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-[#E5E5E5] bg-white px-3.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#6E6E73]">
              Brands
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#111111] md:text-4xl lg:text-5xl">
              {sectionTitle}
            </h2>
            <p className="mt-3 max-w-md text-sm text-[#6E6E73] md:text-base">
              Shop directly by your favourite brand — all authentic, all in stock.
            </p>
          </div>
          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 rounded-full border border-[#E5E5E5] bg-white px-4 py-2.5 text-xs font-semibold text-[#111111] shadow-sm transition-all hover:bg-[#EBEBED]"
          >
            All products
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {brands.map(({ name, count, image }) => (
            <Link
              key={name}
              href={`/products?brand=${encodeURIComponent(name)}`}
              className="group relative flex flex-col items-center justify-between gap-3 overflow-hidden rounded-2xl border border-[#E5E5E5] bg-white p-5 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/[0.08] hover:border-[#111111]/15"
            >
              {image && (
                <div className="relative h-16 w-full overflow-hidden rounded-xl bg-[#F5F5F7]">
                  <img
                    src={image}
                    alt={name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              )}
              {!image && (
                <div className="flex h-16 w-full items-center justify-center rounded-xl bg-[#F5F5F7]">
                  <span className="text-2xl font-black text-[#111111] tracking-tight">
                    {name.slice(0, 2).toUpperCase()}
                  </span>
                </div>
              )}
              <div>
                <p className="text-sm font-bold text-[#111111]">{name}</p>
                <p className="mt-0.5 text-[10px] font-medium uppercase tracking-widest text-[#6E6E73]">
                  {count} {count === 1 ? "product" : "products"}
                </p>
              </div>
              <span className="text-[10px] font-semibold text-[#6E6E73] opacity-0 transition-opacity group-hover:text-[#111111] group-hover:opacity-100">
                Shop →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
