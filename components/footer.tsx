import Link from "next/link"
import { Zap } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-[#E5E5E5] bg-[#F5F5F7]">
      <div className="mx-auto max-w-7xl px-4 py-14 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#111111]">
                <Zap className="h-4 w-4 text-white" />
              </div>
              <span className="text-[15px] font-bold text-[#111111]">
                Munex<span className="text-[#6E6E73] font-medium">Electronics</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-[#6E6E73]">
              Kenya's trusted electronics supplier. Quality products, competitive prices, delivered to your doorstep.
            </p>
            <div className="flex gap-2">
              <a
                href="https://instagram.com/munexelectronics"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#E5E5E5] bg-white text-[#6E6E73] transition-all hover:border-[#111111] hover:text-[#111111] hover:shadow-sm"
              >
                <span className="text-xs font-bold">IG</span>
              </a>
              <a
                href="https://twitter.com/munexelectronics"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter / X"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#E5E5E5] bg-white text-[#6E6E73] transition-all hover:border-[#111111] hover:text-[#111111] hover:shadow-sm"
              >
                <span className="text-xs font-bold">X</span>
              </a>
              <a
                href="https://wa.me/254720856892"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#E5E5E5] bg-white text-[#6E6E73] transition-all hover:border-[#25D366] hover:text-[#25D366] hover:shadow-sm"
              >
                <span className="text-xs font-bold">WA</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-[#111111]">
              Quick Links
            </h3>
            <ul className="flex flex-col gap-2.5">
              {[
                { href: "/", label: "Home" },
                { href: "/products", label: "All Products" },
                { href: "/about", label: "About Us" },
                { href: "/contact", label: "Contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#6E6E73] transition-colors hover:text-[#111111]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-[#111111]">
              Categories
            </h3>
            <ul className="flex flex-col gap-2.5">
              {["TVs", "Phones", "Fridges", "Headphones", "PlayStations", "Tablets"].map((cat) => (
                <li key={cat}>
                  <Link
                    href={`/products?category=${cat.toLowerCase().replace(/ /g, "-")}`}
                    className="text-sm text-[#6E6E73] transition-colors hover:text-[#111111]"
                  >
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-[#111111]">
              Contact Us
            </h3>
            <ul className="flex flex-col gap-3 text-sm text-[#6E6E73]">
              <li className="leading-relaxed">
                <span className="font-semibold text-[#111111]">Nairobi:</span> Electronics House, Luthuli Street, Shop G7
              </li>
              <li className="leading-relaxed">
                <span className="font-semibold text-[#111111]">Narok:</span> Mosque Road
              </li>
              <li>
                <a href="tel:+254720856892" className="transition-colors hover:text-[#111111]">
                  0720 856 892
                </a>
              </li>
              <li>
                <a
                  href="mailto:munexelectronics@gmail.com"
                  className="transition-colors hover:text-[#111111]"
                >
                  munexelectronics@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-[#E5E5E5] pt-6 sm:flex-row">
          <p className="text-sm text-[#6E6E73]">
            &copy; {new Date().getFullYear()} Munex Electronics. All rights reserved.
          </p>
          <p className="text-xs text-[#6E6E73]">
            Kenya's Premium Electronics Store
          </p>
        </div>
      </div>
    </footer>
  )
}
