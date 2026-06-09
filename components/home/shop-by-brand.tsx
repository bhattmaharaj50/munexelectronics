"use client"

import Link from "next/link"
import { useState } from "react"
import {
  Tv, Speaker, Smartphone, Refrigerator, Microwave,
  WashingMachine, CookingPot, Flame, Tablet, Headphones,
  Gamepad2, Joystick, Cable, Droplets, Shirt, ChefHat,
  Soup, ChevronRight, ArrowRight,
} from "lucide-react"
import { useProductStore } from "@/lib/product-store"
import { useInView } from "@/lib/use-in-view"

const iconMap: Record<string, React.ElementType> = {
  Tv, Speaker, Smartphone, Refrigerator, Microwave,
  WashingMachine, CookingPot, Flame, Tablet, Headphones,
  Gamepad2, Joystick, Cable, Droplets, Shirt, ChefHat, Soup,
}

export function ShopByBrand() {
  const { products, categories } = useProductStore()
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null)
  const [headerRef, headerInView] = useInView<HTMLDivElement>({ threshold: 0.1 })
  const [bodyRef, bodyInView] = useInView<HTMLDivElement>({ threshold: 0.04 })

  // Build brand map: brand → { image, categorySet }
  const brandMap = new Map<string, { image: string; categories: Set<string> }>()
  for (const p of products) {
    if (!p.brand) continue
    const slug = p.brand.toLowerCase().replace(/\s+/g, "-")
    const existing = brandMap.get(slug)
    if (!existing) {
      brandMap.set(slug, {
        image: p.image || p.images?.[0] || "",
        categories: new Set(p.category ? [p.category] : []),
      })
    } else {
      if (!existing.image && (p.image || p.images?.[0])) {
        existing.image = p.image || p.images?.[0] || ""
      }
      if (p.category) existing.categories.add(p.category)
    }
  }

  const brandList = Array.from(brandMap.entries())
    .map(([slug, data]) => ({
      slug,
      name: products.find((p) => p.brand?.toLowerCase().replace(/\s+/g, "-") === slug)?.brand || slug,
      image: data.image,
      categorySlugs: Array.from(data.categories),
    }))
    .filter((b) => b.image && b.categorySlugs.length > 0)
    .slice(0, 12)

  const activeBrand = brandList.find((b) => b.slug === selectedBrand) ?? null

  // Categories to display: if a brand is selected, show its categories; otherwise show all
  const displayCategories = activeBrand
    ? categories.filter((c) => activeBrand.categorySlugs.includes(c.slug))
    : categories

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
              {activeBrand
                ? `Browsing ${activeBrand.name} — ${activeBrand.categorySlugs.length} ${activeBrand.categorySlugs.length === 1 ? "category" : "categories"} available`
                : "Pick a brand to explore its product range"}
            </p>
          </div>
          {activeBrand && (
            <button
              onClick={() => setSelectedBrand(null)}
              className="inline-flex items-center gap-1.5 rounded-full border border-[#D2D2D7] bg-white px-4 py-2.5 text-xs font-semibold text-[#1D1D1F] shadow-sm transition-all hover:bg-[#F5F5F7]"
            >
              ← All Brands
            </button>
          )}
        </div>

        <div ref={bodyRef} style={{
          opacity: bodyInView ? 1 : 0,
          transform: bodyInView ? "translateY(0)" : "translateY(24px)",
          transition: "opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s",
        }}>
          {/* Brand cards row */}
          <div className="mb-10 flex gap-3 overflow-x-auto pb-2 scrollbar-none">
            {brandList.map((brand) => (
              <button
                key={brand.slug}
                onClick={() => setSelectedBrand(selectedBrand === brand.slug ? null : brand.slug)}
                className={`group relative h-28 w-28 flex-shrink-0 overflow-hidden rounded-2xl border-2 shadow-md transition-all duration-300 ${
                  selectedBrand === brand.slug
                    ? "border-[#1D1D1F] scale-105 shadow-xl"
                    : "border-transparent hover:border-[#D2D2D7] hover:shadow-xl"
                }`}
              >
                <img
                  src={brand.image}
                  alt={brand.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div
                  className={`absolute inset-0 transition-colors duration-300 ${
                    selectedBrand === brand.slug
                      ? "bg-black/50"
                      : "bg-black/25 group-hover:bg-black/15"
                  }`}
                />
                <div className="absolute inset-0 flex items-end p-2.5">
                  <span className="text-xs font-bold text-white drop-shadow-md">{brand.name}</span>
                </div>
                {selectedBrand === brand.slug && (
                  <div className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#1D1D1F]">
                    <span className="text-[10px] font-bold text-white">✓</span>
                  </div>
                )}
              </button>
            ))}
          </div>

          {/* Category cards */}
          <div
            className={`grid gap-3 transition-all duration-300 ${
              activeBrand
                ? "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6"
                : "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
            }`}
          >
            {displayCategories.map((cat) => {
              const Icon = iconMap[cat.icon] || Tv
              return (
                <Link
                  key={cat.slug}
                  href={
                    activeBrand
                      ? `/products?brand=${encodeURIComponent(activeBrand.name)}&category=${cat.slug}`
                      : `/products?category=${cat.slug}`
                  }
                  className="group flex flex-col items-center rounded-3xl border border-[#E5E5E5] bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#1D1D1F]/10 hover:shadow-xl md:p-8"
                >
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-[#E5E5E5] bg-[#F5F5F7] text-[#1D1D1F] transition-all duration-300 group-hover:scale-110 group-hover:border-[#1D1D1F]/15 group-hover:bg-[#1D1D1F] group-hover:text-white">
                    <Icon strokeWidth={1.5} className="h-7 w-7" />
                  </div>
                  <h3 className="text-center text-sm font-semibold text-[#1D1D1F] group-hover:text-[#1D1D1F]">
                    {cat.name}
                  </h3>
                  {activeBrand && (
                    <span className="mt-2 flex items-center gap-0.5 text-[11px] font-medium text-[#6E6E73] group-hover:text-[#1D1D1F]">
                      View <ChevronRight className="h-3 w-3" />
                    </span>
                  )}
                </Link>
              )
            })}
          </div>

          {/* CTA */}
          {!activeBrand && (
            <div className="mt-8 text-center">
              <Link
                href="/products"
                className="inline-flex items-center gap-1.5 rounded-full border border-[#D2D2D7] bg-white px-5 py-2.5 text-sm font-semibold text-[#1D1D1F] shadow-sm transition-all hover:bg-[#F5F5F7]"
              >
                Browse all products <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
