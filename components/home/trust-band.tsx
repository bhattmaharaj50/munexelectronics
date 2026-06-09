"use client"

import { Headphones, ShieldCheck, Smartphone, Truck } from "lucide-react"
import { useInView } from "@/lib/use-in-view"

const items = [
  { icon: Truck,        title: "Fast Delivery",    sub: "Across all 47 counties" },
  { icon: ShieldCheck,  title: "Genuine Warranty", sub: "Authentic, brand-new stock" },
  { icon: Smartphone,   title: "M-Pesa Checkout",  sub: "Pay safely via Lipa Na M-Pesa" },
  { icon: Headphones,   title: "24/7 Support",     sub: "WhatsApp & call any time" },
]

export function TrustBand() {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.1 })

  return (
    <section className="border-y border-[#E5E5E5] bg-[#F5F5F7]" ref={ref}>
      <div className="mx-auto grid max-w-7xl sm:grid-cols-2 lg:grid-cols-4" style={{ gap: "1px", background: "#E5E5E5" }}>
        {items.map(({ icon: Icon, title, sub }, i) => (
          <div
            key={title}
            className="group flex items-center gap-4 bg-[#F5F5F7] px-6 py-5 transition-colors hover:bg-white"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "translateY(0)" : "translateY(16px)",
              transition: `opacity 0.6s cubic-bezier(0.25,0.46,0.45,0.94) ${i * 80}ms, transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94) ${i * 80}ms`,
            }}
          >
            <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl border border-[#E5E5E5] bg-white shadow-sm transition-all group-hover:shadow-md group-hover:border-[#111111]/10">
              <Icon className="h-5 w-5 text-[#111111]" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-[#111111]">{title}</p>
              <p className="truncate text-xs text-[#6E6E73]">{sub}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
