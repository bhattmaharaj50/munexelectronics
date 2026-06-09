"use client"

import { useProductStore } from "@/lib/product-store"

export function FeaturedBrands() {
  const { settings } = useProductStore()
  const logos = settings.brandLogos || []

  if (logos.length === 0) return null

  const title = settings.brandsTitle || "Trusted Brands We Stock"
  const reel = logos.length >= 4 ? [...logos, ...logos] : logos

  return (
    <section className="border-y border-[#E5E5E5] bg-white py-12">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mb-8 text-center">
          <h2 className="text-xl font-bold text-[#111111] md:text-2xl">{title}</h2>
          <p className="mt-1 text-sm text-[#6E6E73]">Authentic products from the brands you love</p>
        </div>

        {logos.length >= 4 ? (
          <div className="group relative overflow-hidden">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent" />
            <div className="flex w-max animate-brand-marquee items-center gap-6 group-hover:[animation-play-state:paused] md:gap-8">
              {reel.map((url, i) => (
                <div
                  key={`${url}-${i}`}
                  className="flex h-16 w-32 flex-shrink-0 items-center justify-center rounded-2xl border border-[#E5E5E5] bg-[#F5F5F7] px-3 transition-all hover:border-[#111111]/15 hover:bg-white hover:shadow-md md:h-20 md:w-40"
                >
                  <img
                    src={url}
                    alt={`Brand ${(i % logos.length) + 1}`}
                    loading="lazy"
                    className="max-h-full max-w-full object-contain opacity-70 transition-opacity hover:opacity-100 grayscale hover:grayscale-0"
                  />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-wrap items-center justify-center gap-5 md:gap-6">
            {logos.map((url, i) => (
              <div
                key={`${url}-${i}`}
                className="flex h-16 w-32 items-center justify-center rounded-2xl border border-[#E5E5E5] bg-[#F5F5F7] px-3 transition-all hover:border-[#111111]/15 hover:bg-white hover:shadow-md md:h-20 md:w-40"
              >
                <img
                  src={url}
                  alt={`Brand ${i + 1}`}
                  loading="lazy"
                  className="max-h-full max-w-full object-contain opacity-70 transition-opacity hover:opacity-100 grayscale hover:grayscale-0"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
