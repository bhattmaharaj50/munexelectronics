"use client"

import Link from "next/link"
import { Zap, Mail, Phone, MapPin, ArrowRight } from "lucide-react"
import { useState } from "react"

export function Footer() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) { setSubmitted(true); setEmail("") }
  }

  return (
    <footer className="border-t border-[#D2D2D7] bg-[#F5F5F7]">
      {/* Newsletter band */}
      <div className="bg-[#1D1D1F]">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-4 py-12 text-center md:flex-row md:justify-between md:text-left lg:px-8">
          <div>
            <h3 className="text-xl font-black text-white">Get the best deals first.</h3>
            <p className="mt-1 text-sm text-white/50">Subscribe for new arrivals, flash sales, and exclusive offers.</p>
          </div>
          {submitted ? (
            <p className="rounded-full border border-emerald-500/30 bg-emerald-500/14 px-6 py-3 text-sm font-medium text-emerald-400">
              ✓ Thanks — you're in!
            </p>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex w-full max-w-md shrink-0 items-center gap-2 rounded-full border border-white/15 bg-white/8 p-1.5 backdrop-blur-md"
            >
              <Mail className="ml-3 h-4 w-4 shrink-0 text-white/40" />
              <input
                type="email"
                required
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-10 flex-1 bg-transparent px-2 text-sm text-white placeholder:text-white/35 focus:outline-none"
              />
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 rounded-full bg-white px-5 py-2.5 text-sm font-bold text-[#1D1D1F] transition-all hover:-translate-y-0.5 hover:shadow-lg active:scale-95"
              >
                Subscribe <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Main footer */}
      <div className="mx-auto max-w-7xl px-4 py-14 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#1D1D1F]">
                <Zap className="h-4 w-4 text-white" />
              </div>
              <span className="text-[15px] font-bold text-[#1D1D1F]">
                Munex<span className="font-medium text-[#6E6E73]">Electronics</span>
              </span>
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-[#6E6E73]">
              Kenya's trusted electronics supplier. Quality products, competitive prices, delivered to your doorstep.
            </p>

            {/* Contact info */}
            <ul className="flex flex-col gap-2.5 text-sm text-[#6E6E73]">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#6E6E73]" />
                <span>Mosque Road, Narok · Luthuli Street G7, Nairobi</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 flex-shrink-0 text-[#6E6E73]" />
                <a href="tel:+254720856892" className="transition-colors hover:text-[#1D1D1F]">0720 856 892</a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 flex-shrink-0 text-[#6E6E73]" />
                <a href="mailto:munexelectronics@gmail.com" className="transition-colors hover:text-[#1D1D1F]">
                  munexelectronics@gmail.com
                </a>
              </li>
            </ul>

            {/* Social */}
            <div className="flex gap-2">
              {[
                { href: "https://instagram.com/munexelectronics", label: "IG" },
                { href: "https://twitter.com/munexelectronics", label: "X" },
                { href: "https://wa.me/254720856892", label: "WA" },
                { href: "https://facebook.com/munexelectronics", label: "FB" },
              ].map(({ href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#D2D2D7] bg-white text-xs font-bold text-[#6E6E73] transition-all hover:border-[#1D1D1F] hover:text-[#1D1D1F] hover:shadow-sm"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-[#1D1D1F]">Shop</h3>
            <ul className="flex flex-col gap-2.5">
              {[
                { href: "/", label: "Home" },
                { href: "/products", label: "All Products" },
                { href: "/products?deals=true#flash-sales", label: "Flash Sales" },
                { href: "/products?deals=true#deal-of-day", label: "Deal of the Day" },
                { href: "/products?deals=true#holiday-deals", label: "Holiday Deals" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-[#6E6E73] transition-colors hover:text-[#1D1D1F]">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Support */}
          <div>
            <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-[#1D1D1F]">Support</h3>
            <ul className="flex flex-col gap-2.5">
              {[
                { href: "/contact", label: "Contact Us" },
                { href: "/about", label: "About Us" },
                { href: "/cart", label: "My Cart" },
                { href: "/checkout", label: "Checkout" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-[#6E6E73] transition-colors hover:text-[#1D1D1F]">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-[#1D1D1F]">Policies</h3>
            <ul className="flex flex-col gap-2.5">
              {[
                { label: "Shipping Information" },
                { label: "Returns Policy" },
                { label: "Privacy Policy" },
                { label: "Terms of Service" },
                { label: "Warranty Policy" },
              ].map(({ label }) => (
                <li key={label}>
                  <span className="cursor-default text-sm text-[#6E6E73]">{label}</span>
                </li>
              ))}
            </ul>

            {/* Payment badges */}
            <div className="mt-6">
              <p className="mb-2.5 text-[10px] font-semibold uppercase tracking-widest text-[#6E6E73]">We accept</p>
              <div className="flex flex-wrap gap-2">
                {["M-Pesa", "Cash", "Card"].map((method) => (
                  <span
                    key={method}
                    className="rounded-lg border border-[#D2D2D7] bg-white px-2.5 py-1 text-[10px] font-bold text-[#1D1D1F]"
                  >
                    {method}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-[#D2D2D7] pt-6 sm:flex-row">
          <p className="text-sm text-[#6E6E73]">
            &copy; {new Date().getFullYear()} Munex Electronics. All rights reserved.
          </p>
          <p className="text-xs text-[#6E6E73]">
            Kenya's Premium Electronics Store · Narok &amp; Nairobi
          </p>
        </div>
      </div>
    </footer>
  )
}
