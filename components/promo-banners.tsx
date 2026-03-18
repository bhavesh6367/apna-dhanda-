"use client";

import Image from "next/image";
import { useShop } from "@/context/shop-context";
import { PROMO_BANNERS } from "@/lib/dummy-data";

export function PromoBanners() {
  const { setCurrentScreen, setActiveCategory } = useShop();

  return (
    <section className="w-full py-10 bg-background">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {PROMO_BANNERS.map((banner) => (
            <div 
              key={banner.id} 
              onClick={() => {
                // If the link contains 't-shirts' or 'vests', set category
                if (banner.link.includes("t-shirts")) setActiveCategory("t-shirts");
                else if (banner.link.includes("vests")) setActiveCategory("vests");
                else setActiveCategory(null);
                
                setCurrentScreen("category");
              }}
              className="group relative h-[400px] overflow-hidden border border-border cursor-pointer"
            >
              <Image
                src={banner.image}
                alt={banner.title}
                fill
                className="object-cover grayscale-[50%] transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
              
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                <h3 className="text-4xl md:text-6xl font-bebas tracking-wider text-white mb-4 drop-shadow-xl">
                  {banner.title}
                </h3>
                <div className="bg-primary text-primary-foreground font-space font-bold px-6 py-2 text-xs tracking-[0.3em] shadow-brutal translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
                  SHOP THE DROP
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
