import type { Metadata, Viewport } from "next"
import { Suspense } from "react"
import { Inter } from "next/font/google"
import { CartProvider } from "@/lib/cart-context"
import { ProductStoreProvider } from "@/lib/product-store"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { AnalyticsTracker } from "@/components/analytics-tracker"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Munex Electronics | Kenya's Trusted Electronics Store",
  description:
    "Shop the latest TVs, phones, fridges, gaming consoles, headphones and more at competitive prices. Fast delivery across Kenya.",
  keywords:
    "electronics, Kenya, Narok, TVs, phones, Samsung, iPhone, PlayStation, Xbox, fridges, headphones, online shopping",
  openGraph: {
    title: "Munex Electronics | Kenya's Trusted Electronics Store",
    description:
      "Quality electronics at competitive prices. Delivered to your doorstep in Kenya.",
    type: "website",
    locale: "en_KE",
  },
}

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased bg-white text-[#111111]">
        <ProductStoreProvider>
          <CartProvider>
            <Navbar />
            <main className="min-h-screen">{children}</main>
            <Footer />
            <WhatsAppButton />
            <Suspense fallback={null}>
              <AnalyticsTracker />
            </Suspense>
          </CartProvider>
        </ProductStoreProvider>
      </body>
    </html>
  )
}
