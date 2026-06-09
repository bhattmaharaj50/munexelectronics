"use client"

import { useState } from "react"
import { Mail, CheckCircle2, ArrowRight } from "lucide-react"
import { useInView } from "@/lib/use-in-view"

export function NewsletterSection() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.1 })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) { setSubmitted(true); setEmail("") }
  }

  return (
    <section className="relative overflow-hidden bg-[#111111]">
      {/* Grid texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.055]"
        style={{
          backgroundImage: "linear-gradient(to right,rgba(255,255,255,.8) 1px,transparent 1px),linear-gradient(to bottom,rgba(255,255,255,.8) 1px,transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div
        ref={ref}
        className="relative mx-auto flex max-w-3xl flex-col items-center px-4 py-24 text-center lg:px-8 lg:py-32"
        style={{
          opacity: inView ? 1 : 0,
          transform: inView ? "translateY(0)" : "translateY(28px)",
          transition: "opacity 0.8s cubic-bezier(0.25,0.46,0.45,0.94), transform 0.8s cubic-bezier(0.25,0.46,0.45,0.94)",
        }}
      >
        {/* Icon */}
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 border border-white/20">
          <Mail className="h-6 w-6 text-white" />
        </div>

        <h2 className="mt-6 text-3xl font-black tracking-[-0.02em] text-white md:text-4xl lg:text-5xl">
          Get the Best Deals,
          <span className="block text-white/50">Straight to Your Inbox</span>
        </h2>
        <p className="mt-4 max-w-md text-sm text-white/55 md:text-base">
          Subscribe and be the first to know about new arrivals, flash sales, and exclusive offers.
        </p>

        {submitted ? (
          <div className="mt-8 inline-flex items-center gap-2.5 rounded-full border border-emerald-500/30 bg-emerald-500/14 px-6 py-3.5 text-sm font-medium text-emerald-400">
            <CheckCircle2 className="h-5 w-5" />
            Thanks for subscribing!
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mt-8 flex w-full max-w-lg items-center gap-2 rounded-full border border-white/14 bg-white/8 p-1.5 backdrop-blur-md focus-within:border-white/30 transition-colors"
          >
            <input
              type="email"
              required
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-11 flex-1 rounded-full bg-transparent px-4 text-sm text-white placeholder:text-white/35 focus:outline-none"
            />
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 rounded-full bg-white px-5 py-2.5 text-sm font-bold text-[#111111] transition-all hover:-translate-y-0.5 hover:shadow-lg active:scale-95"
            >
              Subscribe <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </form>
        )}

        <p className="mt-4 text-[11px] text-white/35">No spam — unsubscribe anytime.</p>
      </div>
    </section>
  )
}
