"use client"

import { Quote, Star } from "lucide-react"
import { useInView } from "@/lib/use-in-view"

const testimonials = [
  {
    name: "James Ochieng",
    location: "Nairobi",
    role: "Verified Buyer",
    text: "Bought a Samsung TV from Munex Electronics and the delivery was incredibly fast. Great prices and authentic products!",
    rating: 5,
  },
  {
    name: "Wanjiku Mwangi",
    location: "Mombasa",
    role: "Repeat Customer",
    text: "Best place to shop for electronics in Kenya. Their customer service is top notch and prices are very competitive.",
    rating: 5,
  },
  {
    name: "David Kamau",
    location: "Kisumu",
    role: "Verified Buyer",
    text: "I ordered a PlayStation 5 and it arrived in perfect condition. Will definitely recommend to friends and family.",
    rating: 5,
  },
]

export function TestimonialsSection() {
  const [headerRef, headerInView] = useInView<HTMLDivElement>({ threshold: 0.1 })
  const [cardsRef, cardsInView] = useInView<HTMLDivElement>({ threshold: 0.06 })

  return (
    <section className="mx-auto max-w-7xl px-4 py-24 lg:px-8">
      <div
        ref={headerRef}
        className="mb-14 flex flex-col items-center text-center"
        style={{
          opacity: headerInView ? 1 : 0,
          transform: headerInView ? "translateY(0)" : "translateY(24px)",
          transition: "opacity 0.7s cubic-bezier(0.25,0.46,0.45,0.94), transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94)",
        }}
      >
        <span className="inline-flex items-center gap-2 rounded-full border border-[#E5E5E5] bg-[#F5F5F7] px-3.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#6E6E73]">
          Reviews
        </span>
        <h2 className="mt-4 text-3xl font-black tracking-[-0.02em] text-[#111111] md:text-4xl lg:text-5xl">
          Loved Across Kenya
        </h2>
        <p className="mt-3 max-w-md text-sm text-[#6E6E73] md:text-base">
          Join thousands of happy customers shopping with confidence at Munex Electronics.
        </p>

        {/* Star row */}
        <div className="mt-5 flex items-center gap-2">
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-[#FF9F0A] text-[#FF9F0A]" />
            ))}
          </div>
          <span className="text-sm font-semibold text-[#111111]">4.9 / 5.0</span>
          <span className="text-sm text-[#6E6E73]">· 2,400+ verified reviews</span>
        </div>
      </div>

      <div ref={cardsRef} className="grid gap-5 md:grid-cols-3">
        {testimonials.map((t, i) => (
          <div
            key={t.name}
            className="flex flex-col gap-5 overflow-hidden rounded-2xl border border-[#E5E5E5] bg-white p-7 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-black/[0.1] hover:border-[#111111]/12"
            style={{
              opacity: cardsInView ? 1 : 0,
              transform: cardsInView ? "translateY(0)" : "translateY(28px)",
              transition: `opacity 0.6s cubic-bezier(0.25,0.46,0.45,0.94) ${i * 100}ms, transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94) ${i * 100}ms`,
            }}
          >
            <Quote className="h-7 w-7 text-[#E5E5E5]" />

            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, j) => (
                <Star
                  key={j}
                  className={`h-4 w-4 ${j < t.rating ? "fill-[#FF9F0A] text-[#FF9F0A]" : "fill-[#E5E5E5] text-[#E5E5E5]"}`}
                />
              ))}
            </div>

            <p className="flex-1 text-sm leading-relaxed text-[#111111] md:text-base">
              "{t.text}"
            </p>

            <div className="flex items-center gap-3 border-t border-[#F5F5F7] pt-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#111111] text-sm font-bold text-white">
                {t.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
              </div>
              <div>
                <p className="text-sm font-semibold text-[#111111]">{t.name}</p>
                <p className="text-xs text-[#6E6E73]">{t.role} · {t.location}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
