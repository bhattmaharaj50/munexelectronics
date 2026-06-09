"use client"

import { useProductStore } from "@/lib/product-store"
import { ProductCard } from "@/components/product-card"
import Link from "next/link"
import { ArrowRight, Sparkles } from "lucide-react"
import { useInView } from "@/lib/use-in-view"

export function NewArrivals() {
  const { products } = useProductStore()
  const [headerRef, headerInView] = useInView<HTMLDivElement>({ threshold: 0.1 })
  const [gridRef, gridInView] = useInView<HTMLDivElement>({ threshold: 0.04 })

  const newArrivals = products
    .filter((p) => p.badge?.toLowerCase().includes("new") || p.stock !== undefined)
    .slice(0, 4)
  const fallback = products.slice(-4).reverse()
  const display = newArrivals.length >= 2 ? newArrivals : fallback

  if (display.length === 0) return null

  return (
    <section className="mx-auto max-w-7xl px-4 py-24 lg:px-8">
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
            <Sparkles className="h-3 w-3" /> Just dropped
          </span>
          <h2 className="mt-4 text-3xl font-black tracking-[-0.02em] text-[#111111] md:text-4xl lg:text-5xl">
            New Arrivals
          </h2>
          <p className="mt-3 max-w-md text-sm text-[#6E6E73] md:text-base">
            The latest electronics added to our shelves — fresh, in-stock, and ready to ship.
          </p>
        </div>
        <Link
          href="/products"
          className="hidden items-center gap-1.5 rounded-full border border-[#E5E5E5] bg-white px-4 py-2.5 text-xs font-semibold text-[#111111] shadow-sm transition-all hover:bg-[#F5F5F7] md:inline-flex"
        >
          View All <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      <div ref={gridRef} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {display.map((product, i) => (
          <div
            key={product.id}
            style={{
              opacity: gridInView ? 1 : 0,
              transform: gridInView ? "translateY(0)" : "translateY(28px)",
              transition: `opacity 0.55s cubic-bezier(0.25,0.46,0.45,0.94) ${i * 70}ms, transform 0.55s cubic-bezier(0.25,0.46,0.45,0.94) ${i * 70}ms`,
            }}
          >
            <ProductCard product={{ ...product, badge: product.badge || "New" }} />
          </div>
        ))}
      </div>

      <div className="mt-10 flex justify-center md:hidden">
        <Link href="/products" className="inline-flex items-center gap-2 rounded-full border border-[#E5E5E5] bg-white px-6 py-3 text-sm font-semibold text-[#111111] shadow-sm">
          View All New Arrivals <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  )
}
