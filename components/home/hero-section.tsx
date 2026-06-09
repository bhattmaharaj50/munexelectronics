"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { ArrowRight, ShieldCheck, Sparkles, Truck } from "lucide-react"
import { useProductStore } from "@/lib/product-store"

export function HeroSection() {
  const { products, settings } = useProductStore()
  const fallback = settings.heroImageUrl || "/images/hero-electronics.jpg"
  const galleryImages = settings.heroGalleryImages?.filter(Boolean) || []
  const slides = galleryImages.length > 0 ? galleryImages : [fallback]

  const showcase =
    products.find((p) => p.featured && (p.image || (p.images && p.images.length))) ||
    products.find((p) => p.image || (p.images && p.images.length)) ||
    null

  const [activeSlide, setActiveSlide] = useState(0)

  useEffect(() => {
    if (slides.length <= 1) return
    const interval = window.setInterval(() => {
      setActiveSlide((c) => (c + 1) % slides.length)
    }, 5500)
    return () => window.clearInterval(interval)
  }, [slides.length])

  useEffect(() => {
    setActiveSlide(0)
  }, [slides.join("|")])

  return (
    <section className="relative overflow-hidden bg-[#111111] min-h-[92vh] flex items-center">
      {/* Slideshow background */}
      <div className="absolute inset-0">
        {slides.map((src, index) => (
          <Image
            key={`${src}-${index}`}
            src={src}
            alt="Premium electronics"
            fill
            priority={index === 0}
            className={`object-cover transition-all duration-[1600ms] ease-in-out ${
              index === activeSlide ? "opacity-35 scale-[1.04]" : "opacity-0 scale-100"
            }`}
            sizes="100vw"
          />
        ))}
      </div>

      {/* Gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/90" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent lg:to-black/15" />

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-12 px-4 py-28 lg:grid-cols-12 lg:gap-10 lg:px-8 lg:py-36">
        {/* Left — copy */}
        <div className="lg:col-span-7">
          <div className="animate-hero-badge">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/80 backdrop-blur-md">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
              {settings.heroBadge || "Kenya's Trusted Electronics Store"}
            </span>
          </div>

          <h1 className="animate-hero-headline mt-6 text-balance text-5xl font-black leading-[1.02] tracking-[-0.02em] text-white md:text-6xl lg:text-7xl xl:text-8xl">
            {settings.heroTitle || "Premium Electronics,\nDelivered to Your Door"}
          </h1>

          <p className="animate-hero-sub mt-6 max-w-xl text-pretty text-base leading-relaxed text-white/65 md:text-lg lg:text-xl">
            {settings.heroSubtitle || "Shop the latest TVs, smartphones, gaming consoles, and home appliances at competitive prices across Kenya."}
          </p>

          <div className="animate-hero-cta mt-9 flex flex-wrap items-center gap-3">
            <Link
              href="/products"
              className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-full bg-white px-8 py-4 text-sm font-bold text-[#111111] shadow-2xl shadow-black/25 transition-all hover:-translate-y-0.5 hover:shadow-3xl"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-black/6 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              <span className="relative">Shop Now</span>
              <ArrowRight className="relative h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/products?deals=true"
              className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-7 py-4 text-sm font-semibold text-white backdrop-blur-md transition-all hover:border-white/40 hover:bg-white/16"
            >
              <Sparkles className="h-4 w-4" />
              Explore Deals
            </Link>
          </div>

          {/* Trust micro-badges */}
          <div className="animate-hero-cta mt-10 grid max-w-xl grid-cols-3 gap-2.5">
            {[
              { icon: Truck,        label: "Fast Delivery", sub: "Across Kenya" },
              { icon: ShieldCheck,  label: "100% Genuine",  sub: "Authentic stock" },
              { icon: Sparkles,     label: "M-Pesa",        sub: "Easy checkout" },
            ].map(({ icon: Icon, label, sub }) => (
              <div
                key={label}
                className="rounded-2xl border border-white/12 bg-white/8 p-3.5 backdrop-blur-sm transition-all hover:border-white/20 hover:bg-white/12"
              >
                <Icon className="h-4 w-4 text-white/75" />
                <p className="mt-2 text-xs font-semibold text-white">{label}</p>
                <p className="text-[10px] text-white/55">{sub}</p>
              </div>
            ))}
          </div>

          {/* Slide dots */}
          {slides.length > 1 && (
            <div className="mt-8 flex items-center gap-2">
              {slides.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActiveSlide(i)}
                  aria-label={`Slide ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === activeSlide ? "w-10 bg-white" : "w-3 bg-white/28 hover:bg-white/50"
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Right — floating product card */}
        {showcase && (
          <div className="relative hidden lg:col-span-5 lg:block">
            <div className="absolute -inset-12 -z-10 rounded-[4rem] bg-white/6 blur-3xl" />

            <Link
              href={`/products/${showcase.id}`}
              className="animate-hero-card group relative block overflow-hidden rounded-3xl border border-white/15 bg-white/8 p-3 backdrop-blur-xl transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl hover:shadow-black/40"
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-[#1c1c1e]">
                <Image
                  src={showcase.image || showcase.images?.[0] || fallback}
                  alt={showcase.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 0, 480px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/0 to-black/0" />

                {/* Featured badge */}
                <div className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-black/55 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white backdrop-blur-md">
                  <Sparkles className="h-3 w-3" />
                  Featured
                </div>

                {/* Info panel */}
                <div className="absolute inset-x-4 bottom-4">
                  <div className="rounded-2xl border border-white/15 bg-black/65 p-4 backdrop-blur-xl">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-white/55">
                      {showcase.brand}
                    </p>
                    <p className="mt-1 line-clamp-1 text-base font-bold text-white">
                      {showcase.name}
                    </p>
                    <div className="mt-2 flex items-center justify-between">
                      <p className="text-lg font-black text-white">
                        {new Intl.NumberFormat("en-KE", {
                          style: "currency",
                          currency: "KES",
                          maximumFractionDigits: 0,
                        }).format(showcase.price)}
                      </p>
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-white/75">
                        Shop
                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>

            {/* Floating stat pills */}
            <div className="animate-hero-badge-float absolute -left-10 top-1/3 hidden rounded-2xl border border-white/15 bg-black/65 px-4 py-3 backdrop-blur-xl xl:block">
              <p className="text-[10px] font-bold uppercase tracking-widest text-white/55">Customers</p>
              <p className="text-2xl font-black text-white">10K+</p>
            </div>
            <div className="animate-hero-float absolute -right-8 top-2/3 hidden rounded-2xl border border-white/15 bg-black/65 px-4 py-3 backdrop-blur-xl xl:block">
              <p className="text-[10px] font-bold uppercase tracking-widest text-white/55">Products</p>
              <p className="text-2xl font-black text-white">500+</p>
            </div>
          </div>
        )}
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
    </section>
  )
}
