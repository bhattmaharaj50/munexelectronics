import { HeroSection } from "@/components/home/hero-section"
import { TrustBand } from "@/components/home/trust-band"
import { DealsSection } from "@/components/home/deals-section"
import { CategoriesSection } from "@/components/home/categories-section"
import { BrandsSection } from "@/components/home/brands-section"
import { FeaturedProducts } from "@/components/home/featured-products"
import { NewArrivals } from "@/components/home/new-arrivals"
import { BestSellers } from "@/components/home/best-sellers"
import { AdVideoSection } from "@/components/home/ad-video-section"
import { HomepageVideosSection } from "@/components/home/homepage-videos-section"
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

      {/* 3. Flash Sales → Deal of the Day → Holiday Deals */}
      <DealsSection />

      {/* 4. Shop by Category */}
      <CategoriesSection />

      {/* 5. Featured Brands (marquee carousel) */}
      <BrandsSection />

      {/* 6. Featured Products */}
      <FeaturedProducts />

      {/* 7. New Arrivals */}
      <NewArrivals />

      {/* 8. Best Sellers */}
      <BestSellers />

      {/* 9. Featured ad video (only renders if admin has set a video) */}
      <AdVideoSection />

      {/* 10. Homepage gallery videos (only renders if admin has set videos) */}
      <HomepageVideosSection />

      {/* 11. Product Videos (only renders if any products have video URLs) */}
      <VideosSection />

      {/* 12. Customer Testimonials */}
      <TestimonialsSection />

      {/* 13. Newsletter CTA */}
      <NewsletterSection />
    </>
  )
}
