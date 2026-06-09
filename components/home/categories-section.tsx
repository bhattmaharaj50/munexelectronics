"use client"

import Link from "next/link"
import {
  Tv,
  Speaker,
  Smartphone,
  Refrigerator,
  Microwave,
  WashingMachine,
  CookingPot,
  Flame,
  Tablet,
  Headphones,
  Gamepad2,
  Joystick,
  Cable,
  Droplets,
  Shirt,
  ChefHat,
  Soup,
  ArrowRight,
} from "lucide-react"
import { useProductStore } from "@/lib/product-store"

const iconMap: Record<string, React.ElementType> = {
  Tv,
  Speaker,
  Smartphone,
  Refrigerator,
  Microwave,
  WashingMachine,
  CookingPot,
  Flame,
  Tablet,
  Headphones,
  Gamepad2,
  Joystick,
  Cable,
  Droplets,
  Shirt,
  ChefHat,
  Soup,
}

export function CategoriesSection() {
  const { categories, products } = useProductStore()

  const imageFor = (slug: string) => {
    const match = products.find(
      (p) => p.category === slug && (p.image || (p.images && p.images.length > 0)),
    )
    return match?.image || match?.images?.[0] || ""
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 lg:px-8">
      <div className="mb-12 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-[#E5E5E5] bg-[#F5F5F7] px-3.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#6E6E73]">
            Browse the store
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#111111] md:text-4xl lg:text-5xl">
            Shop by Category
          </h2>
          <p className="mt-3 max-w-md text-sm text-[#6E6E73] md:text-base">
            From flagship phones to flagship kitchens — find exactly what you need.
          </p>
        </div>
        <Link
          href="/products"
          className="inline-flex items-center gap-1.5 rounded-full border border-[#E5E5E5] bg-white px-4 py-2.5 text-xs font-semibold text-[#111111] transition-all hover:bg-[#F5F5F7] hover:border-[#111111]/20 shadow-sm"
        >
          See all products
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {categories.map((cat) => {
          const Icon = iconMap[cat.icon] || Tv
          const productCount = products.filter((p) => p.category === cat.slug).length
          const bgImage = imageFor(cat.slug)

          return (
            <Link
              key={cat.slug}
              href={`/products?category=${cat.slug}`}
              className="group relative flex h-40 flex-col justify-between overflow-hidden rounded-2xl border border-[#E5E5E5] bg-[#F5F5F7] p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/[0.08] hover:border-[#111111]/15 md:h-48"
            >
              {bgImage && (
                <img
                  src={bgImage}
                  alt=""
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover opacity-15 transition-all duration-700 group-hover:scale-110 group-hover:opacity-25"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-white via-white/60 to-transparent" />
              <div className="relative">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#E5E5E5] bg-white shadow-sm transition-all group-hover:shadow-md group-hover:border-[#111111]/15">
                  <Icon className="h-5 w-5 text-[#111111]" />
                </div>
              </div>
              <div className="relative">
                <p className="text-sm font-bold text-[#111111] md:text-base">{cat.name}</p>
                <p className="mt-0.5 text-[10px] font-medium uppercase tracking-widest text-[#6E6E73]">
                  {productCount} {productCount === 1 ? "item" : "items"}
                </p>
              </div>
              <ArrowRight className="absolute right-3.5 top-3.5 h-4 w-4 text-[#6E6E73] opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100 group-hover:text-[#111111]" />
            </Link>
          )
        })}
      </div>
    </section>
  )
}
