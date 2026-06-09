"use client"

import Link from "next/link"
import { useProductStore } from "@/lib/product-store"
import { useInView } from "@/lib/use-in-view"

export function FeaturedBrands() {
  const { settings } = useProductStore()
  const logos = settings.brandLogos || []
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.1 })

  if (logos.length === 0) return null

  const title = settings.brandsTitle || "Trusted Brands We Stock"
  const reel = logos.length >= 4 ? [...logos, ...logos] : logos

  return (
    <section
      className="border-y border-[#E5E5E5] bg-white py-12"
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transition: "opacity 0.8s cubic-bezier(0.25,0.46,0.45,0.94)",
      }}
    >
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mb-8 text-center">
          <h2 className="text-xl font-black tracking-[-0.01em] text-[#111111] md:text-2xl">{title}</h2>
          <p className="mt-1 text-sm text-[#6E6E73]">Authentic products from the brands you love</p>
        </div>

        {logos.length >= 4 ? (
          <div className="group relative overflow-hidden">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-white to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-white to-transparent" />
            <div className="flex w-max animate-brand-marquee items-center gap-5 group-hover:[animation-play-state:paused] md:gap-6">
              {reel.map((logo, i) => {
                const imgUrl = typeof logo === "string" ? logo : logo.url
                const brandName = typeof logo === "string" ? "" : logo.name
                const card = (
                  <div
                    className="flex h-16 w-32 flex-shrink-0 items-center justify-center rounded-2xl border border-[#E5E5E5] bg-[#F5F5F7] px-3 transition-all hover:border-[#111111]/12 hover:bg-white hover:shadow-md md:h-20 md:w-40"
                  >
                    <img
                      src={imgUrl}
                      alt={brandName || `Brand ${(i % logos.length) + 1}`}
                      loading="lazy"
                      className="max-h-full max-w-full object-contain opacity-60 grayscale transition-all hover:opacity-100 hover:grayscale-0"
                    />
                  </div>
                )
                return brandName ? (
                  <Link key={`${imgUrl}-${i}`} href={`/products?brand=${encodeURIComponent(brandName)}`}>
                    {card}
                  </Link>
                ) : (
                  <div key={`${imgUrl}-${i}`}>{card}</div>
                )
              })}
            </div>
          </div>
        ) : (
          <div className="flex flex-wrap items-center justify-center gap-5">
            {logos.map((logo, i) => {
              const imgUrl = typeof logo === "string" ? logo : logo.url
              const brandName = typeof logo === "string" ? "" : logo.name
              const card = (
                <div
                  className="flex h-16 w-32 items-center justify-center rounded-2xl border border-[#E5E5E5] bg-[#F5F5F7] px-3 transition-all hover:border-[#111111]/12 hover:bg-white hover:shadow-md md:h-20 md:w-40"
                >
                  <img
                    src={imgUrl}
                    alt={brandName || `Brand ${i + 1}`}
                    loading="lazy"
                    className="max-h-full max-w-full object-contain opacity-60 grayscale transition-all hover:opacity-100 hover:grayscale-0"
                  />
                </div>
              )
              return brandName ? (
                <Link key={`${imgUrl}-${i}`} href={`/products?brand=${encodeURIComponent(brandName)}`}>
                  {card}
                </Link>
              ) : (
                <div key={`${imgUrl}-${i}`}>{card}</div>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
