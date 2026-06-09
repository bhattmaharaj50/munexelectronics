"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { ArrowRight, Sparkles } from "lucide-react"
import { useProductStore } from "@/lib/product-store"

export function HeroSection() {
  const { products, settings } = useProductStore()
  const fallback = settings.heroImageUrl || "/images/hero-electronics.jpg"
  const galleryImages = settings.heroGalleryImages?.filter(Boolean) || []
  const slides = galleryImages.length > 0 ? galleryImages : [fallback]

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
    <section className="relative overflow-hidden bg-[#111111] flex items-center" style={{ minHeight: "62vh" }}>
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
              index === activeSlide ? "opacity-30 scale-[1.03]" : "opacity-0 scale-100"
            }`}
            sizes="100vw"
          />
        ))}
      </div>

      {/* Gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/40 to-black/85" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />

      {/* Content — centered */}
      <div className="relative mx-auto w-full max-w-5xl px-4 py-20 text-center lg:px-8 lg:py-28">
        <div
          className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/80 backdrop-blur-md"
        >
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
          {settings.heroBadge || "Kenya's Trusted Electronics Store"}
        </div>

        <h1 className="mt-6 text-5xl font-black leading-[1.05] tracking-[-0.03em] text-white md:text-6xl lg:text-7xl">
          {settings.heroTitle
            ? settings.heroTitle.split(",")[0]
            : "Premium Electronics"}
          <span className="block mt-2 text-white/45 font-light text-3xl md:text-4xl lg:text-5xl tracking-[-0.01em]">
            {settings.heroTitle
              ? settings.heroTitle.split(",").slice(1).join(",").trim() || "Delivered to Your Door."
              : "Delivered to Your Door."}
          </span>
        </h1>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/products"
            className="group inline-flex items-center gap-2.5 rounded-full bg-white px-8 py-3.5 text-sm font-bold text-[#111111] shadow-2xl shadow-black/25 transition-all hover:-translate-y-0.5 hover:shadow-3xl"
          >
            Shop Now
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="/products?deals=true"
            className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition-all hover:border-white/40 hover:bg-white/16"
          >
            <Sparkles className="h-4 w-4" />
            Explore Deals
          </Link>
        </div>

        {/* Slide dots */}
        {slides.length > 1 && (
          <div className="mt-10 flex items-center justify-center gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActiveSlide(i)}
                aria-label={`Slide ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === activeSlide ? "w-8 bg-white" : "w-2 bg-white/30 hover:bg-white/50"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
    </section>
  )
}
