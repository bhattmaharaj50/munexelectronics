"use client"

import { useState } from "react"
import { Play } from "lucide-react"
import { useProductStore } from "@/lib/product-store"
import { getYouTubeId } from "@/lib/video-utils"

function HomepageVideoCard({ url, index }: { url: string; index: number }) {
  const [playing, setPlaying] = useState(false)
  const ytId = getYouTubeId(url)

  return (
    <div className="group overflow-hidden rounded-2xl border border-[#E5E5E5] bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/[0.08]">
      <div className="relative aspect-video w-full bg-[#F5F5F7]">
        {playing ? (
          ytId ? (
            <iframe
              src={`https://www.youtube.com/embed/${ytId}?autoplay=1&rel=0&playsinline=1`}
              title={`Featured video ${index + 1}`}
              className="h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <video src={url} controls autoPlay playsInline className="h-full w-full object-cover" />
          )
        ) : (
          <button
            onClick={() => setPlaying(true)}
            className="relative flex h-full w-full items-center justify-center"
            aria-label={`Play featured video ${index + 1}`}
          >
            {ytId ? (
              <img
                src={`https://img.youtube.com/vi/${ytId}/maxresdefault.jpg`}
                alt={`Video ${index + 1}`}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                onError={(e) => {
                  ;(e.currentTarget as HTMLImageElement).src = `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`
                }}
              />
            ) : (
              <video
                src={url}
                muted
                playsInline
                preload="metadata"
                className="h-full w-full object-cover"
              />
            )}
            <div className="absolute flex h-14 w-14 items-center justify-center rounded-full bg-[#111111]/90 shadow-xl transition-transform group-hover:scale-110">
              <Play className="h-6 w-6 fill-white text-white" />
            </div>
          </button>
        )}
      </div>
    </div>
  )
}

export function HomepageVideosSection() {
  const { settings } = useProductStore()
  const videos = (settings.heroGalleryVideos || []).filter(Boolean)
  if (videos.length === 0) return null

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
      <div className="mb-8">
        <span className="inline-flex items-center gap-2 rounded-full border border-[#E5E5E5] bg-[#F5F5F7] px-3.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#6E6E73]">
          <Play className="h-3 w-3" />
          Featured Videos
        </span>
        <h2 className="mt-4 text-2xl font-bold tracking-tight text-[#111111] md:text-3xl">
          Watch More from Munex
        </h2>
        <p className="mt-2 text-sm text-[#6E6E73]">
          Tap any video to play
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {videos.map((url, index) => (
          <HomepageVideoCard key={`${url}-${index}`} url={url} index={index} />
        ))}
      </div>
    </section>
  )
}
