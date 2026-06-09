"use client"

import Image from "next/image"
import { Star, ShoppingCart, Heart, Eye } from "lucide-react"
import type { Product } from "@/lib/products"
import { formatPrice } from "@/lib/products"
import { useCart } from "@/lib/cart-context"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

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
  const [wishlisted, setWishlisted] = useState(false)

  const handleBuyNow = () => {
    if (outOfStock) return
    addToCart(product)
    router.push("/checkout")
  }

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-[#D2D2D7] bg-white transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-black/[0.08] hover:border-[#1D1D1F]/12">
      {/* Image */}
      <Link href={`/products/${product.id}`} className="relative aspect-square overflow-hidden bg-[#F5F5F7] block">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.07]"
        />

        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        {/* Badges */}
        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          {discount && (
            <span className="rounded-lg bg-[#FF3B30] px-2.5 py-1 text-[11px] font-bold text-white shadow-sm">
              -{discount}%
            </span>
          )}
          {product.badge && !discount && (
            <span className="rounded-lg bg-[#1D1D1F] px-2.5 py-1 text-[11px] font-bold text-white shadow-sm">
              {product.badge}
            </span>
          )}
        </div>

        {/* Action buttons — visible on hover */}
        <div className="absolute right-3 top-3 flex flex-col gap-2 opacity-0 transition-all duration-200 group-hover:opacity-100">
          <button
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              setWishlisted((v) => !v)
            }}
            className={`flex h-8 w-8 items-center justify-center rounded-full shadow-lg backdrop-blur-md transition-all active:scale-90 ${
              wishlisted
                ? "bg-[#FF3B30] border border-[#FF3B30]"
                : "bg-white/90 border border-white/50 hover:bg-white"
            }`}
            title={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart
              className={`h-3.5 w-3.5 transition-colors ${wishlisted ? "fill-white text-white" : "text-[#1D1D1F]"}`}
            />
          </button>
          <button
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              router.push(`/products/${product.id}`)
            }}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-white/50 bg-white/90 shadow-lg backdrop-blur-md transition-all hover:bg-white active:scale-90"
            title="Quick view"
          >
            <Eye className="h-3.5 w-3.5 text-[#1D1D1F]" />
          </button>
        </div>

        {product.images && product.images.length > 0 && (
          <span className="absolute bottom-3 right-3 rounded-lg bg-black/60 px-2 py-1 text-[10px] font-semibold text-white backdrop-blur-sm opacity-0 transition-opacity group-hover:opacity-100">
            +{product.images.length} photos
          </span>
        )}
        {outOfStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/75 backdrop-blur-sm">
            <span className="rounded-xl border border-[#D2D2D7] bg-white px-4 py-2 text-sm font-semibold text-[#6E6E73] shadow-sm">
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
          <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-[#1D1D1F] transition-colors hover:text-[#1D1D1F]/70">
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
                    : "fill-[#D2D2D7] text-[#D2D2D7]"
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-[#6E6E73]">({product.reviews})</span>
        </div>

        {/* Price */}
        <div className="mt-auto flex items-baseline gap-2 pt-1">
          <span className="text-lg font-black text-[#1D1D1F]">{formatPrice(product.price)}</span>
          {product.originalPrice && (
            <span className="text-xs text-[#6E6E73] line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>

        {!outOfStock && (product.stock ?? 10) <= 5 && (
          <p className="text-[11px] font-semibold text-[#FF9F0A]">
            Only {product.stock} left
          </p>
        )}

        {/* Buttons */}
        <div className="mt-1 flex gap-2">
          <button
            onClick={() => {
              if (!outOfStock) addToCart(product)
            }}
            disabled={outOfStock}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-[#D2D2D7] px-3 py-2.5 text-xs font-semibold text-[#1D1D1F] transition-all hover:border-[#1D1D1F] hover:bg-[#F5F5F7] active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ShoppingCart className="h-3.5 w-3.5" />
            Add to Cart
          </button>
          <button
            onClick={handleBuyNow}
            disabled={outOfStock}
            className="flex items-center justify-center rounded-xl bg-[#1D1D1F] px-3 py-2.5 text-xs font-semibold text-white transition-all hover:bg-[#333] active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
            title="Buy now"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  )
}
