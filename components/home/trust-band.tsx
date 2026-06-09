import { Headphones, ShieldCheck, Smartphone, Truck } from "lucide-react"

const items = [
  {
    icon: Truck,
    title: "Fast Delivery",
    sub: "Across all 47 counties",
  },
  {
    icon: ShieldCheck,
    title: "Genuine Warranty",
    sub: "Authentic, brand-new stock",
  },
  {
    icon: Smartphone,
    title: "M-Pesa Checkout",
    sub: "Pay safely via Lipa Na M-Pesa",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    sub: "WhatsApp & call any time",
  },
]

export function TrustBand() {
  return (
    <section className="border-y border-[#E5E5E5] bg-[#F5F5F7]">
      <div className="mx-auto grid max-w-7xl gap-px overflow-hidden bg-[#E5E5E5] px-0 sm:grid-cols-2 lg:grid-cols-4">
        {items.map(({ icon: Icon, title, sub }) => (
          <div
            key={title}
            className="group flex items-center gap-4 bg-[#F5F5F7] px-6 py-5 transition-colors hover:bg-white"
          >
            <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl bg-white border border-[#E5E5E5] shadow-sm transition-all group-hover:shadow-md group-hover:border-[#111111]/10">
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
