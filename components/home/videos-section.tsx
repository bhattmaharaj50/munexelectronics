"use client"

import { useState } from "react"
import { Play, ArrowRight } from "lucide-react"
import { useProductStore } from "@/lib/product-store"
import { getYouTubeId } from "@/lib/video-utils"
import Link from "next/link"

function VideoCard({ productId, name, videoUrl }: { productId: string; name: string; videoUrl: string }) {
  const [playing, setPlaying] = useState(false)
  const ytId = getYouTubeId(videoUrl)

  return (
    <div className="group overflow-hidden rounded-2xl border border-[#E5E5E5] bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/[0.08]">
      <div className="relative aspect-video w-full bg-[#F5F5F7]">
        {playing ? (
          ytId ? (
            <iframe
              src={`https://www.youtube.com/embed/${ytId}?autoplay=1`}
              title={name}
              className="h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <video src={videoUrl} controls autoPlay className="h-full w-full object-cover" />
          )
        ) : (
          <button
            onClick={() => setPlaying(true)}
            className="relative flex h-full w-full items-center justify-center"
            aria-label={`Play video for ${name}`}
          >
            {ytId ? (
              <img
                src={`https://img.youtube.com/vi/${ytId}/hqdefault.jpg`}
                alt={name}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-[#F5F5F7]">
                <Play className="h-12 w-12 text-[#6E6E73]" />
              </div>
            )}
            <div className="absolute flex h-12 w-12 items-center justify-center rounded-full bg-[#111111]/90 shadow-xl transition-transform group-hover:scale-110">
              <Play className="h-5 w-5 fill-white text-white" />
            </div>
          </button>
        )}
      </div>
      <div className="flex items-center justify-between border-t border-[#E5E5E5] p-4">
        <p className="line-clamp-1 text-sm font-semibold text-[#111111]">{name}</p>
        <Link
          href={`/products/${productId}`}
          className="ml-4 shrink-0 text-xs font-medium text-[#6E6E73] transition-colors hover:text-[#111111]"
        >
          View Product →
        </Link>
      </div>
    </div>
  )
}

export function VideosSection() {
  const { products } = useProductStore()
  const withVideos = products.filter((p) => p.videoUrl)

  if (withVideos.length === 0) return null

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
      <div className="mb-10 flex items-end justify-between">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-[#E5E5E5] bg-[#F5F5F7] px-3.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#6E6E73]">
            <Play className="h-3 w-3" />
            Watch &amp; Shop
          </span>
          <h2 className="mt-4 text-2xl font-bold tracking-tight text-[#111111] md:text-3xl">
            Product Videos
          </h2>
          <p className="mt-2 text-sm text-[#6E6E73]">
            See our products in action before you buy
          </p>
        </div>
        <Link
          href="/products"
          className="hidden items-center gap-1.5 rounded-full border border-[#E5E5E5] bg-white px-4 py-2.5 text-xs font-semibold text-[#111111] shadow-sm transition-all hover:bg-[#F5F5F7] md:inline-flex"
        >
          Shop All
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {withVideos.slice(0, 6).map((product) => (
          <VideoCard
            key={product.id}
            productId={product.id}
            name={product.name}
            videoUrl={product.videoUrl!}
          />
        ))}
      </div>
    </section>
  )
}
