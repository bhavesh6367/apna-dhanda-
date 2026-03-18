"use client";

import Image from "next/image";
import { useShop } from "@/context/shop-context";
import { CATEGORIES } from "@/lib/dummy-data";

export function FeaturedCategories() {
  const { setCurrentScreen, setActiveCategory } = useShop();

  return (
    <section className="w-full py-20 bg-background border-b border-border">
      <div className="container px-4 md:px-6 mx-auto">
        <h2 className="text-5xl md:text-7xl font-bebas tracking-wider uppercase mb-12 text-center">
          CHOOSE YOUR <span className="text-primary">CORE</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {CATEGORIES.map((category) => (
            <div 
              key={category.id} 
              onClick={() => {
                setActiveCategory(category.slug);
                setCurrentScreen("category");
              }}
              className="group relative h-[400px] md:h-[600px] overflow-hidden border border-border cursor-pointer"
            >
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-cover grayscale-[30%] brightness-75 transition-transform duration-1000 group-hover:scale-110 group-hover:grayscale-0 group-hover:brightness-100"
              />
              
              {/* Border Overlay on hover */}
              <div className="absolute inset-0 border-[10px] border-primary scale-95 opacity-0 transition-all duration-500 group-hover:scale-100 group-hover:opacity-100 pointer-events-none z-10" />
              
              {/* Label */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-transparent transition-colors z-20">
                <div className="text-center p-4 bg-background/80 md:bg-transparent backdrop-blur-sm md:backdrop-blur-none border md:border-none border-primary">
                  <h3 className="text-white font-bebas tracking-[0.2em] text-5xl md:text-8xl drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]">
                    {category.name}
                  </h3>
                  <p className="font-space text-primary text-xs md:text-sm tracking-[0.4em] mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    EXPLORE COLLECTION
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
