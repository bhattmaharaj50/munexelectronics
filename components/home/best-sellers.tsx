"use client"

import { useProductStore } from "@/lib/product-store"
import { ProductCard } from "@/components/product-card"
import Link from "next/link"
import { ArrowRight, TrendingUp } from "lucide-react"

export function BestSellers() {
  const { products } = useProductStore()

  const bestSellers = [...products]
    .sort((a, b) => {
      const scoreA = a.rating * Math.log1p(a.reviews)
      const scoreB = b.rating * Math.log1p(b.reviews)
      return scoreB - scoreA
    })
    .slice(0, 4)

  if (bestSellers.length === 0) return null

  return (
    <section className="bg-[#F5F5F7] border-y border-[#E5E5E5]">
      <div className="mx-auto max-w-7xl px-4 py-20 lg:px-8">
        <div className="mb-12 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-[#E5E5E5] bg-white px-3.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#6E6E73]">
              <TrendingUp className="h-3 w-3" />
              Most popular
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#111111] md:text-4xl lg:text-5xl">
              Best Sellers
            </h2>
            <p className="mt-3 max-w-md text-sm text-[#6E6E73] md:text-base">
              The most loved products by our customers — proven quality, unbeatable value.
            </p>
          </div>
          <Link
            href="/products?sort=rating"
            className="hidden items-center gap-1.5 rounded-full border border-[#E5E5E5] bg-white px-4 py-2.5 text-xs font-semibold text-[#111111] shadow-sm transition-all hover:bg-[#EBEBED] md:inline-flex"
          >
            See All Top-Rated
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {bestSellers.map((product, index) => (
            <div key={product.id} className="relative">
              {index < 3 && (
                <div className="absolute -left-1 -top-1 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-[#111111] text-[11px] font-black text-white shadow-md">
                  #{index + 1}
                </div>
              )}
              <ProductCard product={{ ...product, badge: product.badge || "Best Seller" }} />
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-center md:hidden">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 rounded-full border border-[#E5E5E5] bg-white px-6 py-3 text-sm font-semibold text-[#111111] shadow-sm"
          >
            See All Best Sellers
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
