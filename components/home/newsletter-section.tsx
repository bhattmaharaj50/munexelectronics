"use client"

import { useState } from "react"
import { Mail, CheckCircle2, ArrowRight } from "lucide-react"

export function NewsletterSection() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) {
      setSubmitted(true)
      setEmail("")
    }
  }

  return (
    <section className="relative overflow-hidden bg-[#111111]">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.8) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative mx-auto flex max-w-3xl flex-col items-center px-4 py-20 text-center lg:px-8 lg:py-28">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 border border-white/20">
          <Mail className="h-6 w-6 text-white" />
        </div>

        <h2 className="mt-6 text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl">
          Get the Best Deals,
          <span className="block text-white/60">
            Straight to Your Inbox
          </span>
        </h2>
        <p className="mt-4 max-w-md text-sm text-white/60 md:text-base">
          Subscribe and be the first to know about new arrivals, flash sales, and exclusive offers.
        </p>

        {submitted ? (
          <div className="mt-8 inline-flex items-center gap-2.5 rounded-full border border-emerald-500/30 bg-emerald-500/15 px-6 py-3.5 text-sm font-medium text-emerald-400">
            <CheckCircle2 className="h-5 w-5" />
            Thanks for subscribing! We'll keep you updated.
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mt-8 flex w-full max-w-lg items-center gap-2 rounded-full border border-white/15 bg-white/10 p-1.5 backdrop-blur-md focus-within:border-white/30"
          >
            <input
              type="email"
              required
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-11 flex-1 rounded-full bg-transparent px-4 text-sm text-white placeholder:text-white/40 focus:outline-none"
            />
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-[#111111] transition-all hover:-translate-y-0.5 hover:shadow-lg active:scale-95"
            >
              Subscribe
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </form>
        )}

        <p className="mt-4 text-[11px] text-white/40">
          No spam — unsubscribe anytime.
        </p>
      </div>
    </section>
  )
}
