import { HeroSection } from "@/components/home/hero-section"
import { TrustBand } from "@/components/home/trust-band"
import { AdVideoSection } from "@/components/home/ad-video-section"
import { HomepageVideosSection } from "@/components/home/homepage-videos-section"
import { CategoriesSection } from "@/components/home/categories-section"
import { BrandsSection } from "@/components/home/brands-section"
import { FeaturedProducts } from "@/components/home/featured-products"
import { NewArrivals } from "@/components/home/new-arrivals"
import { DealsSection } from "@/components/home/deals-section"
import { BestSellers } from "@/components/home/best-sellers"
import { VideosSection } from "@/components/home/videos-section"
import { TestimonialsSection } from "@/components/home/testimonials-section"
import { NewsletterSection } from "@/components/home/newsletter-section"

export default function HomePage() {
  return (
    <>
      {/* 1. Hero */}
      <HeroSection />

      {/* 2. Trust signals */}
      <TrustBand />

      {/* 3. Featured ad video (only renders if admin has set a video) */}
      <AdVideoSection />

      {/* 4. Homepage gallery videos (only renders if admin has set videos) */}
      <HomepageVideosSection />

      {/* 5. Shop by Category */}
      <CategoriesSection />

      {/* 6. Shop by Brand */}
      <BrandsSection />

      {/* 7. Featured Products */}
      <FeaturedProducts />

      {/* 8. Deals — Flash Sale / Deal of Day / Holiday */}
      <DealsSection />

      {/* 9. New Arrivals */}
      <NewArrivals />

      {/* 10. Best Sellers */}
      <BestSellers />

      {/* 11. Product Videos (only renders if any products have video URLs) */}
      <VideosSection />

      {/* 12. Customer Testimonials */}
      <TestimonialsSection />

      {/* 13. Newsletter CTA */}
      <NewsletterSection />
    </>
  )
}
