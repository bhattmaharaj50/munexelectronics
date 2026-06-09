"use client"

import { useProductStore } from "@/lib/product-store"
import { ProductCard } from "@/components/product-card"
import Link from "next/link"
import { ArrowRight, TrendingUp } from "lucide-react"
import { useInView } from "@/lib/use-in-view"

export function BestSellers() {
  const { products } = useProductStore()
  const [headerRef, headerInView] = useInView<HTMLDivElement>({ threshold: 0.1 })
  const [gridRef, gridInView] = useInView<HTMLDivElement>({ threshold: 0.04 })

  const bestSellers = [...products]
    .sort((a, b) => b.rating * Math.log1p(b.reviews) - a.rating * Math.log1p(a.reviews))
    .slice(0, 4)

  if (bestSellers.length === 0) return null

  return (
    <section className="bg-[#F5F5F7] border-y border-[#E5E5E5]">
      <div className="mx-auto max-w-7xl px-4 py-24 lg:px-8">
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
            <span className="inline-flex items-center gap-2 rounded-full border border-[#E5E5E5] bg-white px-3.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#6E6E73]">
              <TrendingUp className="h-3 w-3" /> Most popular
            </span>
            <h2 className="mt-4 text-3xl font-black tracking-[-0.02em] text-[#111111] md:text-4xl lg:text-5xl">
              Best Sellers
            </h2>
            <p className="mt-3 max-w-md text-sm text-[#6E6E73] md:text-base">
              The most loved products by our customers — proven quality, unbeatable value.
            </p>
          </div>
          <Link
            href="/products"
            className="hidden items-center gap-1.5 rounded-full border border-[#E5E5E5] bg-white px-4 py-2.5 text-xs font-semibold text-[#111111] shadow-sm transition-all hover:bg-[#EBEBED] md:inline-flex"
          >
            See All <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div ref={gridRef} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {bestSellers.map((product, i) => (
            <div
              key={product.id}
              className="relative"
              style={{
                opacity: gridInView ? 1 : 0,
                transform: gridInView ? "translateY(0)" : "translateY(28px)",
                transition: `opacity 0.55s cubic-bezier(0.25,0.46,0.45,0.94) ${i * 70}ms, transform 0.55s cubic-bezier(0.25,0.46,0.45,0.94) ${i * 70}ms`,
              }}
            >
              {i < 3 && (
                <div className="absolute -left-1 -top-1 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-[#111111] text-[11px] font-black text-white shadow-md">
                  #{i + 1}
                </div>
              )}
              <ProductCard product={{ ...product, badge: product.badge || "Best Seller" }} />
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-center md:hidden">
          <Link href="/products" className="inline-flex items-center gap-2 rounded-full border border-[#E5E5E5] bg-white px-6 py-3 text-sm font-semibold text-[#111111] shadow-sm">
            See All Best Sellers <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
