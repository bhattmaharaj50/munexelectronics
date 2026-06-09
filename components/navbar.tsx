"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { ShoppingCart, Search, Menu, X, Zap, Lock, ChevronDown, LayoutGrid, Heart, User } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import { useProductStore } from "@/lib/product-store"
import { useRouter } from "next/navigation"

export function Navbar() {
  const { totalItems } = useCart()
  const { settings, categories } = useProductStore()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mobileCategoriesOpen, setMobileCategoriesOpen] = useState(false)
  const [desktopCategoriesOpen, setDesktopCategoriesOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [scrolled, setScrolled] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`)
      setSearchQuery("")
      setMobileMenuOpen(false)
    }
  }

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "/products?deals=true#flash-sales", label: "Flash Sales", accent: true },
    { href: "/products?deals=true#deal-of-day", label: "Deal of the Day" },
    { href: "/products?deals=true#holiday-deals", label: "Holiday Deals" },
    { href: "/contact", label: "Contact" },
  ]

  const logoText = settings.logoText || "Munex Electronics"
  const logoUrl = settings.logoUrl || ""
  const visibleCategories = (categories || []).slice(0, 12)

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled || mobileMenuOpen
          ? "bg-white/98 border-b border-[#E5E5E5] shadow-sm backdrop-blur-xl"
          : "bg-white/95 border-b border-[#E5E5E5]/60 backdrop-blur-md"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group shrink-0">
          {logoUrl ? (
            <img src={logoUrl} alt={logoText} className="h-9 w-auto rounded-xl object-contain" />
          ) : (
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#1D1D1F] transition-transform group-hover:scale-105">
              <Zap className="h-5 w-5 text-white" />
            </div>
          )}
          <span className="text-[15px] font-bold tracking-tight text-[#1D1D1F]">{logoText}</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-6 xl:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`relative text-sm font-medium transition-colors group ${
                link.accent
                  ? "text-[#FF3B30] hover:text-[#FF3B30]/80"
                  : "text-[#6E6E73] hover:text-[#1D1D1F]"
              }`}
            >
              {link.accent && (
                <span className="absolute -top-1 -right-2 h-1.5 w-1.5 animate-pulse rounded-full bg-[#FF3B30]" />
              )}
              {link.label}
              <span className={`absolute -bottom-0.5 left-0 h-px w-0 transition-all duration-200 group-hover:w-full ${link.accent ? "bg-[#FF3B30]" : "bg-[#1D1D1F]"}`} />
            </Link>
          ))}

          {/* Categories dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setDesktopCategoriesOpen(true)}
            onMouseLeave={() => setDesktopCategoriesOpen(false)}
          >
            <button
              type="button"
              onClick={() => setDesktopCategoriesOpen((v) => !v)}
              className="flex items-center gap-1.5 text-sm font-medium text-[#6E6E73] transition-colors hover:text-[#1D1D1F]"
              aria-haspopup="true"
              aria-expanded={desktopCategoriesOpen}
            >
              <LayoutGrid className="h-4 w-4" />
              Categories
              <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${desktopCategoriesOpen ? "rotate-180" : ""}`} />
            </button>
            {desktopCategoriesOpen && visibleCategories.length > 0 && (
              <div className="absolute left-1/2 top-full z-50 mt-3 w-[520px] -translate-x-1/2 rounded-2xl border border-[#D2D2D7] bg-white p-4 shadow-2xl shadow-black/10">
                <div className="grid grid-cols-3 gap-1">
                  {visibleCategories.map((cat) => (
                    <Link
                      key={cat.slug}
                      href={`/products?category=${cat.slug}`}
                      onClick={() => setDesktopCategoriesOpen(false)}
                      className="rounded-xl px-3 py-2.5 text-sm font-medium text-[#6E6E73] transition-all hover:bg-[#F5F5F7] hover:text-[#1D1D1F]"
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
                <div className="mt-3 border-t border-[#E5E5E5] pt-3">
                  <Link
                    href="/products"
                    onClick={() => setDesktopCategoriesOpen(false)}
                    className="flex items-center justify-center rounded-xl bg-[#F5F5F7] px-3 py-2.5 text-xs font-semibold text-[#1D1D1F] transition-colors hover:bg-[#EBEBED]"
                  >
                    Browse all products →
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Desktop Icons + Search */}
        <div className="hidden items-center gap-1.5 xl:flex">
          <form onSubmit={handleSearch} className="relative mr-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6E6E73]" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-9 w-48 rounded-full border border-[#D2D2D7] bg-[#F5F5F7] pl-9 pr-4 text-sm text-[#1D1D1F] placeholder:text-[#6E6E73] transition-all focus:border-[#1D1D1F] focus:outline-none focus:w-64 focus:bg-white"
            />
          </form>

          <Link
            href="/cart"
            className="relative flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-[#F5F5F7]"
            title="Wishlist"
          >
            <Heart className="h-5 w-5 text-[#1D1D1F]" />
          </Link>

          <Link
            href="/cart"
            className="relative flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-[#F5F5F7]"
          >
            <ShoppingCart className="h-5 w-5 text-[#1D1D1F]" />
            {totalItems > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#1D1D1F] text-[10px] font-bold text-white">
                {totalItems}
              </span>
            )}
            <span className="sr-only">Cart</span>
          </Link>

          <Link
            href="/admin"
            className="flex h-9 items-center gap-1.5 rounded-full border border-[#D2D2D7] px-3.5 text-xs font-medium text-[#6E6E73] transition-all hover:border-[#1D1D1F] hover:text-[#1D1D1F]"
            title="Admin Portal"
          >
            <Lock className="h-3.5 w-3.5" />
            Admin
          </Link>
        </div>

        {/* Mobile: Cart + Hamburger */}
        <div className="flex items-center gap-2 xl:hidden">
          <form onSubmit={handleSearch} className="hidden items-center sm:flex">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6E6E73]" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-9 w-36 rounded-full border border-[#D2D2D7] bg-[#F5F5F7] pl-9 pr-3 text-sm text-[#1D1D1F] placeholder:text-[#6E6E73] focus:border-[#1D1D1F] focus:outline-none focus:w-48 transition-all"
              />
            </div>
          </form>
          <Link href="/cart" className="relative flex h-9 w-9 items-center justify-center rounded-full hover:bg-[#F5F5F7]">
            <ShoppingCart className="h-5 w-5 text-[#1D1D1F]" />
            {totalItems > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#1D1D1F] text-[10px] font-bold text-white">
                {totalItems}
              </span>
            )}
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-[#F5F5F7]"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5 text-[#1D1D1F]" />
            ) : (
              <Menu className="h-5 w-5 text-[#1D1D1F]" />
            )}
          </button>
        </div>
      </nav>

      {/* Category quick bar */}
      <div className="hidden border-t border-[#E5E5E5]/70 bg-[#F5F5F7]/60 xl:block">
        <div className="mx-auto flex max-w-7xl items-center gap-0.5 overflow-x-auto px-4 py-1.5 lg:px-8 scrollbar-none">
          <span className="flex flex-shrink-0 items-center gap-1 pr-3 text-[10px] font-semibold uppercase tracking-widest text-[#6E6E73]">
            <LayoutGrid className="h-3 w-3" />
            Shop:
          </span>
          {visibleCategories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/products?category=${cat.slug}`}
              className="flex-shrink-0 whitespace-nowrap rounded-full px-3 py-1 text-xs font-medium text-[#6E6E73] transition-all hover:bg-white hover:text-[#1D1D1F] hover:shadow-sm"
            >
              {cat.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="border-t border-[#E5E5E5] bg-white px-4 pb-6 xl:hidden">
          <form onSubmit={handleSearch} className="relative mt-4 sm:hidden">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6E6E73]" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-11 w-full rounded-full border border-[#D2D2D7] bg-[#F5F5F7] pl-10 pr-4 text-sm text-[#1D1D1F] placeholder:text-[#6E6E73] focus:border-[#1D1D1F] focus:outline-none"
            />
          </form>
          <div className="mt-3 flex flex-col gap-0.5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-2 rounded-xl px-3 py-3 text-[15px] font-medium transition-colors hover:bg-[#F5F5F7] ${
                  link.accent ? "text-[#FF3B30]" : "text-[#1D1D1F]"
                }`}
              >
                {link.accent && <span className="h-2 w-2 rounded-full bg-[#FF3B30] animate-pulse" />}
                {link.label}
              </Link>
            ))}

            <button
              type="button"
              onClick={() => setMobileCategoriesOpen((v) => !v)}
              className="flex items-center justify-between rounded-xl px-3 py-3 text-[15px] font-medium text-[#1D1D1F] transition-colors hover:bg-[#F5F5F7]"
            >
              <span className="flex items-center gap-2">
                <LayoutGrid className="h-4 w-4 text-[#6E6E73]" />
                Categories
              </span>
              <ChevronDown className={`h-4 w-4 text-[#6E6E73] transition-transform duration-200 ${mobileCategoriesOpen ? "rotate-180" : ""}`} />
            </button>
            {mobileCategoriesOpen && (
              <div className="mx-1 mb-2 grid grid-cols-2 gap-1 rounded-2xl border border-[#E5E5E5] bg-[#F5F5F7] p-2">
                {visibleCategories.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/products?category=${cat.slug}`}
                    onClick={() => { setMobileMenuOpen(false); setMobileCategoriesOpen(false) }}
                    className="rounded-xl px-3 py-2.5 text-sm font-medium text-[#1D1D1F] transition-colors hover:bg-white"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            )}

            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-1 flex items-center gap-2 rounded-xl border border-[#D2D2D7] px-3 py-3 text-sm font-medium text-[#6E6E73] transition-colors hover:bg-[#F5F5F7] hover:text-[#1D1D1F]"
            >
              <Lock className="h-4 w-4" />
              Admin Portal
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
