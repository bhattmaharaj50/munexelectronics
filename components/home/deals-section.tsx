"use client"

import { useProductStore } from "@/lib/product-store"
import { ProductCard } from "@/components/product-card"
import { Clock, Gift, Sparkles, ArrowRight, ShoppingCart, Star, Flame, Tag } from "lucide-react"
import type { Product } from "@/lib/products"
import { formatPrice } from "@/lib/products"
import Link from "next/link"
import Image from "next/image"
import type React from "react"
import { useInView } from "@/lib/use-in-view"
import { useState, useEffect } from "react"
import { useCart } from "@/lib/cart-context"
import { useRouter } from "next/navigation"

// ─── Countdown Timer ─────────────────────────────────────────────────────────
function useCountdownToMidnight() {
  const [time, setTime] = useState({ h: 0, m: 0, s: 0 })
  useEffect(() => {
    const tick = () => {
      const now = new Date()
      const midnight = new Date(now)
      midnight.setHours(24, 0, 0, 0)
      const diff = Math.max(0, midnight.getTime() - now.getTime())
      setTime({
        h: Math.floor(diff / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      })
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])
  return time
}

function TimerUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#1D1D1F] sm:h-14 sm:w-14">
        <span className="text-xl font-black tabular-nums text-white sm:text-2xl">
          {String(value).padStart(2, "0")}
        </span>
      </div>
      <span className="mt-1 text-[9px] font-bold uppercase tracking-widest text-[#6E6E73]">
        {label}
      </span>
    </div>
  )
}

function CountdownTimer() {
  const { h, m, s } = useCountdownToMidnight()
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  if (!mounted) {
    return (
      <div className="flex items-end gap-2">
        <TimerUnit value={0} label="Hours" />
        <span className="mb-4 text-2xl font-black text-[#6E6E73]">:</span>
        <TimerUnit value={0} label="Mins" />
        <span className="mb-4 text-2xl font-black text-[#6E6E73]">:</span>
        <TimerUnit value={0} label="Secs" />
      </div>
    )
  }

  return (
    <div className="flex items-end gap-2">
      <TimerUnit value={h} label="Hours" />
      <span className="mb-4 text-2xl font-black text-[#6E6E73]">:</span>
      <TimerUnit value={m} label="Mins" />
      <span className="mb-4 text-2xl font-black text-[#6E6E73]">:</span>
      <TimerUnit value={s} label="Secs" />
    </div>
  )
}

// ─── Flash Sales Section ──────────────────────────────────────────────────────
function FlashSalesBlock({ products }: { products: Product[] }) {
  const [headerRef, headerInView] = useInView<HTMLDivElement>({ threshold: 0.1 })
  const [gridRef, gridInView] = useInView<HTMLDivElement>({ threshold: 0.04 })
  if (products.length === 0) return null

  return (
    <div id="flash-sales" className="scroll-mt-24">
      <div
        ref={headerRef}
        className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
        style={{
          opacity: headerInView ? 1 : 0,
          transform: headerInView ? "translateY(0)" : "translateY(24px)",
          transition: "opacity 0.7s ease, transform 0.7s ease",
        }}
      >
        <div className="flex items-center gap-5">
          <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-[#FF3B30]">
            <Flame className="h-6 w-6 text-white" />
          </div>
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#FF3B30]/20 bg-[#FF3B30]/8 px-3 py-0.5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#FF3B30]">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#FF3B30]" />
              Limited Time
            </span>
            <h3 className="mt-1 text-2xl font-black tracking-[-0.02em] text-[#1D1D1F] md:text-3xl">
              Flash Sales
            </h3>
          </div>
        </div>
        <div className="flex flex-col items-start gap-3 md:items-end">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-[#6E6E73]" />
            <span className="text-xs font-semibold text-[#6E6E73]">Ends in</span>
          </div>
          <CountdownTimer />
        </div>
      </div>
      <div ref={gridRef} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {products.slice(0, 4).map((product, i) => (
          <div
            key={product.id}
            style={{
              opacity: gridInView ? 1 : 0,
              transform: gridInView ? "translateY(0)" : "translateY(28px)",
              transition: `opacity 0.55s ease ${i * 70}ms, transform 0.55s ease ${i * 70}ms`,
            }}
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
      <div className="mt-6 flex justify-center">
        <Link
          href="/products?deals=true"
          className="inline-flex items-center gap-1.5 rounded-full border border-[#D2D2D7] bg-white px-5 py-2.5 text-sm font-semibold text-[#1D1D1F] shadow-sm transition-all hover:bg-[#F5F5F7]"
        >
          See all flash deals <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  )
}

// ─── Deal of the Day Spotlight ────────────────────────────────────────────────
function DealOfDaySpotlight({ products }: { products: Product[] }) {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.08 })
  const { addToCart } = useCart()
  const router = useRouter()

  const product = products[0]
  if (!product) return null

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0
  const savings = product.originalPrice ? product.originalPrice - product.price : 0
  const stars = Math.round(product.rating || 4.5)

  const handleBuy = () => {
    addToCart(product)
    router.push("/checkout")
  }

  return (
    <div
      id="deal-of-day"
      ref={ref}
      className="scroll-mt-24"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(28px)",
        transition: "opacity 0.8s ease, transform 0.8s ease",
      }}
    >
      {/* Header */}
      <div className="mb-10 flex items-center gap-5">
        <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-[#1D1D1F]">
          <Sparkles className="h-6 w-6 text-white" />
        </div>
        <div>
          <span className="inline-flex items-center rounded-full border border-[#D2D2D7] bg-white px-3 py-0.5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#6E6E73]">
            Today only
          </span>
          <h3 className="mt-1 text-2xl font-black tracking-[-0.02em] text-[#1D1D1F] md:text-3xl">
            Deal of the Day
          </h3>
        </div>
      </div>

      {/* Spotlight card */}
      <div className="overflow-hidden rounded-3xl bg-[#1D1D1F]">
        <div className="grid lg:grid-cols-2">
          {/* Image */}
          <div className="relative aspect-[4/3] bg-[#111111] lg:aspect-auto lg:min-h-[460px]">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover opacity-90"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1D1D1F]/60 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-[#1D1D1F]/50" />
            {discount > 0 && (
              <div className="absolute left-5 top-5 flex flex-col items-center justify-center rounded-2xl bg-[#FF3B30] px-4 py-3 shadow-xl">
                <span className="text-3xl font-black leading-none text-white">-{discount}%</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-white/80">Off</span>
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex flex-col justify-center p-8 md:p-12">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/50">
              {product.brand}
            </span>
            <h4 className="mt-2 text-2xl font-black leading-snug tracking-tight text-white md:text-3xl xl:text-4xl">
              {product.name}
            </h4>

            {/* Stars */}
            <div className="mt-4 flex items-center gap-2">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${i < stars ? "fill-[#FF9F0A] text-[#FF9F0A]" : "fill-white/20 text-white/20"}`}
                  />
                ))}
              </div>
              <span className="text-xs font-medium text-white/55">
                {product.rating?.toFixed(1)} ({product.reviews} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="mt-6">
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-black text-white md:text-5xl">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-lg font-medium text-white/40 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>
              {savings > 0 && (
                <p className="mt-2 text-sm font-semibold text-emerald-400">
                  You save {formatPrice(savings)} today
                </p>
              )}
            </div>

            {/* Stock */}
            {(product.stock ?? 10) <= 5 && (product.stock ?? 0) > 0 && (
              <div className="mt-4 flex items-center gap-2">
                <div className="h-1.5 w-32 overflow-hidden rounded-full bg-white/15">
                  <div
                    className="h-full rounded-full bg-[#FF9F0A]"
                    style={{ width: `${Math.min(100, ((product.stock ?? 0) / 10) * 100)}%` }}
                  />
                </div>
                <span className="text-xs font-semibold text-[#FF9F0A]">
                  Only {product.stock} left!
                </span>
              </div>
            )}

            {/* Buttons */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={handleBuy}
                disabled={(product.stock ?? 1) <= 0}
                className="flex flex-1 items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-bold text-[#1D1D1F] shadow-xl transition-all hover:-translate-y-0.5 hover:shadow-2xl active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ShoppingCart className="h-4 w-4" />
                Buy Now
              </button>
              <Link
                href={`/products/${product.id}`}
                className="flex items-center justify-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-6 py-4 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:border-white/35 hover:bg-white/16"
              >
                View Details <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Holiday Deals ────────────────────────────────────────────────────────────
function HolidayDealsBlock({ products }: { products: Product[] }) {
  const [headerRef, headerInView] = useInView<HTMLDivElement>({ threshold: 0.1 })
  const [gridRef, gridInView] = useInView<HTMLDivElement>({ threshold: 0.04 })
  if (products.length === 0) return null

  return (
    <div id="holiday-deals" className="scroll-mt-24">
      <div
        ref={headerRef}
        className="mb-10 flex items-end justify-between gap-4"
        style={{
          opacity: headerInView ? 1 : 0,
          transform: headerInView ? "translateY(0)" : "translateY(24px)",
          transition: "opacity 0.7s ease, transform 0.7s ease",
        }}
      >
        <div className="flex items-center gap-5">
          <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-[#34C759]">
            <Gift className="h-6 w-6 text-white" />
          </div>
          <div>
            <span className="inline-flex items-center rounded-full border border-[#D2D2D7] bg-white px-3 py-0.5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#6E6E73]">
              Holiday savings
            </span>
            <h3 className="mt-1 text-2xl font-black tracking-[-0.02em] text-[#1D1D1F] md:text-3xl">
              Holiday Deals
            </h3>
          </div>
        </div>
        <Link
          href="/products?deals=true"
          className="hidden items-center gap-1.5 rounded-full border border-[#D2D2D7] bg-white px-4 py-2.5 text-xs font-semibold text-[#1D1D1F] shadow-sm transition-all hover:bg-[#F5F5F7] md:inline-flex"
        >
          See all <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
      <div ref={gridRef} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {products.slice(0, 4).map((product, i) => (
          <div
            key={product.id}
            style={{
              opacity: gridInView ? 1 : 0,
              transform: gridInView ? "translateY(0)" : "translateY(28px)",
              transition: `opacity 0.55s ease ${i * 70}ms, transform 0.55s ease ${i * 70}ms`,
            }}
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Main Deals Section ───────────────────────────────────────────────────────
export function DealsSection() {
  const { products, settings } = useProductStore()
  const [headerRef, headerInView] = useInView<HTMLDivElement>({ threshold: 0.1 })

  const discounted = products.filter((p) => p.originalPrice)
  const flashSales = products.filter((p) => p.offerType === "flash-sale")
  const dealOfDay = products.filter((p) => p.offerType === "deal-of-day")
  const holidayDeals = products.filter((p) => p.offerType === "holiday-deal")
  const fallback = discounted.length ? discounted.slice(0, 4) : products.slice(0, 4)

  return (
    <section className="border-y border-[#D2D2D7] bg-[#F5F5F7]">
      <div className="mx-auto max-w-7xl px-4 py-24 lg:px-8">
        {/* Section header */}
        <div
          ref={headerRef}
          className="mb-20 text-center"
          style={{
            opacity: headerInView ? 1 : 0,
            transform: headerInView ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-[#D2D2D7] bg-white px-3.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#6E6E73]">
            <Tag className="h-3 w-3" />
            Savings
          </span>
          <h2 className="mt-4 text-3xl font-black tracking-[-0.02em] text-[#1D1D1F] md:text-4xl lg:text-5xl">
            Deals & Offers
          </h2>
          <p className="mt-3 text-sm text-[#6E6E73] md:text-base">
            Limited-time offers on premium electronics — shop before they're gone.
          </p>
        </div>

        <div className="flex flex-col gap-24">
          <FlashSalesBlock products={flashSales.length ? flashSales : fallback} />
          <DealOfDaySpotlight products={dealOfDay.length ? dealOfDay : fallback} />
          <HolidayDealsBlock products={holidayDeals.length ? holidayDeals : fallback} />
        </div>
      </div>
    </section>
  )
}
