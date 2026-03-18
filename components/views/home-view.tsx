"use client";

import { HeroCarousel } from "@/components/hero-carousel";
import { TrustBar } from "@/components/trust-bar";
import { FeaturedCollections } from "@/components/featured-collections";
import { FeaturedCategories } from "@/components/featured-categories";
import { PromoBanners } from "@/components/promo-banners";
import { NewsletterSection } from "@/components/newsletter-section";

export function HomeView() {
  return (
    <>
      <HeroCarousel />
      <TrustBar />
      
      {/* New Drops Section */}
      <FeaturedCollections title="NEW DROPS" />
      
      <FeaturedCategories />
      
      {/* Best Sellers Section */}
      <FeaturedCollections title="BEST SELLERS" />
      
      <PromoBanners />
      
      <NewsletterSection />
    </>
  );
}
