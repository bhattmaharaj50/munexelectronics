"use client"

import { useProductStore } from "@/lib/product-store"
import { ProductCard } from "@/components/product-card"
import { Clock, Gift, Sparkles, ArrowRight } from "lucide-react"
import type { Product } from "@/lib/products"
import Link from "next/link"
import type React from "react"
import { useInView } from "@/lib/use-in-view"

function OfferBlock({
  title,
  icon,
  eyebrow,
  products,
  accentClass,
}: {
  title: string
  icon: React.ReactNode
  eyebrow: string
  products: Product[]
  accentClass: string
}) {
  const [headerRef, headerInView] = useInView<HTMLDivElement>({ threshold: 0.1 })
  const [gridRef, gridInView] = useInView<HTMLDivElement>({ threshold: 0.04 })

  if (products.length === 0) return null

  return (
    <div className="mb-20 last:mb-0">
      <div
        ref={headerRef}
        className="mb-10 flex items-end justify-between gap-4"
        style={{
          opacity: headerInView ? 1 : 0,
          transform: headerInView ? "translateY(0)" : "translateY(24px)",
          transition: "opacity 0.7s cubic-bezier(0.25,0.46,0.45,0.94), transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94)",
        }}
      >
        <div className="flex items-center gap-4">
          <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${accentClass}`}>
            {icon}
          </div>
          <div>
            <span className="inline-flex items-center rounded-full border border-[#E5E5E5] bg-white px-3 py-0.5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#6E6E73]">
              {eyebrow}
            </span>
            <h3 className="mt-1.5 text-2xl font-black tracking-[-0.02em] text-[#111111] md:text-3xl">{title}</h3>
          </div>
        </div>
        <Link
          href="/products?deals=true"
          className="hidden items-center gap-1.5 rounded-full border border-[#E5E5E5] bg-white px-4 py-2.5 text-xs font-semibold text-[#111111] shadow-sm transition-all hover:bg-[#F5F5F7] md:inline-flex"
        >
          See all deals <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
      <div ref={gridRef} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {products.slice(0, 4).map((product, i) => (
          <div
            key={product.id}
            style={{
              opacity: gridInView ? 1 : 0,
              transform: gridInView ? "translateY(0)" : "translateY(28px)",
              transition: `opacity 0.55s cubic-bezier(0.25,0.46,0.45,0.94) ${i * 70}ms, transform 0.55s cubic-bezier(0.25,0.46,0.45,0.94) ${i * 70}ms`,
            }}
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  )
}

export function DealsSection() {
  const { products, settings } = useProductStore()
  const [headerRef, headerInView] = useInView<HTMLDivElement>({ threshold: 0.1 })

  const discounted = products.filter((p) => p.originalPrice)
  const flashSales = products.filter((p) => p.offerType === "flash-sale")
  const dealOfDay = products.filter((p) => p.offerType === "deal-of-day")
  const holidayDeals = products.filter((p) => p.offerType === "holiday-deal")
  const fallback = discounted.length ? discounted.slice(0, 4) : products.slice(0, 4)

  return (
    <section className="bg-[#F5F5F7] border-y border-[#E5E5E5]">
      <div className="mx-auto max-w-7xl px-4 py-24 lg:px-8">
        <div
          ref={headerRef}
          className="mb-16 text-center"
          style={{
            opacity: headerInView ? 1 : 0,
            transform: headerInView ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.7s cubic-bezier(0.25,0.46,0.45,0.94), transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94)",
          }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-[#E5E5E5] bg-white px-3.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#6E6E73]">
            Savings
          </span>
          <h2 className="mt-4 text-3xl font-black tracking-[-0.02em] text-[#111111] md:text-4xl lg:text-5xl">
            Deals & Offers
          </h2>
          <p className="mt-3 text-sm text-[#6E6E73] md:text-base">
            Limited time offers on premium electronics — shop before they're gone.
          </p>
        </div>

        <OfferBlock eyebrow="Limited time" title={settings.flashSaleTitle} icon={<Clock className="h-5 w-5 text-white" />} accentClass="bg-[#FF3B30]" products={flashSales.length ? flashSales : fallback} />
        <OfferBlock eyebrow="Today only" title={settings.dealOfDayTitle} icon={<Sparkles className="h-5 w-5 text-white" />} accentClass="bg-[#111111]" products={dealOfDay.length ? dealOfDay : fallback} />
        <OfferBlock eyebrow="Holiday savings" title={settings.holidayDealsTitle} icon={<Gift className="h-5 w-5 text-white" />} accentClass="bg-[#34C759]" products={holidayDeals.length ? holidayDeals : fallback} />
      </div>
    </section>
  )
}
