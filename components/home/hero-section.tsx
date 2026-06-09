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
      setActiveSlide((current) => (current + 1) % slides.length)
    }, 5000)
    return () => window.clearInterval(interval)
  }, [slides.length])

  useEffect(() => {
    setActiveSlide(0)
  }, [slides.join("|")])

  return (
    <section className="relative overflow-hidden bg-[#111111]">
      {/* Background slideshow */}
      <div className="absolute inset-0">
        {slides.map((src, index) => (
          <Image
            key={`${src}-${index}`}
            src={src}
            alt="Premium electronics collection"
            fill
            priority={index === 0}
            className={`object-cover transition-all duration-[1400ms] ease-in-out ${
              index === activeSlide ? "opacity-40 scale-105" : "opacity-0 scale-100"
            }`}
            sizes="100vw"
          />
        ))}
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/30 to-black/80" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent lg:to-black/10" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-24 lg:grid-cols-12 lg:gap-10 lg:px-8 lg:py-32">
        {/* Left — copy block */}
        <div className="lg:col-span-7">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/80 backdrop-blur-md">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
            {settings.heroBadge}
          </span>

          <h1 className="mt-6 text-balance text-5xl font-bold leading-[1.05] tracking-tight text-white md:text-6xl lg:text-7xl">
            {settings.heroTitle}
          </h1>

          <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-white/70 md:text-lg">
            {settings.heroSubtitle}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/products"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-[#111111] shadow-xl shadow-black/20 transition-all hover:-translate-y-0.5 hover:shadow-2xl"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-black/5 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              <span className="relative">Shop Now</span>
              <ArrowRight className="relative h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/products?deals=true"
              className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition-all hover:border-white/40 hover:bg-white/15"
            >
              <Sparkles className="h-4 w-4" />
              View Deals
            </Link>
          </div>

          {/* Trust micro-strip */}
          <div className="mt-10 grid max-w-xl grid-cols-3 gap-3">
            {[
              { icon: Truck, label: "Fast Delivery", sub: "Across Kenya" },
              { icon: ShieldCheck, label: "100% Genuine", sub: "Authentic stock" },
              { icon: Sparkles, label: "M-Pesa", sub: "Easy checkout" },
            ].map(({ icon: Icon, label, sub }) => (
              <div
                key={label}
                className="rounded-2xl border border-white/15 bg-white/10 p-3.5 backdrop-blur-md transition-all hover:border-white/25 hover:bg-white/15"
              >
                <Icon className="h-4 w-4 text-white/80" />
                <p className="mt-2 text-xs font-semibold text-white">{label}</p>
                <p className="text-[10px] text-white/60">{sub}</p>
              </div>
            ))}
          </div>

          {slides.length > 1 && (
            <div className="mt-8 flex items-center gap-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setActiveSlide(index)}
                  aria-label={`Show slide ${index + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    index === activeSlide
                      ? "w-10 bg-white"
                      : "w-3 bg-white/30 hover:bg-white/50"
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Right — floating product showcase card */}
        {showcase && (
          <div className="relative hidden lg:col-span-5 lg:block">
            <div className="absolute -inset-8 -z-10 rounded-[3rem] bg-white/5 blur-3xl" />

            <Link
              href={`/products/${showcase.id}`}
              className="group relative block overflow-hidden rounded-3xl border border-white/15 bg-white/10 p-3 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-black/30"
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-[#1a1a1a]">
                <Image
                  src={showcase.image || showcase.images?.[0] || fallback}
                  alt={showcase.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 0px, 480px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-black/0" />

                <div className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-black/50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white backdrop-blur-md">
                  <Sparkles className="h-3 w-3" />
                  Featured
                </div>

                <div className="absolute inset-x-4 bottom-4">
                  <div className="rounded-2xl border border-white/15 bg-black/60 p-4 backdrop-blur-xl">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-white/60">
                      {showcase.brand}
                    </p>
                    <p className="mt-1 line-clamp-1 text-base font-bold text-white">
                      {showcase.name}
                    </p>
                    <div className="mt-2 flex items-center justify-between">
                      <p className="text-lg font-bold text-white">
                        {new Intl.NumberFormat("en-KE", {
                          style: "currency",
                          currency: "KES",
                          maximumFractionDigits: 0,
                        }).format(showcase.price)}
                      </p>
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-white/80">
                        Shop
                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>

            <div className="absolute -left-8 top-1/3 hidden rounded-2xl border border-white/15 bg-black/60 px-4 py-3 backdrop-blur-xl xl:block">
              <p className="text-[10px] font-bold uppercase tracking-widest text-white/60">Customers</p>
              <p className="text-2xl font-bold text-white">10K+</p>
            </div>
            <div className="absolute -right-6 top-2/3 hidden rounded-2xl border border-white/15 bg-black/60 px-4 py-3 backdrop-blur-xl xl:block">
              <p className="text-[10px] font-bold uppercase tracking-widest text-white/60">Products</p>
              <p className="text-2xl font-bold text-white">500+</p>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
