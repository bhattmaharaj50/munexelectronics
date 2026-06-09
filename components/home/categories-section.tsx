"use client"

import Link from "next/link"
import {
  Tv, Speaker, Smartphone, Refrigerator, Microwave,
  WashingMachine, CookingPot, Flame, Tablet, Headphones,
  Gamepad2, Joystick, Cable, Droplets, Shirt, ChefHat,
  Soup, ArrowRight,
} from "lucide-react"
import { useProductStore } from "@/lib/product-store"
import { FadeUp } from "@/components/ui/animate"
import { useInView } from "@/lib/use-in-view"

const iconMap: Record<string, React.ElementType> = {
  Tv, Speaker, Smartphone, Refrigerator, Microwave,
  WashingMachine, CookingPot, Flame, Tablet, Headphones,
  Gamepad2, Joystick, Cable, Droplets, Shirt, ChefHat, Soup,
}

export function CategoriesSection() {
  const { categories, products } = useProductStore()
  const [headerRef, headerInView] = useInView<HTMLDivElement>({ threshold: 0.1 })
  const [gridRef, gridInView] = useInView<HTMLDivElement>({ threshold: 0.04 })

  const fallbackImageFor = (slug: string) => {
    const match = products.find((p) => p.category === slug && (p.image || (p.images && p.images.length > 0)))
    return match?.image || match?.images?.[0] || ""
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-24 lg:px-8">
      {/* Header */}
      <div
        ref={headerRef}
        className="mb-14 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end"
        style={{
          opacity: headerInView ? 1 : 0,
          transform: headerInView ? "translateY(0)" : "translateY(24px)",
          transition: "opacity 0.7s cubic-bezier(0.25,0.46,0.45,0.94), transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94)",
        }}
      >
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-[#E5E5E5] bg-[#F5F5F7] px-3.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#6E6E73]">
            Browse the store
          </span>
          <h2 className="mt-4 text-3xl font-black tracking-[-0.02em] text-[#111111] md:text-4xl lg:text-5xl">
            Shop by Category
          </h2>
          <p className="mt-3 max-w-md text-sm text-[#6E6E73] md:text-base">
            From flagship phones to flagship kitchens — find exactly what you need.
          </p>
        </div>
        <Link
          href="/products"
          className="inline-flex items-center gap-1.5 rounded-full border border-[#E5E5E5] bg-white px-4 py-2.5 text-xs font-semibold text-[#111111] shadow-sm transition-all hover:bg-[#F5F5F7] hover:border-[#111111]/20"
        >
          All products <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      {/* Grid */}
      <div
        ref={gridRef}
        className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
      >
        {categories.map((cat, i) => {
          const Icon = iconMap[cat.icon] || Tv
          const count = products.filter((p) => p.category === cat.slug).length
          const uploadedImage = cat.image || ""
          const fallbackBg = fallbackImageFor(cat.slug)
          const hasUploadedImage = Boolean(uploadedImage)
          return (
            <Link
              key={cat.slug}
              href={`/products?category=${cat.slug}`}
              className="group relative flex h-44 flex-col justify-between overflow-hidden rounded-2xl border border-[#E5E5E5] bg-[#F5F5F7] p-4 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-black/[0.1] hover:border-[#111111]/12 md:h-52"
              style={{
                opacity: gridInView ? 1 : 0,
                transform: gridInView ? "translateY(0)" : "translateY(28px)",
                transition: `opacity 0.55s cubic-bezier(0.25,0.46,0.45,0.94) ${i * 60}ms, transform 0.55s cubic-bezier(0.25,0.46,0.45,0.94) ${i * 60}ms`,
              }}
            >
              {hasUploadedImage ? (
                <>
                  <img
                    src={uploadedImage}
                    alt={cat.name}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-all duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
                </>
              ) : fallbackBg ? (
                <>
                  <img
                    src={fallbackBg}
                    alt=""
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover opacity-14 transition-all duration-700 group-hover:scale-110 group-hover:opacity-22"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white via-white/70 to-transparent" />
                </>
              ) : (
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/70 to-transparent" />
              )}

              <div className="relative">
                <div className={`flex h-11 w-11 items-center justify-center rounded-2xl border shadow-sm transition-all duration-300 group-hover:shadow-md group-hover:-translate-y-0.5 ${hasUploadedImage ? "border-white/30 bg-white/20 backdrop-blur-sm group-hover:border-white/50" : "border-[#E5E5E5] bg-white group-hover:border-[#111111]/12"}`}>
                  <Icon className={`h-5 w-5 ${hasUploadedImage ? "text-white" : "text-[#111111]"}`} />
                </div>
              </div>
              <div className="relative">
                <p className={`text-sm font-bold md:text-base ${hasUploadedImage ? "text-white" : "text-[#111111]"}`}>{cat.name}</p>
                <p className={`mt-0.5 text-[10px] font-medium uppercase tracking-widest ${hasUploadedImage ? "text-white/70" : "text-[#6E6E73]"}`}>
                  {count} {count === 1 ? "item" : "items"}
                </p>
              </div>
              <ArrowRight className={`absolute right-3.5 top-3.5 h-4 w-4 opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100 ${hasUploadedImage ? "text-white/70 group-hover:text-white" : "text-[#6E6E73] group-hover:text-[#111111]"}`} />
            </Link>
          )
        })}
      </div>
    </section>
  )
}
