"use client"

import Image from "next/image"
import { Star, ShoppingCart, Zap } from "lucide-react"
import type { Product } from "@/lib/products"
import { formatPrice } from "@/lib/products"
import { useCart } from "@/lib/cart-context"
import Link from "next/link"
import { useRouter } from "next/navigation"

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim()
}

function getDiscountPercent(price: number, originalPrice?: number): number | null {
  if (!originalPrice || originalPrice <= price) return null
  return Math.round(((originalPrice - price) / originalPrice) * 100)
}

export function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart()
  const router = useRouter()
  const outOfStock = (product.stock ?? 1) <= 0
  const discount = getDiscountPercent(product.price, product.originalPrice)

  const handleAddAndCheckout = () => {
    if (outOfStock) return
    addToCart(product)
    router.push("/checkout")
  }

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-[#E5E5E5] bg-white transition-all duration-300 hover:shadow-xl hover:shadow-black/[0.08] hover:-translate-y-1">
      {/* Image */}
      <Link href={`/products/${product.id}`} className="relative aspect-square overflow-hidden bg-[#F5F5F7] block">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Badges */}
        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          {discount && (
            <span className="rounded-lg bg-[#FF3B30] px-2.5 py-1 text-[11px] font-bold text-white shadow-sm">
              -{discount}%
            </span>
          )}
          {product.badge && !discount && (
            <span className="rounded-lg bg-[#111111] px-2.5 py-1 text-[11px] font-bold text-white shadow-sm">
              {product.badge}
            </span>
          )}
        </div>
        {product.images && product.images.length > 0 && (
          <span className="absolute right-3 top-3 rounded-lg bg-black/60 px-2 py-1 text-[10px] font-semibold text-white backdrop-blur-sm">
            +{product.images.length}
          </span>
        )}
        {outOfStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/70 backdrop-blur-sm">
            <span className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-[#6E6E73] shadow-sm border border-[#E5E5E5]">
              Out of Stock
            </span>
          </div>
        )}
      </Link>

      {/* Info */}
      <div className="flex flex-1 flex-col gap-2.5 p-4">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#6E6E73]">
            {product.brand}
          </span>
          {product.size && (
            <span className="rounded-md bg-[#F5F5F7] px-2 py-0.5 text-[10px] font-medium text-[#6E6E73]">
              {product.size}
            </span>
          )}
        </div>
        <Link href={`/products/${product.id}`}>
          <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-[#111111] transition-colors hover:text-[#111111]/70">
            {product.name}
          </h3>
        </Link>
        <p className="line-clamp-2 text-xs leading-relaxed text-[#6E6E73]">
          {stripHtml(product.description)}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-1.5">
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-3 w-3 ${
                  i < Math.floor(product.rating)
                    ? "fill-[#FF9F0A] text-[#FF9F0A]"
                    : "fill-[#E5E5E5] text-[#E5E5E5]"
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-[#6E6E73]">
            ({product.reviews})
          </span>
        </div>

        {/* Price */}
        <div className="mt-auto flex items-baseline gap-2 pt-1">
          <span className="text-lg font-bold text-[#111111]">{formatPrice(product.price)}</span>
          {product.originalPrice && (
            <span className="text-xs text-[#6E6E73] line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>

        {!outOfStock && (
          <p className="text-[11px] font-medium text-emerald-600">
            {product.stock ?? 0} in stock
          </p>
        )}

        {/* Buttons */}
        <div className="mt-1 flex gap-2">
          <button
            onClick={handleAddAndCheckout}
            disabled={outOfStock}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-[#111111] px-3 py-2.5 text-xs font-semibold text-white transition-all hover:bg-[#333] active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ShoppingCart className="h-3.5 w-3.5" />
            Buy Now
          </button>
          <button
            onClick={() => {
              if (outOfStock) return
              addToCart(product)
            }}
            disabled={outOfStock}
            className="flex items-center justify-center rounded-xl border border-[#E5E5E5] px-3 py-2.5 text-xs font-semibold text-[#111111] transition-all hover:border-[#111111] hover:bg-[#F5F5F7] active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
            title="Add to cart"
          >
            <Zap className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  )
}
